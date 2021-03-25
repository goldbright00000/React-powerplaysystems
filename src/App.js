import React, { Fragment } from 'react';
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
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import TrustAndSafety from './pages/TrustAndSafety';
import AccountSecurity from './pages/AccountSecurity';
import TermsOfUse from './pages/TermsOfUse';
import PowerUpPage from './pages/PowerUpPage/PowerUpPage';
import GetUserInfoPage from './pages/GetUserInfoPage/GetUserInfoPage';
import BingoInProgressGame from './pages/BingoInProgressGame/BingoInProgressGame';
import Elite8 from './pages/Elite8';
import Elite8Draw from './pages/Elite8Draw';
import LoginPage from './pages/Login';
import RoyalGame from './pages/RoyalGame';
import PowerPoker from './pages/PowerPoker';
import LandingPage from './pages/LandingPage';
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyGameCenter from './pages/MyGameCenter/MyGameCenter';
import MLBPowerdFs from './pages/MLBpowerdFS';
import NHLPowerdFs from './pages/NHLpowerdFS';
import NBAPowerdFs from './pages/NBApowerdFS';
import NHLPowerdFsLive from './pages/NHLPowerdfsLive';
import NHLLivePowerdFsScroeDetail from './pages/NHLLivePowerdFsScroeDetail/NHLLivePowerdFsScroeDetail';
import LiveStandings from './pages/LiveStandings';



const App = props => {
    return (
        <Fragment>
            <ScrollToTop />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/power-play-sponsors' component={PowerPlaySponsorsPage} />
                <Route exact path="/nhl-live-powerdfs/my-score-details" component={NHLLivePowerdFsScroeDetail} />
                <Route path='/power-play-sponsors/sponsor-a-contest' component={SponserAContestPage} />
                <Route path='/power-center' component={PowerCenter} />
                <Route path='/select-teams' component={SelectTeams} />
                <Route path='/powerbet-live' component={PowerBetLive} />
                <Route path='/bingo-pre-game' component={BingoPreGame} />
                <Route path='/card-game' component={CardGame} />
                {/* <ProtectedRoute path='/card-game' component={CardGame} /> */}
                <Route path='/power-picks' component={PowerPicks} />
                <Route path='/chase-a-card' component={ChaseACard} />
                <Route path='/faqs' component={FAQ} />
                <Route path='/privacy' component={Privacy} />
                <Route path='/trust-and-safety' component={TrustAndSafety} />
                <Route path='/account-security' component={AccountSecurity} />
                <Route path='/terms' component={TermsOfUse} />
                <Route path='/power-up' component={PowerUpPage} />
                <Route path='/user-profile-info' component={GetUserInfoPage} />
                <ProtectedRoute path='/my-game-center' component={MyGameCenter} />
                <Route path='/bingo-in-progress' component={BingoInProgressGame} />
                <Route path="/login" component={LoginPage} />
                <Route path="/power-royals" component={RoyalGame} />
                <Route path="/power-poker" component={PowerPoker} />
                <Route path="/landing-page" component={LandingPage} />
                <ProtectedRoute path="/my-account" component={AccountPage} />
                <Route exact path='/elite8' component={Elite8} />
                <Route exact path='/elite8-draw' component={Elite8Draw} />
                <Route path='/mlb-powerdfs' component={MLBPowerdFs} />
                <Route path='/nhl-powerdfs' component={NHLPowerdFs} />
                <Route path='/nba-powerdfs' component={NBAPowerdFs} />
                <Route path="/nhl-live-powerdfs" component={NHLPowerdFsLive} />
                <Route path="/live-standings" component={LiveStandings} />
                <Route component={HomePage} />
            </Switch>
        </Fragment>
    )
}

export default App;