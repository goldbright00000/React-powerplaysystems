import React, { useState } from "react";
import "./App.css";
import Banner from "../../components/mobilecomponents/Banner";
import Header from "../../components/mobilecomponents/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import Tabs from "../../components/mobilecomponents/Tabs/Tabs";
import ThreeBoxes from "../../components/mobilecomponents/ThreeBoxes";

import "./mainStyle.scss";
import ScoreDetails from "./views/ScoreDetails";
import TeamManager from "./views/TeamManager";

function App(props) {
  const { data = [], ranks = {} } = props || {};

  const [state, setState] = useState(1);
  const [swap, setSwap] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const boostModal = (value) => {
    setSecondModal(!secondModal);
  };

  const swapModal = (value) => {
    setSwap(!swap);
  };
  const changeComponent = (state) => {
    switch (state) {
      case 1:
        return (
          <TeamManager
            state={state}
            setState={setState}
            swap={setSwap}
            boostModal={boostModal}
            swapModal={swapModal}
            data={data}
          />
        );
      case 2:
        return <ScoreDetails state={state} setState={setState} />;
      default:
        return <TeamManager state={state} setState={setState} data={data} />;
    }
  };

  return (
    <section className="main">
      <Header />
      <Banner />
      <ThreeBoxes state={state} showTime={true} />
      <Tabs state={state} setState={setState} />
      {changeComponent(state)}
      <LiveMatch
        swap={swap}
        setSwap={setSwap}
        secondModal={secondModal}
        setSecondModal={setSecondModal}
        boostModal={boostModal}
        swapModal={swapModal}
        ranks={ranks}
      />
    </section>
  );
}

export default App;
