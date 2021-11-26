import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Header3 from "../../../components/Header3";
import HeaderBgUri from "../../../assets/nhl-live.jpg";
import NHLLiveSportsHeader from "../../../components/NHLLiveSportsHeader";
import Card from "../../../components/PowerpickCard";
import SidebarBtnIcon from "../../../assets/nhl-sidebar-icon.png";
import RankCard from "../../../components/RankCard";
import SportsContestRules from "../../../components/SportsContestRules";
import MLBFooterImage from "../../../assets/NHL.png";
import NHLGear from "../../../assets/nhl-gear.png";
import LiveStandings from "../../../components/LiveStandings";
import { redirectTo } from "../../../utility/shared";
let tempCounter = 0;
export default function MyScoreCard() {
  const { live_all_team_logs } = useSelector((state) => state.nhl);
  useEffect(() => {
    tempCounter = 0;
  }, []);
  const Row = ({
    position,
    name,
    time,
    plays,
    pts,
    totalPts,
    powers,
    score,
    runningTotal,
  }) => (
    <div
      className={`${classes.card_row} ${classes.card_row_1} ${
        score < 0 ? classes.primary_bg : ""
      }`}
    >
      <span className={classes.child_1}>{position}</span>
      <span className={classes.child_2}>{name}</span>
      <span className={classes.child_3}>{time}</span>
      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{plays}</p>
        </span>
        <span>
          <p className={classes.secondary}> {pts}</p>
        </span>
      </div>
      {/* <span className={`${classes.child_4} ${classes.center}`}><p className={classes.secondary}>{totalPts}</p></span> */}
      <span className={classes.center}>{powers}</span>
      <span className={classes.center}>
        <p className={score < 0 ? classes.danger : classes.success}>
          {score < 0 ? `${score}` : score}
        </p>
      </span>
      <span className={classes.center}>
        <p className={`${classes.primary} ${classes.border}`}>{runningTotal}</p>
      </span>
    </div>
  );

  // const CalculateRow = ({ period, clock, fantasyScores }) => {
  //   return (
  //     <>
  //       {fantasyScores.map((item) => (
  //         <Row
  //           position="P1"
  //           name={item?.player?.full_name}
  //           time={`P${period + 1} | ${clock}`}
  //           plays={item.type === "shotagainst" ? "SA" : item.type[0]}
  //           pts={item?.playerPts}
  //           totalPts="8"
  //           powers="-"
  //           score={16}
  //           runningTotal="16"
  //         />
  //       ))}
  //     </>
  //   );
  // };

  return (
    <>
      <div className={classes.card_header}>
        <div className={classes.card_row}>
          <span className={classes.child_1}>Position</span>
          <span className={classes.child_2}>Name</span>
          <span className={classes.child_3}>Time</span>
          <div className={classes.card_header_1}>
            <p>Scoring Plays</p>
            <div className={classes.card_combine_row}>
              <span>Plays</span>
              <span>Pts</span>
            </div>
          </div>
          {/* <span className={classes.child_4}>Total Pts</span> */}
          <span className={classes.center}>Powers</span>
          <span className={classes.center}>My Score</span>
          <span className={classes.center}>Running Total</span>
        </div>
      </div>

      <div className={classes.card_body}>
        {live_all_team_logs.map((item1, index) => {
          let { teamLogs = [] } = item1;
          
          return (
            <>
              {teamLogs.map((item, index1) => { 
                if(index == 0 && index1 == 0) {
                  tempCounter = 0;
                }
                else {
                  tempCounter = item?.fantasyLog?.playerPts;
                }
                let poss = "P1";
                if(item?.fantasyLog?.fantasyPlayerPosition)
                {
                  if(item?.fantasyLog?.fantasyPlayerPosition === "XW" || item?.fantasyLog?.fantasyPlayerPosition === " D") {
                    poss = item?.fantasyLog?.fantasyPlayerPosition + item?.fantasyLog?.positionID;
                  }
                  else {
                    poss = item?.fantasyLog?.fantasyPlayerPosition;
                  }
                }
                return (
                <Row
                  position={poss}
                  name={item?.fantasyLog?.player?.full_name}
                  time={`P${item?.period + 1} | ${item?.clock}`}
                  plays={
                    item?.fantasyLog?.type === "shotagainst"
                      ? "SA"
                      : item?.fantasyLog?.type === "goalagainst"
                      ? "GA"
                      : item?.fantasyLog?.type[0]
                  }
                  pts={item?.fantasyLog?.playerPts}
                  totalPts="8"
                  powers="-"
                  score={item?.fantasyLog?.playerPts}
                  runningTotal={item?.fantasyLog?.playerPts + tempCounter}
                />
              )})}
            </>
          );
        })}
      </div>
    </>
  );
}
