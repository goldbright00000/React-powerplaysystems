import React, { useState } from "react";

import "./App.css";
import Banner from "../../components/mobilecomponents/Banner";
import Header from "../../components/mobilecomponents/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import Tabs from "../../components/mobilecomponents/Tabs/Tabs";
import ThreeBoxes from "../../components/mobilecomponents/ThreeBoxes";
import StandingBanner from "../../components/mobilecomponents/LiveStandingBanner";
import PrizePool from "../../components/mobilecomponents/PrizePool/PrizePool";

import { Main, StandingWrapper } from "./style";
import ScoreDetails from "./views/ScoreDetails";
import TeamManager from "./views/TeamManager";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [state, setState] = useState(1);

  const changeComponent = state => {
    switch (state) {
      case 1:
        return <TeamManager state={state} setState={setState} />;
      case 2:
        return <ScoreDetails state={state} setState={setState} />;
      default:
        return <TeamManager state={state} setState={setState} />;
    }
  };

  return (
    <Router>
      <Main>
        <Header />

        <Switch>
          <Route path="/">
            <Banner />
            <ThreeBoxes state={state} showTime={true} />
            <Tabs state={state} setState={setState} />
            {changeComponent(state)}
          </Route>
          <Route exact path="/live-standing">
            <StandingWrapper>
              <StandingBanner />
              <PrizePool />
            </StandingWrapper>
          </Route>
        </Switch>
        <LiveMatch />
      </Main>
    </Router>
  );
}

export default App;
