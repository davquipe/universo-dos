import { useState } from 'react'
import Header from './components/common/Header'
import UniverseHeader from './components/form/UniverseHeader'
import PlayersPage from './components/Page/PlayersPage'
import MatchesPage from './components/Page/MatchesPage'
import DTFilterPage from './components/Page/DTFilterPage'
import FooterCredits from './components/common/Footer'
type View = 'general' | 'matches' | 'byDT'

function App() {
	const [view, setView] = useState<View>('general')

	return (
		<>
			<Header />

			<UniverseHeader
				bgUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/mundial-de-clubes-2029-clasificacion-tabla-de-posiciones-como-van-equipos-conmebol/img/universoBicolor.png"
				mobileBgUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/mundial-de-clubes-2029-clasificacion-tabla-de-posiciones-como-van-equipos-conmebol/img/MOBILE.png"
				activeView={view}
				onClickGeneral={() => setView('general')}
				onClickMatches={() => setView('matches')}
				onClickByDT={() => setView('byDT')}
			/>

			{view === 'general' && <PlayersPage />}
			{view === 'matches' && <MatchesPage />}
			{view === 'byDT' && <DTFilterPage />}

			<FooterCredits
				logoUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/fichajes-futbol-peruano-transferencias-ventas-prestamos-pases-libres-2005-actualidad-historial/img/logo.png"
				logoAlt="El Comercio"
				credits={[
					{ label: 'Investigación', name: 'Raúl Castillo' },
					{ label: 'Diseño', name: 'Christian Marlow' },
					{ label: 'Programación', name: 'David Condori' },
				]}
			/>
		</>
	)
}

export default App
