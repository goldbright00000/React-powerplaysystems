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
    live_match_events = {},
    match_status = []
  } = useSelector((state) => state.nhl);
  const getTeamPoints = (id, id2) => {
    let filteredData = match_status.filter(x => x.id == id);
    if(filteredData.length > 0)
    {
      let a = filteredData[filteredData.length - 1];
      if(a.away.id == id2){
        return a?.away?.points;
      }
      if(a.home.id == id2){
        return a?.home?.points;
      }
    }
    return false;
  };
  const getTeamPoints1 = (id) => {
    let filteredData = match_status.filter(x => x.id == id);
    if(filteredData.length > 0)
    {
      let a = filteredData[filteredData.length - 1];
      return a;
    }
    return false;
  };
  //Player Details
  const { match, OppGoalie = "0", team = {} } = player || {};
  const { home, away } = match || {};

  //TeamD Details
  const { name = "", teamB = {}, alias = "", match: teamDMatch = {} } = teamD || {};
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
          <p className="bold_text">{teamDMatch?.away?.alias == alias ? teamDMatch?.home?.alias : teamDMatch?.away?.alias}</p>
        </div>
      ) : (
        <div className="footer_stats_row">
          <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
          <>
            <p className={team?.id == match?.away?.id ? "bold_text" : ""}>{match?.away?.alias} {getTeamPoints(match?.id, match?.away?.id) !== false? getTeamPoints(match?.id, match?.away?.id):0}  vs</p>
            <p className={team?.id == match?.home?.id ? "bold_text" : ""}> {match?.home?.alias} {getTeamPoints(match?.id, match?.home?.id) !== false ? getTeamPoints(match?.id, match?.home?.id):0}</p>
          </>
          {/* {team?.id == match?.away?.id && 
            <><p>{match?.home?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.home?.points:0} vs</p>
            <p className="bold_text"> {match?.away?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.away?.points:0}</p></>
          }
          {team?.id == match?.home?.id && 
            <><p>{match?.away?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.away?.points:0} vs</p>
            <p className="bold_text"> {match?.home?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.home?.points:0}</p></>
          } */}
        </div>
      )}
      {/* <div className="footer_stats_row">
        <img src={SoccerIcon} alt="Hockey Icon" width={12} height={12} />
        <p>{away?.alias} G: {OppGoalie}</p>
      </div> */}
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          P{getTeamPoints1(match?.id) !== false ? (getTeamPoints1(match?.id)?.period) : (live_period)} | {getTeamPoints1(match?.id) !== false ? getTeamPoints1(match?.id)?.eventData?.clock : live_clock}
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
