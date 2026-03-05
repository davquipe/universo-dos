import { useEffect, useRef, useState } from 'react'

type Props = {
	/** Imagen de fondo para desktop */
	bgUrl: string
	/** Imagen de fondo para mobile (fallback: usa bgUrl si no se pasa) */
	mobileBgUrl?: string
	activeView?: string
	onClickGeneral?: () => void
	onClickMatches?: () => void
	dtList?: string[]
	selectedDT?: string
	onSelectDT?: (dt: string) => void
}

const UniverseHeader = ({
	bgUrl,
	mobileBgUrl,
	activeView = 'general',
	onClickGeneral,
	onClickMatches,
	dtList = [],
	selectedDT,
	onSelectDT,
}: Props) => {
	const [dtOpen, setDtOpen] = useState(false)
	const dtRef = useRef<HTMLDivElement>(null)

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		if (!dtOpen) return
		const handleClickOutside = (e: MouseEvent) => {
			if (dtRef.current && !dtRef.current.contains(e.target as Node)) {
				setDtOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [dtOpen])

	return (
		<header className="uheader">
			<div className="uheader__hero">
				<picture>
					<source media="(min-width: 641px)" srcSet={bgUrl} />
					<source
						media="(max-width: 640px)"
						srcSet={mobileBgUrl ?? bgUrl}
					/>
					<img
						src={mobileBgUrl ?? bgUrl}
						alt="Banner principal del universo de clubes"
						className="uheader__heroImg"
						decoding="async"
						fetchPriority="high"
					/>
				</picture>
			</div>

			{/* Texto descriptivo */}
			<p className="uheader__lead">
				Revisa los datos y el historial de todos los jugadores
				convocados rumbo al Mundial 2030 actualizado fecha a fecha.
			</p>

			{/* Botones */}
			<div className="uheader__cta">
				<button
					className={`btn ${activeView === 'general' ? 'btn--primary' : 'btn--neutral'}`}
					type="button"
					onClick={onClickGeneral}>
					MINUTOS ACUMULADOS
				</button>
				<button
					className={`btn ${activeView === 'matches' ? 'btn--primary' : 'btn--neutral'}`}
					type="button"
					onClick={onClickMatches}>
					VER TODOS LOS PARTIDOS
				</button>

				{/* Botón DT con dropdown */}
				<div className="uheader__dtWrap" ref={dtRef}>
					<button
						className={`btn ${activeView === 'byDT' ? 'btn--primary' : 'btn--neutral'}`}
						type="button"
						onClick={() => setDtOpen((v) => !v)}>
						FILTRAR POR DT
					</button>
					{dtOpen && dtList.length > 0 && (
						<ul className="uheader__dtMenu">
							{dtList.map((dt) => (
								<li key={dt}>
									<button
										type="button"
										className={`uheader__dtItem ${
											selectedDT === dt ? 'is-active' : ''
										}`}
										onClick={() => {
											onSelectDT?.(dt)
											setDtOpen(false)
										}}>
										{dt}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</header>
	)
}

export default UniverseHeader
