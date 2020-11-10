import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SelectTeamsPage from './pages/SelectTeamsPage/SelectTeamsPage';
import SponserContestPage from './pages/SponserContestPage/SponserContestPage';

const App = props => (
    <Switch>
        <Route path='/sponser-central' component={SponserContestPage} />
        <Route exact path='/' component={HomePage} />
        <Route path='/select-teams' component={SelectTeamsPage} />
    </Switch>   
)

export default App;