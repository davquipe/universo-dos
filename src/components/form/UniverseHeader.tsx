import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
	bgUrl: string
	dtList?: string[]
	activeView?: string
	selectedDT?: string
	mobileBgUrl?: string
	onClickGeneral?: () => void
	onClickMatches?: () => void
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

	useEffect(() => {
		if (!dtOpen) return

		const handleClickOutside = (e: PointerEvent) => {
			const target = e.target as Node | null
			if (dtRef.current && target && !dtRef.current.contains(target)) {
				setDtOpen(false)
			}
		}

		document.addEventListener('pointerdown', handleClickOutside)

		return () => {
			document.removeEventListener('pointerdown', handleClickOutside)
		}
	}, [dtOpen])

	const handleToggleDT = useCallback(() => {
		setDtOpen((prev) => !prev)
	}, [])

	const handleSelectDT = useCallback(
		(dt: string) => {
			onSelectDT?.(dt)
			setDtOpen(false)
		},
		[onSelectDT],
	)

	const heroSrc = mobileBgUrl ?? bgUrl

	const generalBtnClass = useMemo(
		() =>
			`btn ${activeView === 'general' ? 'btn--primary' : 'btn--neutral'}`,
		[activeView],
	)

	const matchesBtnClass = useMemo(
		() =>
			`btn ${activeView === 'matches' ? 'btn--primary' : 'btn--neutral'}`,
		[activeView],
	)

	const dtBtnClass = useMemo(
		() => `btn ${activeView === 'byDT' ? 'btn--primary' : 'btn--neutral'}`,
		[activeView],
	)

	const dtMenu = useMemo(() => {
		if (!dtOpen || dtList.length === 0) return null

		return (
			<ul className="uheader__dtMenu">
				{dtList.map((dt) => (
					<li key={dt}>
						<button
							type="button"
							className={`uheader__dtItem ${selectedDT === dt ? 'is-active' : ''}`}
							onClick={() => handleSelectDT(dt)}>
							{dt}
						</button>
					</li>
				))}
			</ul>
		)
	}, [dtOpen, dtList, selectedDT, handleSelectDT])

	return (
		<header className="uheader">
			<div className="uheader__hero">
				<picture>
					<source media="(min-width: 641px)" srcSet={bgUrl} />
					<source media="(max-width: 640px)" srcSet={heroSrc} />
					<img
						src={heroSrc}
						className="uheader__heroImg"
						alt="Banner principal del universo de clubes"
						decoding="async"
						fetchPriority="high"
					/>
				</picture>
			</div>

			<p className="uheader__lead">
				Revisa los datos y el historial de todos los jugadores
				convocados rumbo al Mundial 2030 actualizado fecha a fecha.
			</p>

			<div className="uheader__cta">
				<button
					className={generalBtnClass}
					type="button"
					onClick={onClickGeneral}>
					MINUTOS ACUMULADOS
				</button>

				<button
					className={matchesBtnClass}
					type="button"
					onClick={onClickMatches}>
					VER TODOS LOS PARTIDOS
				</button>

				<div className="uheader__dtWrap" ref={dtRef}>
					<button
						className={dtBtnClass}
						type="button"
						onClick={handleToggleDT}>
						FILTRAR POR DT
					</button>

					{dtMenu}
				</div>
			</div>
		</header>
	)
}

export default memo(UniverseHeader)
