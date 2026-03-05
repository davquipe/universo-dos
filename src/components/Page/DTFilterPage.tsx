import { useMemo, useState } from 'react'
import {
	useScores,
	aggregatePlayers,
	getUniqueDTs,
} from '../../hooks/userPlayer'
import PlayerTable from '../PlayerTable/PlayerTable'

export default function DTFilterPage() {
	const { data, isLoading, isError } = useScores()
	const [selectedDT, setSelectedDT] = useState('')

	const dtList = useMemo(() => {
		if (!data) return []
		return getUniqueDTs(data)
	}, [data])

	const rows = useMemo(() => {
		if (!data || !selectedDT) return []
		const filtered = data.filter((r) => r.directorTecnico === selectedDT)
		return aggregatePlayers(filtered)
	}, [data, selectedDT])

	if (isLoading) return <p>Cargando datos…</p>
	if (isError) return <p>Hubo un error al cargar los datos.</p>

	return (
		<>
			<div className="uheader__dtSelect">
				<select
					value={selectedDT}
					onChange={(e) => setSelectedDT(e.target.value)}
					aria-label="Filtrar por Director Técnico">
					<option value="">Selecciona un DT</option>
					{dtList.map((dt) => (
						<option key={dt} value={dt}>
							{dt}
						</option>
					))}
				</select>
			</div>

			{selectedDT && (
				<PlayerTable
					rows={rows}
					emptyStateText="No hay jugadores para este DT."
				/>
			)}
		</>
	)
}
