import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import classes from "./index.module.scss";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import EmptyRunner from "../../icons/Runners/EmptyRunner";
import RunnerRight from "../../icons/Runners/RunnerRight";
import RunnerTop from "../../icons/Runners/RunnerTop";
import RunnerLeft from "../../icons/Runners/RunnerLeft";
import RunnerTopRight from "../../icons/Runners/RunnerTopRight";
import RunnerTopLeft from "../../icons/Runners/RunnerTopLeft";
import RunnerTopRightLeft from "../../icons/Runners/RunnerTopRightLeft";
import RunnerLeftRight from "../../icons/Runners/RunnerLeftRight";

function RenderMLBPlayerStats(props) {
  const {
    hitter = {},
    pitcher = {},
    type = "",
    largeView = false,
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    batting_average = 0,
  } = props || {};

  const {
    active: isHitterActive = false,
    bat_hand: hBatHand = "R",
    current_position: hCurrentPos = "OF",
    current_team: hCurrenTeam = 11266,
    datafeed_id: hDataFeedId = "0f626ddc-1c79-43af-9407-12aa1381d420",
    height: hHeight = "72",
    is_injured: isHInjured = true,
    jersey_number: jJersyNumber = 21,
    name: hitterName = "Austin Hays",
    player_id: hId = 10885,
    primary_position: hPrimaryPos = "LF",
    throw_hand: hThrowHand = "R",
    type: hitterType = "OF",
    mlb_player_stats: hitterStats = [],
  } = hitter || {};

  const {
    base_on_balls: hBOB = 0,
    batting_average: hbBA = 0,
    doubles: Hdoubles = 0,
    earned_runs_average: hERA = 0,
    hits: hHits = 0,
    home_runs: hHomeRuns = 0,
    innings_pitched: hIp = 0,
    losses: hLosses = 0,
    ops: HOPS = 0,
    player_id: hPlayerId = 0,
    runs_batted_in: hRBI = 0,
    season_id: hSeasonId = 0,
    stats_id: hStatId = 0,
    stolen_bases: hStolenBases = 0,
    strike_outs: hStrikeOuts = 0,
    triples: hTriples = 0,
    type: hType = "",
    updated_at: hUpdateAt = "",
    walks_hits_per_innings_pitched: hWHPIP = 0,
    wins: hWins = 0,
  } = hitterStats[0] || {};

  const {
    active: isPittcherActive = true,
    bat_hand: pBatHand = "R",
    current_position: pCurrentPos = "P",
    current_team: pCurrentTeam = 11288,
    datafeed_id: pDataFeedId = "51f6f215-403e-43c9-8647-c0fb8a36af47",
    height: pHeight = "74",
    is_injured: isPInjured = false,
    jersey_number: pJersyNumber = 55,
    name: pitcherName = "Ryan Pressly",
    player_id: pId = 11294,
    primary_position: pPrimaryPos = "RP",
    throw_hand: pThrowHand = "R",
    type: pType = "P",
    mlb_player_stats: pitcherStats = [],
  } = pitcher || {};

  const {
    base_on_balls: pBOB = 0,
    batting_average: pbBA = 0,
    doubles: pdoubles = 0,
    earned_runs_average: pERA = 0,
    hits: pHits = 0,
    home_runs: pHomeRuns = 0,
    innings_pitched: pIp = 0,
    losses: pLosses = 0,
    ops: pOPS = 0,
    player_id: pPlayerId = 0,
    runs_batted_in: pRBI = 0,
    season_id: pSeasonId = 0,
    stats_id: pStatId = 0,
    stolen_bases: pStolenBases = 0,
    strike_outs: pStrikeOuts = 0,
    triples: pTriples = 0,
    updated_at: pUpdateAt = "",
    walks_hits_per_innings_pitched: pWHPIP = 0,
    wins: pWins = 0,
  } = pitcherStats[0] || {};

  const formatName = (name) => {
    const n = `${name}`.split(" ");

    return `${n[0]?.substring(0, 1)}`?.toUpperCase() + ". " + `${n[1]}`;
  };

  const RenderBaseRunner1 = () => {
    if (
      !isEmpty(baserunner_1) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_3) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerRight />; //base runner 1 icon
    }

    return <></>;
  };

  const RenderBaseRunner2 = () => {
    if (
      !isEmpty(baserunner_2) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_3) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerTop />; //base runner 2 icon
    }

    return <></>;
  };

  const RenderBaseRunner3 = () => {
    if (
      !isEmpty(baserunner_3) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerLeft />; //base runner 3 icon
    }

    return <></>;
  };

  const RenderBaseRunner4 = () => {
    if (
      !isEmpty(baserunner_4) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_3)
    ) {
      return <></>; //base runner 2 icon
    }

    return <></>;
  };

  const RenderBaseRunner1_2 = () => {
    if (
      !isEmpty(baserunner_1) &&
      !isEmpty(baserunner_2) &&
      isEmpty(baserunner_3) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerTopRight />; //base runner 1 & 2 icon
    }

    return <></>;
  };

  const RenderBaseRunner1_3 = () => {
    if (
      !isEmpty(baserunner_1) &&
      !isEmpty(baserunner_3) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerLeftRight />; //base runner 1 & 3 icon
    }

    return <></>;
  };

  const RenderBaseRunner1_4 = () => {
    if (
      !isEmpty(baserunner_1) &&
      !isEmpty(baserunner_4) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_3)
    ) {
      return <RunnerLeftRight />; //base runner 1 and 4 icon
    }

    return <></>;
  };

  const RenderBaseRunner2_3 = () => {
    if (
      !isEmpty(baserunner_2) &&
      !isEmpty(baserunner_3) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerTopLeft />; //base runner 2 and 3 icon
    }

    return <></>;
  };

  const RenderBaseRunner2_4 = () => {
    if (
      !isEmpty(baserunner_2) &&
      !isEmpty(baserunner_4) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_3)
    ) {
      return <></>; //base runner 2 icon
    }

    return <></>;
  };

  const RenderBaseRunner3_4 = () => {
    if (
      !isEmpty(baserunner_3) &&
      !isEmpty(baserunner_4) &&
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_2)
    ) {
      return <></>; //base runner 2 icon
    }

    return <></>;
  };

  const RenderBaseRunner1_2_3 = () => {
    if (
      !isEmpty(baserunner_1) &&
      !isEmpty(baserunner_2) &&
      !isEmpty(baserunner_3) &&
      isEmpty(baserunner_4)
    ) {
      return <RunnerTopRightLeft />; //base runner 2 icon
    }

    return <></>;
  };

  const RenderEmptyBaseRunner = () => {
    if (
      isEmpty(baserunner_1) &&
      isEmpty(baserunner_2) &&
      isEmpty(baserunner_3) &&
      isEmpty(baserunner_4)
    ) {
      return <EmptyRunner />; //empty icon
    }

    return <></>;
  };

  return (
    <div className={classes.mlbPlayerStats}>
      <div className={classes.mlbPlayerStats_left}>
        {!isEmpty(hitter) && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <BaseballStick />
              <p className={largeView && classes.large_view}>
                {formatName(hitterName)}
              </p>
            </div>
            <span>
              {batting_average} | {0}
            </span>
          </div>
        )}

        {!isEmpty(pitcher) && type !== "P" && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <Baseball />
              <p className={largeView && classes.large_view}>
                {formatName(pitcherName)}
              </p>
            </div>
            <span>{0}</span>
          </div>
        )}
      </div>
      {largeView && (
        <>
          <RenderEmptyBaseRunner />
          <RenderBaseRunner1 />
          <RenderBaseRunner2 />
          <RenderBaseRunner3 />
          <RenderBaseRunner4 />
          <RenderBaseRunner1_2 />
          <RenderBaseRunner1_3 />
          <RenderBaseRunner1_4 />
          <RenderBaseRunner2_3 />
          <RenderBaseRunner2_4 />
          <RenderBaseRunner3_4 />
          <RenderBaseRunner1_2_3 />
        </>
      )}
    </div>
  );
}

RenderMLBPlayerStats.propTypes = {
  hitter: PropTypes.object,
  pitcher: PropTypes.object,
  largeView: PropTypes.bool,
  type: PropTypes.string,
  baserunner_1: PropTypes.number,
  baserunner_2: PropTypes.number,
  baserunner_3: PropTypes.number,
  baserunner_4: PropTypes.number,
  batting_average: PropTypes.number,
};

export default RenderMLBPlayerStats;
