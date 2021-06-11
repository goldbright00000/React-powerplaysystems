import React from "react";
import ContestRules from "../../../../components/mobilecomponents/ContestRules";
import PoweredBy from "../../../../components/mobilecomponents/PoweredBy";
import ScoreBoard from "../../../../components/mobilecomponents/ScoreBoard";

const TeamManager = ({ state, setState }) => {
  return (
    <>
      <ScoreBoard
        showTagLine={true}
        tagLine="Sp"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={false}
        icons={false}
        baseBall={false}
        title="Aron Rodgers"
        subTitle="IP: 3.1  |  PC:34  |  K:4  |  W:3"
        fieldText="Batting"
        fieldColor="#3f9946"
        points="6"
        secondShow={true}
      />
      <ScoreBoard
        tagLine="IF 1"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={false}
        icons={false}
        baseBall={false}
        title="Aron Rodgers"
        subTitle=".278  |  1/4  |  RBI:1  |  R:0"
        fieldText="On Field"
        fieldColor="rgba(242, 242, 242, 0.7)"
        points="6"
        secondShow={false}
      />
      <ScoreBoard
        tagLine="IF 2"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={false}
        icons={false}
        baseBall={true}
        title="Aron Rodgers"
        subTitle=".230  |  1/4  |  RBI:3  |  R:1"
        fieldText="On Deck"
        fieldColor="#e03c2d"
        points="6"
        notShow={true}
        secondShow={true}
      />
      <ScoreBoard
        tagLine="OF 1"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={false}
        icons={true}
        baseBall={true}
        title="Aron Rodgers"
        subTitle="IP: 3.1  |  PC:34  |  K:4  |  W:3"
        fieldText="Homerun!"
        fieldColor="#3f9946"
        points="6"
        notShow={true}
        secondShow={true}
      />
      <ScoreBoard
        tagLine="OF 2"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={true}
        icons={false}
        baseBall={true}
        title="Aron Rodgers"
        subTitle=".278  |  1/4  |  RBI:1  |  R:0"
        fieldText="On Deck"
        fieldColor="#e03c2d"
        points="6"
        notShow={true}
        secondShow={true}
      />
      <ScoreBoard
        tagLine="DH"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={true}
        featured={false}
        icons={false}
        baseBall={true}
        title="Aron Rodgers"
        subTitle=".278  |  1/4  |  RBI:1  |  R:0"
        fieldText="Hitting"
        fieldColor="#3f9946"
        points="12"
        notShow={true}
        secondShow={true}
        imageTochanged={true}
      />
      <ScoreBoard
        tagLine="RP"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={true}
        icons={false}
        baseBall={false}
        title="Aron Rodgers"
        subTitle="IP: 3.1  |  PC:34  |  K:4  |  W:3"
        fieldText="Dougout"
        fieldColor="rgba(242, 242, 242, 0.7)"
        points="6"
        secondShow={true}
        notShow={true}
      />
      <ScoreBoard
        tagLine="DH"
        firstTeam="Toronto Blue Jays 10"
        secondTeam="Detroit Tigers 2"
        double={false}
        featured={false}
        icons={false}
        baseBall={true}
        title="Toronto Blue Jays"
        subTitle="40-45  |  Avg Runs Against: 4.3"
        fieldText="Pitching"
        fieldColor="#3f9946"
        points="-6"
        notShow={true}
        secondShow={true}
        otherIcons={true}
        imageTochanged={true}
      />
      <PoweredBy />

      <ContestRules />
    </>
  );
};

export default TeamManager;
