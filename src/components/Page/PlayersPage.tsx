/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, type FormEvent, useEffect } from 'react'
import PlayerTable from '../PlayerTable/PlayerTable'
import { useScores, aggregatePlayers } from '../../hooks/userPlayer'
import type { PlayerRow } from '../../types/types'

// ——— Normaliza string (sin acentos, minúsculas) ———
function norm(s: string) {
	return s
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
}

type PlayersPageProps = {
	/** Query controlada por el padre (UniverseHeader). Si no la pasas, el componente es "no controlado". */
	query?: string
	/** Callback opcional si quieres levantar el estado al padre. */
	onQueryChange?: (q: string) => void
}

export default function PlayersPage({
	query,
	onQueryChange,
}: PlayersPageProps) {
	const { data, isLoading, isError } = useScores()

	// Estado interno solo si no hay query controlada
	const [qLocal, setQLocal] = useState('')
	// Valor efectivo (controlado o no)
	const q = query ?? qLocal

	// Si quieres que el input interno siga los cambios del padre:
	useEffect(() => {
		if (query !== undefined) setQLocal(query)
	}, [query])

	const rows: PlayerRow[] = useMemo(() => {
		if (!data) return []
		return aggregatePlayers(data)
	}, [data])

	const filteredRows = useMemo(() => {
		const query = q.trim()
		if (!query) return rows
		const nq = norm(query)
		return rows.filter((r) => norm(r.name).includes(nq))
	}, [rows, q])

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault() // evitamos recarga; el filtrado es en vivo por onChange
	}

	if (isLoading) return <p>Cargando jugadores…</p>
	if (isError) return <p>Hubo un error al cargar los datos.</p>

	return (
		<>
			<form
				className="uheader__search"
				onSubmit={handleSubmit}
				role="search">
				<input
					type="search"
					placeholder="Busca un jugador"
					value={q}
					onChange={(e) => {
						setQLocal(e.target.value)
						onQueryChange?.(e.target.value)
					}}
					aria-label="Busca un jugador"
				/>
				<button type="submit" aria-label="Buscar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512">
						<circle
							cx="221.09"
							cy="221.09"
							r="157.09"
							fill="none"
							stroke="#B9B9B9"
							stroke-width="32"
							stroke-miterlimit="10"
						/>
						<path
							d="M338.29 338.29 448 448"
							fill="none"
							stroke="#B9B9B9"
							stroke-width="32"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			</form>

			{/* Tabla con filas filtradas y resaltado */}
			<PlayerTable
				rows={filteredRows}
				onRowClick={(row) => console.log('Jugador:', row)}
				highlightQuery={q}
				emptyStateText="No hay jugadores que coincidan."
			/>
		</>
	)
}
