type Props = {
	/** Imagen de fondo para desktop */
	bgUrl: string
	/** Imagen de fondo para mobile (fallback: usa bgUrl si no se pasa) */
	mobileBgUrl?: string
	onClickGeneral?: () => void
	onClickMatches?: () => void
}

const UniverseHeader = ({
	bgUrl,
	mobileBgUrl,
	onClickGeneral,
	onClickMatches,
}: Props) => {
	return (
		<header className="uheader">
			{/* Banner de fondo */}
			<div className="uheader__hero">
				<picture>
					{mobileBgUrl && (
						<source
							media="(max-width: 640px)"
							srcSet={mobileBgUrl}
						/>
					)}
					<img
						src={bgUrl}
						alt="Banner principal del universo de clubes"
						className="uheader__heroImg"
						loading="lazy"
						decoding="async"
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
					className="btn btn--primary"
					type="button"
					onClick={onClickGeneral}>
					INFORMACIÓN GENERAL
				</button>
				<button
					className="btn btn--neutral"
					type="button"
					onClick={onClickMatches}>
					VER TODOS LOS PARTIDOS
				</button>
			</div>
		</header>
	)
}

export default UniverseHeader
