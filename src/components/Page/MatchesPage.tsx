import { useMemo } from 'react'
import { useScores, groupByMatch } from '../../hooks/userPlayer'
import MatchAccordion from '../accordion/MatchAccordion'

function formatDateLabel(fechaFormatted: string, tipo: string): string {
	try {
		const parts = fechaFormatted.split('/')
		if (parts.length === 3) {
			const date = new Date(+parts[2], +parts[0] - 1, +parts[1])
			const formatted = date.toLocaleDateString('es-PE', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
			return `${formatted} (${tipo})`
		}
	} catch {
		/* fallback */
	}
	return `${fechaFormatted} (${tipo})`
}

export default function MatchesPage() {
	const { data, isLoading, isError } = useScores()

	const matches = useMemo(() => {
		if (!data) return []
		return groupByMatch(data)
	}, [data])

	if (isLoading) return <p>Cargando partidos…</p>
	if (isError) return <p>Hubo un error al cargar los datos.</p>

	return (
		<>
			{matches.map((m, idx) => (
				<MatchAccordion
					key={m.partidoId}
					dateLabel={formatDateLabel(m.fechaFormatted, m.tipo)}
					title={`${m.local} ${m.golesLocal} - ${m.golesVisita} ${m.visita}`}
					venue={`${m.estadio} - ${m.ciudadPais}`}
					rows={m.players}
					defaultOpen={idx === 0}
				/>
			))}
		</>
	)
}
