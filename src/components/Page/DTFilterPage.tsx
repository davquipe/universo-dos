import { useMemo } from 'react'
import { useScores, aggregatePlayers } from '../../hooks/userPlayer'
import PlayerTable from '../PlayerTable/PlayerTable'

type Props = {
	selectedDT: string
}

export default function DTFilterPage({ selectedDT }: Props) {
	const { data, isLoading, isError } = useScores()

	const rows = useMemo(() => {
		if (!data || !selectedDT) return []
		const filtered = data.filter((r) => r.directorTecnico === selectedDT)
		return aggregatePlayers(filtered)
	}, [data, selectedDT])

	if (isError) return <p>Hubo un error al cargar los datos.</p>
	if (!selectedDT)
		return (
			<p style={{ textAlign: 'center', color: '#999' }}>
				Selecciona un DT desde el botón.
			</p>
		)

	return (
		<PlayerTable
			rows={rows}
			emptyStateText="No hay jugadores para este DT."
			loading={isLoading}
		/>
	)
}
