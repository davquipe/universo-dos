import { useMemo, useState } from 'react'
import Header from './components/common/Header'
import UniverseHeader from './components/form/UniverseHeader'
import PlayersPage from './components/Page/PlayersPage'
import MatchesPage from './components/Page/MatchesPage'
import DTFilterPage from './components/Page/DTFilterPage'
import FooterCredits from './components/common/Footer'
import { useScores, getUniqueDTs } from './hooks/userPlayer'
type View = 'general' | 'matches' | 'byDT'

function App() {
	const [view, setView] = useState<View>('general')
	const [selectedDT, setSelectedDT] = useState('')
	const { data } = useScores()

	const dtList = useMemo(() => {
		if (!data) return []
		return getUniqueDTs(data)
	}, [data])

	const handleSelectDT = (dt: string) => {
		setSelectedDT(dt)
		setView('byDT')
	}

	return (
		<>
			<Header />

			<UniverseHeader
				bgUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/seleccion-peruana-peru-partidos-jugados-goles-estadisticas-convocados-mano-menezes-otros-dt/img/header-desktop.png"
				mobileBgUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/seleccion-peruana-peru-partidos-jugados-goles-estadisticas-convocados-mano-menezes-otros-dt/img/header-mobile.png"
				activeView={view}
				onClickGeneral={() => setView('general')}
				onClickMatches={() => setView('matches')}
				dtList={dtList}
				selectedDT={selectedDT}
				onSelectDT={handleSelectDT}
			/>

			{view === 'general' && <PlayersPage />}
			{view === 'matches' && <MatchesPage />}
			{view === 'byDT' && <DTFilterPage selectedDT={selectedDT} />}

			<FooterCredits
				logoUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/fichajes-futbol-peruano-transferencias-ventas-prestamos-pases-libres-2005-actualidad-historial/img/logo.png"
				logoAlt="El Comercio"
				credits={[
					{ label: 'Investigación', name: 'Raúl Castillo' },
					{
						label: 'Diseño e Investigación',
						name: 'Christian Marlow',
					},
					{ label: 'Programación', name: 'David Condori' },
				]}
			/>
		</>
	)
}

export default App
