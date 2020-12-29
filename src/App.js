import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PowerPlaySponsorsPage from './pages/PowerPlaySponsorsPage/PowerPlaySponsorsPage';
import SponserAContestPage from './pages/SponserAContestPage/SponserAContestPage';
import PowerCenter from './pages/PowerCenter/PowerCenter';
import SelectTeams from './pages/SelectTeams/SelectTeams';
import PowerBetLive from './pages/PowerBetLive/PowerBetLive';
import ScrollToTop from './utility/ScrollToTop';
import BingoPreGame from './pages/BingoPreGame/BingoPreGame';
import CardGame from './pages/CardGame';
import PowerPicks from './pages/PowerPicks';
import ChaseACard from './pages/ChaseACard';
import SignInPage from './pages/SignInPage/SignInPage';

const App = props => {
    return (
        <Fragment>
            <ScrollToTop />
            <Switch>
                <Route exact path='/power-play-sponsors' component={PowerPlaySponsorsPage} />
                <Route path='/power-play-sponsors/sponsor-a-contest' component={SponserAContestPage} />
                <Route exact path='/' component={HomePage} />
                <Route path='/power-center' component={PowerCenter} />
                <Route path='/select-teams' component={SelectTeams} />
                <Route path='/powerbet-live' component={PowerBetLive} />
                <Route path='/bingo-game' component={BingoPreGame} />
                <Route path='/card-game' component={CardGame} />
                <Route path='/power-picks' component={PowerPicks} />
                <Route path='/chase-a-card' component={ChaseACard} />
                <Route path='/signin' component={SignInPage} />
            </Switch>
        </Fragment>
    )
}

export default App;