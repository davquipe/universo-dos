import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
	googleSheetKey,
	keyData,
	query,
	staleTime,
	sheetGid,
} from '../types/constants'
import type { MatchRow, PlayerRow, MatchGroup } from '../types/types'

/* ===== localStorage cache layer ===== */
const CACHE_KEY = `scores_${googleSheetKey}_${sheetGid}`
const CACHE_TTL = staleTime // 5 min

interface CacheEntry {
	timestamp: number
	data: MatchRow[]
}

function readCache(): MatchRow[] | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY)
		if (!raw) return null
		const entry: CacheEntry = JSON.parse(raw)
		if (Date.now() - entry.timestamp > CACHE_TTL) {
			localStorage.removeItem(CACHE_KEY)
			return null
		}
		return entry.data
	} catch {
		localStorage.removeItem(CACHE_KEY)
		return null
	}
}

function writeCache(data: MatchRow[]) {
	try {
		const entry: CacheEntry = { timestamp: Date.now(), data }
		localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
	} catch {
		/* storage full — silently ignore */
	}
}

const buildUrl = () => {
	const base = `https://docs.google.com/spreadsheets/d/${googleSheetKey}/gviz/tq`
	const params = new URLSearchParams({
		tq: query,
		tqx: 'out:json',
		gid: sheetGid,
	})
	return `${base}?${params.toString()}`
}

function parseGvizDate(v: unknown): Date {
	if (typeof v === 'string') {
		const m = v.match(/Date\((\d+),(\d+),(\d+)\)/)
		if (m) return new Date(+m[1], +m[2], +m[3])
	}
	return new Date(String(v))
}

const getScores = async (): Promise<MatchRow[]> => {
	// Serve from cache if fresh
	const cached = readCache()
	if (cached) return cached

	const url = buildUrl()
	const { data } = await axios.get(url, { responseType: 'text' })

	const json = JSON.parse(data.replace(/^[^{]+/, '').replace(/[^}]+$/, ''))

	const rows = json.table.rows || []

	const parsed: MatchRow[] = rows.map(
		(r: { c: ({ v: unknown; f?: string } | null)[] }) => ({
			partidoId: String(r.c[0]?.v ?? ''),
			fecha: String(r.c[1]?.v ?? ''),
			fechaFormatted: String(r.c[1]?.f ?? r.c[1]?.v ?? ''),
			local: String(r.c[2]?.v ?? ''),
			visita: String(r.c[3]?.v ?? ''),
			golesLocal: Number(r.c[4]?.v ?? 0),
			golesVisita: Number(r.c[5]?.v ?? 0),
			tipo: String(r.c[6]?.v ?? ''),
			directorTecnico: String(r.c[7]?.v ?? ''),
			nombreJugador: String(r.c[8]?.v ?? ''),
			fotoUrl: String(r.c[9]?.v ?? ''),
			estadio: String(r.c[10]?.v ?? ''),
			posicion: String(r.c[11]?.v ?? ''),
			partidos: Number(r.c[12]?.v ?? 0),
			minutos: Number(r.c[13]?.v ?? 0),
			goles: Number(r.c[14]?.v ?? 0),
			asistencias: Number(r.c[15]?.v ?? 0),
			amarillas: Number(r.c[16]?.v ?? 0),
			rojas: Number(r.c[17]?.v ?? 0),
			ciudadPais: String(r.c[18]?.v ?? ''),
		}),
	)

	writeCache(parsed)
	return parsed
}

export const useScores = () =>
	useQuery<MatchRow[]>({
		queryKey: [keyData, query, sheetGid, googleSheetKey],
		queryFn: getScores,
		staleTime,
		retry: 1,
		initialData: () => readCache() ?? undefined,
		initialDataUpdatedAt: () => {
			try {
				const raw = localStorage.getItem(CACHE_KEY)
				if (raw) return JSON.parse(raw).timestamp as number
			} catch {
				/* noop */
			}
			return undefined
		},
	})

/** Agrega stats por jugador (para MINUTOS ACUMULADOS) */
export function aggregatePlayers(data: MatchRow[]): PlayerRow[] {
	const map = new Map<string, PlayerRow>()
	for (const r of data) {
		const key = r.nombreJugador
		const existing = map.get(key)
		if (existing) {
			existing.matches += r.partidos
			existing.minutes += r.minutos
			existing.goals += r.goles
			existing.assists += r.asistencias
			existing.yellow += r.amarillas
			existing.red += r.rojas
		} else {
			map.set(key, {
				id: key,
				name: r.nombreJugador,
				avatarUrl: r.fotoUrl || undefined,
				position: r.posicion,
				matches: r.partidos,
				minutes: r.minutos,
				goals: r.goles,
				assists: r.asistencias,
				yellow: r.amarillas,
				red: r.rojas,
			})
		}
	}
	return Array.from(map.values())
}

/** Agrupa filas por partido, ordenadas por fecha desc (más reciente primero) */
export function groupByMatch(data: MatchRow[]): MatchGroup[] {
	const map = new Map<string, MatchGroup>()
	for (const r of data) {
		if (!map.has(r.partidoId)) {
			map.set(r.partidoId, {
				partidoId: r.partidoId,
				fecha: r.fecha,
				fechaFormatted: r.fechaFormatted,
				local: r.local,
				visita: r.visita,
				golesLocal: r.golesLocal,
				golesVisita: r.golesVisita,
				tipo: r.tipo,
				estadio: r.estadio,
				ciudadPais: r.ciudadPais,
				directorTecnico: r.directorTecnico,
				players: [],
			})
		}
		map.get(r.partidoId)!.players.push({
			id: `${r.partidoId}-${r.nombreJugador}`,
			name: r.nombreJugador,
			avatarUrl: r.fotoUrl || undefined,
			position: r.posicion,
			matches: r.partidos,
			minutes: r.minutos,
			goals: r.goles,
			assists: r.asistencias,
			yellow: r.amarillas,
			red: r.rojas,
		})
	}
	return Array.from(map.values()).sort((a, b) => {
		const da = parseGvizDate(a.fecha)
		const db = parseGvizDate(b.fecha)
		return db.getTime() - da.getTime()
	})
}

/** Devuelve los nombres únicos de directores técnicos */
export function getUniqueDTs(data: MatchRow[]): string[] {
	return [...new Set(data.map((r) => r.directorTecnico))].filter(Boolean)
}
