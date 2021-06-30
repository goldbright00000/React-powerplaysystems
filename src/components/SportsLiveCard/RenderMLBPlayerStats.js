import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import MLBLiveIcon from "../../icons/MLBLiveIcon";
import { isEmpty } from "lodash";

function RenderMLBPlayerStats(props) {
  const { hitter = {}, pitcher = {}, largeView = false } = props || {};

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
  } = hitter || {};

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
  } = pitcher || {};

  return (
    <div className={classes.mlbPlayerStats}>
      <div className={classes.mlbPlayerStats_left}>
        {!isEmpty(hitter) && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <BaseballStick />
              <p className={largeView && classes.large_view}>{hitterName}</p>
            </div>
            <span>{0}</span>
          </div>
        )}

        {!isEmpty(pitcher) && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <Baseball />
              <p className={largeView && classes.large_view}>{pitcherName}</p>
            </div>
            <span>{0}</span>
          </div>
        )}
      </div>
      <MLBLiveIcon size={largeView && 79} className={classes.svg_icon} />
    </div>
  );
}

RenderMLBPlayerStats.propTypes = {
  hitter: PropTypes.object,
  pitcher: PropTypes.object,
  largeView: PropTypes.bool,
};

export default RenderMLBPlayerStats;
