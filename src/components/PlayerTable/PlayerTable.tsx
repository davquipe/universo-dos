/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from 'react'
import type { PlayerRow } from '../../types/types'

type SortKey = keyof Pick<
	PlayerRow,
	'name' | 'matches' | 'minutes' | 'goals' | 'assists' | 'yellow' | 'red'
>

type Props = {
	rows: PlayerRow[]
	onRowClick?: (row: PlayerRow) => void
	highlightQuery?: string
	emptyStateText?: string
}

function useIsMobile(breakpoint = 640) {
	const [isMobile, setIsMobile] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia(`(max-width:${breakpoint}px)`)
		const onChange = () => setIsMobile(mq.matches)
		onChange()
		mq.addEventListener?.('change', onChange)
		return () => mq.removeEventListener?.('change', onChange)
	}, [breakpoint])
	return isMobile
}

// normaliza string (quita acentos y pasa a minúsculas)
function norm(s: string) {
	return s
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
}

/** Resalta el texto que coincide con la búsqueda */
function highlightText(name: string, q?: string) {
	if (!q) return name
	const cleanName = norm(name)
	const cleanQ = norm(q.trim())
	if (!cleanQ) return name

	const idx = cleanName.indexOf(cleanQ)
	if (idx === -1) return name

	let realStart = 0
	let cleanCount = 0
	for (let i = 0; i < name.length; i++) {
		const step = norm(name[i]).length
		if (cleanCount === idx) {
			realStart = i
			break
		}
		cleanCount += step
	}

	let realLen = 0
	let added = 0
	for (let i = realStart; i < name.length && added < cleanQ.length; i++) {
		realLen++
		added += norm(name[i]).length
	}

	const before = name.slice(0, realStart)
	const match = name.slice(realStart, realStart + realLen)
	const after = name.slice(realStart + realLen)

	return (
		<>
			{before}
			<mark>{match}</mark>
			{after}
		</>
	)
}

export default function PlayerTable({
	rows,
	onRowClick,
	highlightQuery,
	emptyStateText = 'No hay datos para mostrar.',
}: Props) {
	const [sortKey, setSortKey] = useState<SortKey>('name')
	const [sortAsc, setSortAsc] = useState(true)

	const sorted = useMemo(() => {
		const clone = [...rows]
		clone.sort((a, b) => {
			const va = a[sortKey] as any
			const vb = b[sortKey] as any
			if (typeof va === 'string') {
				return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
			}
			return sortAsc ? va - vb : vb - va
		})
		return clone
	}, [rows, sortKey, sortAsc])

	const handleSort = (key: SortKey) => {
		if (key === sortKey) setSortAsc((v) => !v)
		else {
			setSortKey(key)
			setSortAsc(true)
		}
	}

	const isMobile = useIsMobile()

	if (!sorted.length) return <p style={{ padding: 16 }}>{emptyStateText}</p>

	return (
		<div className="pt">
			<div
				className="pt__table"
				role="table"
				aria-label="Tabla de futbolistas">
				{/* HEADER */}
				<div className="pt__row pt__row--head" role="row">
					<div
						className="pt__cell pt__cell--player"
						role="columnheader">
						<button
							type="button"
							className="pt__sort"
							onClick={() => handleSort('name')}>
							<span>Jugador</span>
							<SortIcon
								active={sortKey === 'name'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div
						className="pt__cell pt__cell--pos"
						role="columnheader"
						aria-label="Posición">
						<button
							type="button"
							className="pt__sort pt__sort--pos"
							onClick={() => handleSort('minutes')}>
							<span className="pt__label--full">Posición</span>
							<span className="pt__label--short">Pos.</span>
							<SortIcon
								active={sortKey === 'minutes'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div className="pt__cell" role="columnheader">
						<button
							type="button"
							className="pt__sort"
							onClick={() => handleSort('matches')}>
							<span className="pt__label--full">Partidos</span>
							<span className="pt__label--short">Part.</span>
							<SortIcon
								active={sortKey === 'matches'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div className="pt__cell" role="columnheader">
						<button
							type="button"
							className="pt__sort"
							onClick={() => handleSort('minutes')}>
							<span className="pt__label--full">Minutos</span>
							<span className="pt__label--short">Min.</span>
							<SortIcon
								active={sortKey === 'minutes'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div className="pt__cell" role="columnheader">
						<button
							type="button"
							className="pt__sort"
							onClick={() => handleSort('goals')}>
							<span className="pt__label--full">Goles</span>
							<span className="pt__label--short">Gol.</span>
							<SortIcon
								active={sortKey === 'goals'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div className="pt__cell" role="columnheader">
						<button
							type="button"
							className="pt__sort"
							onClick={() => handleSort('assists')}>
							<span className="pt__label--full">Asistencias</span>
							<span className="pt__label--short">Asis.</span>
							<SortIcon
								active={sortKey === 'assists'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div
						className="pt__cell pt__cell--card"
						role="columnheader"
						title="Amarillas">
						<span className="pt__card pt__card--y" aria-hidden />
						<button
							type="button"
							className="pt__sort pt__sort--card"
							onClick={() => handleSort('yellow')}
							aria-label="Ordenar amarillas">
							<SortIcon
								small
								active={sortKey === 'yellow'}
								asc={sortAsc}
							/>
						</button>
					</div>

					<div
						className="pt__cell pt__cell--card"
						role="columnheader"
						title="Rojas">
						<span className="pt__card pt__card--r" aria-hidden />
						<button
							type="button"
							className="pt__sort pt__sort--card"
							onClick={() => handleSort('red')}
							aria-label="Ordenar rojas">
							<SortIcon
								small
								active={sortKey === 'red'}
								asc={sortAsc}
							/>
						</button>
					</div>
				</div>

				{/* ROWS */}
				{sorted.map((r) => {
					const [first, ...rest] = r.name.split(' ')
					const firstHighlighted = highlightText(
						first,
						highlightQuery,
					)
					const restHighlighted = highlightText(
						rest.join(' '),
						highlightQuery,
					)

					return (
						<div
							key={r.id}
							className="pt__row"
							role="row"
							onClick={() => onRowClick?.(r)}>
							<div
								className="pt__cell pt__cell--player"
								role="cell">
								<div className="pt__avatarWrap">
									{r.avatarUrl ? (
										<img
											className="pt__avatar"
											src={r.avatarUrl}
											alt={r.name}
										/>
									) : (
										<span
											className="pt__avatar pt__avatar--placeholder"
											aria-hidden
										/>
									)}
								</div>
								<div
									className={`pt__name ${
										isMobile ? 'is-mobile' : 'is-desktop'
									}`}>
									{isMobile ? (
										<>
											<span className="pt__nameTop">
												{firstHighlighted}
											</span>
											<span className="pt__nameBottom">
												{restHighlighted}
											</span>
										</>
									) : (
										<>
											{firstHighlighted} {restHighlighted}
										</>
									)}
								</div>
							</div>

							<div className="pt__cell pt__cell--pos" role="cell">
								{r.pitchImgUrl ? (
									<img
										className="pt__pitch"
										src={r.pitchImgUrl}
										alt={`Posición de ${r.name}`}
									/>
								) : (
									<span className="pt__pitch pt__pitch--placeholder" />
								)}
							</div>

							<div className="pt__cell" role="cell">
								{r.matches}
							</div>
							<div className="pt__cell" role="cell">
								{r.minutes}
							</div>
							<div className="pt__cell" role="cell">
								{r.goals}
							</div>
							<div className="pt__cell" role="cell">
								{r.assists}
							</div>
							<div
								className="pt__cell pt__cell--cardVal"
								role="cell">
								{r.yellow}
							</div>
							<div
								className="pt__cell pt__cell--cardVal"
								role="cell">
								{r.red}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function SortIcon({
	active,
	asc,
	small,
}: {
	active?: boolean
	asc?: boolean
	small?: boolean
}) {
	const cls = [
		'pt__sortIcon',
		active ? 'is-active' : '',
		asc ? 'is-asc' : 'is-desc',
		small ? 'is-sm' : '',
	].join(' ')
	return (
		<span className={cls} aria-hidden="true">
			<svg viewBox="0 0 24 24">
				<path d="M7 10l5-6 5 6H7zm0 4l5 6 5-6H7z" fill="currentColor" />
			</svg>
		</span>
	)
}
