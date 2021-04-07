import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import MLBLiveIcon from "../../icons/MLBLiveIcon";

function RenderMLBPlayerStats(props) {
  const { playerStats = {}, largeView = false } = props || {};
  return (
    <div className={classes.mlbPlayerStats}>
      <div className={classes.mlbPlayerStats_left}>
        {playerStats?.battingPlayer && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <BaseballStick />
              <p className={largeView && classes.large_view}>
                {playerStats?.battingPlayer?.playerName}
              </p>
            </div>
            <span>{playerStats?.battingPlayer?.stats}</span>
          </div>
        )}

        {playerStats?.throwingPlayer && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <Baseball />
              <p className={largeView && classes.large_view}>
                {playerStats?.throwingPlayer?.playerName}
              </p>
            </div>
            <span>{playerStats?.throwingPlayer?.stats}</span>
          </div>
        )}
      </div>
      <MLBLiveIcon size={largeView && 79} />
    </div>
  );
}

RenderMLBPlayerStats.propTypes = {
  playerStats: PropTypes.object,
  largeView: PropTypes.bool,
};

export default RenderMLBPlayerStats;
