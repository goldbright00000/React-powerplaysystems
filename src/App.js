import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SponserContestPage from './pages/SponserContestPage/SponserContestPage';

const App = props => (
    <Switch>
        <Route path='/sponser-central' component={SponserContestPage} />
        <Route exact path='/' component={HomePage} />
    </Switch>   
)

export default App;