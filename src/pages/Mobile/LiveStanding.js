import React from "react";
import StandingBanner from "../../components/mobilecomponents/LiveStandingBanner";
import PrizePool from "../../components/mobilecomponents/PrizePool/PrizePool";
import Header from "../../components/mobilecomponents/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import { Main, StandingWrapper } from "./style";
const LiveStanding = () => {
  return (
    <Main>
      <Header />

      <StandingWrapper>
        <StandingBanner />
        <PrizePool />
      </StandingWrapper>

      <LiveMatch />
    </Main>
  );
};

export default LiveStanding;
