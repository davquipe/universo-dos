import { useState } from 'react'
import type { PlayerRow } from '../../types/types'
import PlayerTable from '../PlayerTable/PlayerTable'

type Props = {
	dateLabel: string // "10 de octubre de 2025 (Amistoso)"
	title: string // "Chile 2 - 2 Perú"
	venue: string // "Estadio Bicentenario de La Florida - CHILE"
	dt?: string // "Manuel Barreto"
	rows: PlayerRow[] // filas para la tabla
	defaultOpen?: boolean // si inicia abierto
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
						width="22"
						height="22"
						aria-hidden="true">
						<path
							d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</header>

			{/* Panel deslizante */}
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
