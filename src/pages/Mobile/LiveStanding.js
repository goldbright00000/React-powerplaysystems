import React from "react";
import StandingBanner from "../../components/mobilecomponents/LiveStandingBanner";
import PrizePool from "../../components/mobilecomponents/PrizePool/PrizePool";
import Header from "../../components/mobilecomponents/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";

import "./mainStyle.scss";
const LiveStanding = () => {
  return (
    <section className="main">
      <Header />

      <div className="standingWrapper">
        <StandingBanner />
        <PrizePool />
      </div>

      <LiveMatch />
    </section>
  );
};

export default LiveStanding;
