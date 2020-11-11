import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SelectTeamsPage from './pages/SelectTeamsPage/SelectTeamsPage';
import PowerPlaySponsorsPage from './pages/PowerPlaySponsorsPage/PowerPlaySponsorsPage';

const App = props => (
    <Switch>
        <Route path='/power-play-sponsors' component={PowerPlaySponsorsPage} />
        <Route exact path='/' component={HomePage} />
        <Route path='/select-teams' component={SelectTeamsPage} />
    </Switch>   
)

export default App;