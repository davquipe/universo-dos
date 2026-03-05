type Props = {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: Props) {
	if (totalPages <= 1) return null

	return (
		<nav className="pt__pag" aria-label="Paginación">
			<button
				type="button"
				className="pt__pagBtn pt__pagBtn--arrow"
				disabled={currentPage <= 1}
				onClick={() => onPageChange(currentPage - 1)}
				aria-label="Página anterior">
				&lsaquo;
			</button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
				<button
					key={n}
					type="button"
					className={`pt__pagBtn${n === currentPage ? ' pt__pagBtn--active' : ''}`}
					onClick={() => onPageChange(n)}
					aria-current={n === currentPage ? 'page' : undefined}>
					{n}
				</button>
			))}

			<button
				type="button"
				className="pt__pagBtn pt__pagBtn--arrow"
				disabled={currentPage >= totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				aria-label="Página siguiente">
				&rsaquo;
			</button>
		</nav>
	)
}
