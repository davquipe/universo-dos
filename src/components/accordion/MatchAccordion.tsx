import { useState } from 'react'
import type { PlayerRow } from '../../types/types'
import PlayerTable from '../PlayerTable/PlayerTable'

type Props = {
	dt?: string
	title: string
	venue: string
	rows: PlayerRow[]
	dateLabel: string
	defaultOpen?: boolean
	onToggle?: (open: boolean) => void
}

const MatchAccordion = ({
	dateLabel,
	title,
	venue,
	dt,
	rows,
	defaultOpen = false,
	onToggle,
}: Props) => {
	const [open, setOpen] = useState(defaultOpen)

	const handleToggle = () => {
		const next = !open
		setOpen(next)
		onToggle?.(next)
	}

	return (
		<section className="ma">
			{/* Encabezado */}
			<header className="ma__head" role="heading" aria-level={2}>
				<div className="ma__date">
					{dt && (
						<span className="ma__dt">
							<strong>DT:</strong> {dt}
						</span>
					)}
					<span className="ma__dateText">{dateLabel}</span>
				</div>

				<button
					type="button"
					className="ma__center"
					aria-expanded={open}
					aria-controls="match-panel"
					onClick={handleToggle}>
					<strong className="ma__title">{title}</strong>
					<span className="ma__venue">{venue}</span>
				</button>

				<button
					type="button"
					className="ma__chev"
					aria-label={open ? 'Contraer' : 'Expandir'}
					aria-expanded={open}
					aria-controls="match-panel"
					onClick={handleToggle}>
					<svg
						className={`ma__chevIcon ${open ? 'is-open' : ''}`}
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="#000"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>
			</header>

			<div
				id="match-panel"
				className={`ma__panel ${open ? 'is-open' : ''}`}>
				<div className="ma__panelInner">
					<PlayerTable rows={rows} />
				</div>
			</div>
		</section>
	)
}

export default MatchAccordion
