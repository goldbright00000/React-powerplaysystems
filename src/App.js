import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SelectTeamsPage from './pages/SelectTeamsPage/SelectTeamsPage';
import PowerPlaySponsorsPage from './pages/PowerPlaySponsorsPage/PowerPlaySponsorsPage';
import SponserAContestPage from './pages/SponserAContestPage/SponserAContestPage';
import PowerCenter from './pages/PowerCenter/PowerCenter';

const App = props => (
    <Switch>
        <Route exact path='/power-play-sponsors' component={PowerPlaySponsorsPage} />
        <Route path='/power-play-sponsors/sponsor-a-contest' component={SponserAContestPage} />
        <Route exact path='/' component={HomePage} />
        <Route path='/power-center' component={PowerCenter} />
        <Route path='/select-teams' component={SelectTeamsPage} />
    </Switch>   
)

export default App;