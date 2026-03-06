import { useMemo, useState, type FormEvent, useEffect } from 'react'
import PlayerTable, { type SortKey } from '../PlayerTable/PlayerTable'
import Pagination from '../common/Pagination'
import { useScores, aggregatePlayers } from '../../hooks/userPlayer'
import type { PlayerRow } from '../../types/types'

const PAGE_SIZE = 30

function norm(s: string) {
	return s
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
}

type PlayersPageProps = {
	query?: string
	onQueryChange?: (q: string) => void
}

export default function PlayersPage({
	query,
	onQueryChange,
}: PlayersPageProps) {
	const { data, isLoading, isError } = useScores()

	const [qLocal, setQLocal] = useState('')
	const q = query ?? qLocal
	const [page, setPage] = useState(1)
	const [sortKey, setSortKey] = useState<SortKey>('name')
	const [sortAsc, setSortAsc] = useState(true)

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

	// Sort globally before paginating
	const sortedRows = useMemo(() => {
		const clone = [...filteredRows]
		clone.sort((a, b) => {
			const va = a[sortKey] as string | number
			const vb = b[sortKey] as string | number
			if (typeof va === 'string') {
				return sortAsc
					? (va as string).localeCompare(vb as string)
					: (vb as string).localeCompare(va as string)
			}
			return sortAsc
				? (va as number) - (vb as number)
				: (vb as number) - (va as number)
		})
		return clone
	}, [filteredRows, sortKey, sortAsc])

	// Reset page when filter or sort changes
	useEffect(() => {
		setPage(1)
	}, [q, sortKey, sortAsc])

	const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE))
	const pagedRows = sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
	}

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

			<PlayerTable
				rows={pagedRows}
				highlightQuery={q}
				emptyStateText="No hay jugadores que coincidan."
				loading={isLoading}
				externalSortKey={sortKey}
				externalSortAsc={sortAsc}
				onSortChange={(key, asc) => {
					setSortKey(key)
					setSortAsc(asc)
				}}
			/>

			{!isLoading && (
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</>
	)
}
