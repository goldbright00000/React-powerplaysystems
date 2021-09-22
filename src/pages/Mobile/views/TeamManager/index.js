import React from "react";
import moment from "moment";

import ContestRules from "../../../../components/mobilecomponents/ContestRules";
import PoweredBy from "../../../../components/mobilecomponents/PoweredBy";
import ScoreBoard from "../../../../components/mobilecomponents/ScoreBoard";
import { removeZeroBeforeDecimalPoint } from "../../../../utility/shared";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../../../../utility/constants";

const TeamManager = ({
  state,
  setState,
  setSwap,
  boostModal,
  swapModal,
  data = [],
  ranks = {},
  counts = {},
  player = {},
  prizePool = 0,
  gameInfo = {}
}) => {
  const RenderSubTitle = (
    type,
    innings_pitched,
    pitch_count,
    strike_outs,
    walks,
    batting_average,
    hits,
    plate_appearances,
    runs_batted_in,
    runs
  ) => {
    return type === "P"
      ? `IP: ${innings_pitched}  |  PC:${pitch_count}  |  K:${strike_outs}  |  W:${walks}`
      : `
      ${removeZeroBeforeDecimalPoint(
        batting_average
      )} | ${hits} / ${plate_appearances} |  RBI:${runs_batted_in} | R:${runs}
    `;
  };

  const getStatus = (status, date_time) => {
    if (`${status}`?.toLocaleLowerCase() === "scheduled") {
      return `${moment(date_time).format("MMM Do")} - ${moment(
        date_time
      ).format("hh:mm A")}`;
    }

    return status;
  };

  const showStatusText = (status, date_time) => {
    return getStatus(status, date_time);
  };

  const footerTitle = (current_inning_half, current_inning, outs) => {
    if (isEmpty(current_inning_half)) {
      return ``;
    }

    const currentInningHalf = `${current_inning_half}`.toLocaleLowerCase();
    if (currentInningHalf === "b") {
      return `Bot ${current_inning} | ${outs} outs`;
    }

    return `Top ${current_inning} | ${outs} outs`;
  };

  const RenderCard = () => {
    if (!data?.length) return <>No Data</>;

    if (data && data?.length) {
      return data?.map((data, index) => {
        const { player = {}, match = {}, xp = {}, score = 0 } = data || {};

        // const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

        const {
          name = "",
          type = "",
          type1 = "",
          points = 0,
          homeTeam = "",
          awayTeam = "",
          stats = {},
          playerStats = {},
          pointsSummary = [],
          totalPts = 0,
          isStarPlayer = false,
          range = "",
          id = "",
          mlb_player_stats = [],
          boost = {},
          current_team = "",
          player_id = "",
          match_stats = [],
          primary_position = "",
        } = player || {};

        const {
          base_on_balls = 0,
          batting_average = 0,
          doubles = 0,
          earned_runs_average = 0,
          home_runs = 0,
          losses = 0,
          ops = 0,
          // player_id = 0,
          // runs_batted_in = 0,
          season_id = 1,
          stats_id = 0,
          stolen_bases = 0,
          triples = 0,
          type: playerStatType = "",
          walks_hits_per_innings_pitched = 0,
          wins = 0,
        } = mlb_player_stats[0] || {};

        const {
          data_id = 0,
          match_id = 0,
          pitch_count = 0,
          walks = 0,
          hits = 0,
          runs = 0,
          runs_batted_in = 0,
          innings_pitched = 0,
          strike_outs = 0,
          plate_appearances = 0,
          // batting_average = 0,
          // earned_runs_average = 0,
        } = match_stats?.[0] || {};

        const {
          away_team = {},
          home_team = {},
          status = "",
          boxscore = [],
          date_time = "",
        } = match || {};

        const {
          // hits = 0,
          // doubles = 0,
          // triples = 0,
          // home_runs = 0,
          // stolen_bases = 0,
          // runs_batted_in = 0,
          // batting_average = 0,
          // wins = 0,
          // losses = 0,
          // innings_pitched = 0,
          strikes = 0,
          balls = 0,
          // earned_runs_average = 0,
          // base_on_balls = 0,
          // walks_hits_per_innings_pitched = 0,
          hitter = {},
          pitcher = {},
          outs = 0,
          home_team_runs = 0,
          away_team_runs = 0,
          baserunner_1 = null,
          baserunner_2 = null,
          baserunner_3 = null,
          baserunner_4 = null,
          current_inning = 0,
          current_inning_half = null,
        } = boxscore[0] || {};

        return (
          <ScoreBoard
            boostModal={boostModal}
            swapModal={swapModal}
            showTagLine={true}
            tagLine={
              data?.team_d_mlb_team?.type === CONSTANTS.FILTERS.MLB.D
                ? `${data?.team_d_mlb_team?.type}`.toLocaleUpperCase()
                : type === "XB" || type === "OF"
                ? type1
                : type
            }
            // tagLine={
            //   data?.team_d_mlb_team?.type === CONSTANTS.FILTERS.MLB.D
            //     ? `${data?.team_d_mlb_team?.type}`.toLocaleUpperCase()
            //     : primary_position
            // }
            firstTeam={`${away_team?.name} ${away_team_runs}`}
            secondTeam={`${home_team?.name} ${home_team_runs}`}
            double={false}
            featured={false}
            icons={false}
            baseBall={type === "P" ? false : !isEmpty(hitter)}
            title={name}
            subTitle={RenderSubTitle(
              type,
              innings_pitched,
              pitch_count,
              strike_outs,
              walks,
              batting_average,
              hits,
              plate_appearances,
              runs_batted_in,
              runs
            )}
            hitter={hitter}
            pitcher={pitcher}
            strikes={strikes}
            balls={balls}
            fieldText={showStatusText(status, date_time)}
            fieldColor="#3f9946"
            points={score}
            footerText={footerTitle(current_inning_half, current_inning, outs)}
            secondShow={true}
            key={`${index}`}
            type={type}
            index={index}
            ranks={ranks}
            counts={counts}
            player={data}
          />
        );
      });
    }
  };

  return (
    <>
      {RenderCard()}
      {/* <ScoreBoard
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
        boostModal={boostModal}
        swapModal={swapModal}
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
      /> */}
      <PoweredBy />

      <ContestRules prizePool={prizePool} gameInfo={gameInfo}/>
    </>
  );
};

export default TeamManager;
