import React from "react";
import ScoreCard from "../../../../components/mobilecomponents/ScoreCard";
import SwingAway from "../../../../components/mobilecomponents/SwingAway/SwingAway";
import PoweredBy from "./../../../../components/mobilecomponents/PoweredBy";

const ScoreDetails = () => {
  return (
    <>
      <ScoreCard
        collapseId={1}
        showFull={true}
        sideTitle="Sp"
        title="Aaron Rodgers"
        subtitle="Top 1"
        totalPts="8"
        image="/images/2xGold.svg"
        myScore="16"
        clr="#4bb654"
        bgClr="rgba(43, 105, 48, 0.1)"
        runnungTotal="16"
      />
      <ScoreCard
        collapseId={2}
        showFull={false}
        sideTitle="1B"
        title="Aaron Rodgers"
        subtitle="Bottom 4"
        totalPts="2"
        image="/images/2xGold.svg"
        myScore="16"
        clr="#4bb654"
        bgClr="rgba(43, 105, 48, 0.1)"
        runnungTotal="18"
      />

      <ScoreCard
        collapseId={3}
        showFull={false}
        sideTitle="2B"
        title="Aaron Rodgers"
        subtitle="Top 9"
        totalPts="2"
        image={false}
        myScore="16"
        clr="#4bb654"
        bgClr="rgba(43, 105, 48, 0.1)"
        runnungTotal="16"
      />

      <ScoreCard
        collapseId={4}
        showFull={false}
        sideTitle="3B"
        title="Aaron Rodgers"
        subtitle="Bot 8"
        totalPts="4"
        image="/images/2xGold.svg"
        myScore="16"
        clr="#4bb654"
        bgClr="rgba(43, 105, 48, 0.1)"
        runnungTotal="22"
      />

      <ScoreCard
        background={true}
        collapseId={4}
        showFull={false}
        sideTitle="SP"
        title="Aaron Rodgers"
        subtitle="Top 13"
        totalPts="2"
        image="/images/2xGold.svg"
        myScore="Reversed -4"
        clr="#e63f2f"
        bgClr="rgba(230, 63, 47, 0.2)"
        runnungTotal="18"
      />

      <ScoreCard
        collapseId={4}
        showFull={false}
        sideTitle="RP"
        title="Aaron Rodgers"
        subtitle="Bot 8"
        totalPts="7"
        image="/images/2xGold.svg"
        myScore="14"
        clr="#4bb654"
        bgClr="rgba(43, 105, 48, 0.1)"
        runnungTotal="32"
      />
      <PoweredBy />

      <SwingAway />
    </>
  );
};

export default ScoreDetails;
