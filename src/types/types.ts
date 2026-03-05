/** Fila cruda del Google Sheet (1 fila = 1 jugador en 1 partido) */
export interface MatchRow {
	partidoId: string
	fecha: string
	fechaFormatted: string
	local: string
	visita: string
	golesLocal: number
	golesVisita: number
	tipo: string
	directorTecnico: string
	nombreJugador: string
	fotoUrl: string
	estadio: string
	posicion: string
	partidos: number
	minutos: number
	goles: number
	asistencias: number
	amarillas: number
	rojas: number
	ciudadPais: string
}

/** Fila agregada/resumida de un jugador */
export type PlayerRow = {
	id: string | number
	name: string
	avatarUrl?: string
	position: string
	matches: number
	minutes: number
	goals: number
	assists: number
	yellow: number
	red: number
}

/** Un partido agrupado con sus jugadores */
export interface MatchGroup {
	partidoId: string
	fecha: string
	fechaFormatted: string
	local: string
	visita: string
	golesLocal: number
	golesVisita: number
	tipo: string
	estadio: string
	ciudadPais: string
	directorTecnico: string
	players: PlayerRow[]
}
