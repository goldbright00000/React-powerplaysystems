import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import "./stats.scss";
import HockeyIcon from "../../assets/icons/nhl/hockey.svg";
import ClockIcon from "../../assets/icons/nhl/clock.svg";
import SoccerIcon from "../../assets/icons/nhl/soccer.svg";
import SoccerJerseyIcon from "../../assets/icons/nhl/soccer-jersey.svg";

function NHLFooterStats(props) {
  const {
    player = {},
    isTeamD = false,
    teamD = {},
    onClickBack = () => {},
    onClickDetails = () => {},
    showSummary = false,
    largeView = false,
    title = "",
  } = props || {};

  //Player Details
  const { match, OppGoalie = "" } = player || {};
  const { home, away } = match || {};

  //TeamD Details
  const { name = "", teamB = {}, alias = "" } = teamD || {};

  const {
    live_clock = "20:00",
    live_period = 0,
    live_strength = "even",
  } = useSelector((state) => state.nhl);


  return (
    <div>
      {isTeamD ? (
        <div className="footer_stats_row">
          <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
          <p>{alias} vs</p>
          <p className="bold_text"> {teamB.alias}</p>
        </div>
      ) : (
        <div className="footer_stats_row">
          <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
          <p>{away?.alias} vs</p>
          <p className="bold_text"> {home?.alias}</p>
        </div>
      )}
      <div className="footer_stats_row">
        <img src={SoccerIcon} alt="Hockey Icon" width={12} height={12} />
        <p>Opp. G: {OppGoalie}</p>
      </div>
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          P{live_period + 1} | {live_clock}
        </p>
      </div>
      <div className="footer_stats_row">
        <img src={SoccerJerseyIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          {isTeamD ? teamB.alias : player?.team?.alias} -{" "}
          {live_strength === "even"
            ? "Even Strength"
            : _.startCase(_.toLower(live_strength))}{" "}
        </p>
      </div>
    </div>
  );
}

NHLFooterStats.propTypes = {};

export default NHLFooterStats;
