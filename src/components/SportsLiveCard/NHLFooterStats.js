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
  const {
    live_match_events = {}
  } = useSelector((state) => state.nhl);
  const getTeamPoints = (id) => {
    let filteredData = live_match_events.filter(x => x.id == id);
    
    if(filteredData.length > 0)
    {
      return filteredData[filteredData.length - 1];
    }
    return false;
  };
  //Player Details
  const { match, OppGoalie = "0", team = {} } = player || {};
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
          {team?.id == match?.away?.id && 
            <><p>{match?.home?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.home?.points:0} vs</p>
            <p className="bold_text"> {match?.away?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.away?.points:0}</p></>
          }
          {team?.id == match?.home?.id && 
            <><p>{match?.away?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.away?.points:0} vs</p>
            <p className="bold_text"> {match?.home?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.home?.points:0}</p></>
          }
        </div>
      )}
      {/* <div className="footer_stats_row">
        <img src={SoccerIcon} alt="Hockey Icon" width={12} height={12} />
        <p>{away?.alias} G: {OppGoalie}</p>
      </div> */}
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          P{getTeamPoints(match?.id) !== false ? (getTeamPoints(match?.id)?.period + 1) : (live_period + 1)} | {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.eventData?.clock : live_clock}
        </p>
      </div>
      <div className="footer_stats_row">
        <img src={SoccerJerseyIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          {live_strength !== "even" ? isTeamD ? teamB.alias + " - " : player?.team?.alias + " - " : ""}
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
