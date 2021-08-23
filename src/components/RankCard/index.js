import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import *  as MLBActions from "../../actions/MLBActions";
import classes from "./index.module.scss";

import SidebarBtnIcon from "../../assets/nhl-sidebar-icon.png";
import RankIcon from "../../icons/Ranks/RankIcon";
import { redirectTo, setNumberComma } from "../../utility/shared";
import { useDispatch } from "react-redux";
import LiveStandings from "../LiveStandings";

function RankCard(props) {
  const [showModal, setModalState] = useState(false);
  const [liveStandingData, setLiveStandingData] = useState([]);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [leader, setLeader] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);
  const dispatch = useDispatch();
  const { showButton = true, ranks = {}, onClickStandings = () => {} } =
    props || {};
  console.log("ranks", ranks);
  const { ranking = 0, score = 0, game_id = 0, team_id = 0 } = ranks || {};
  console.log("game_id", game_id);
  React.useEffect(async () => {
    let liveStandingsData = await dispatch(MLBActions.getLiveStandings(game_id));
      if(typeof liveStandingsData !== "undefined")
      {
        if(liveStandingsData.payload.error == false)
        {
          if(
            JSON.stringify(liveStandingsData.payload.data) !== JSON.stringify(liveStandingData)
          ) {
            var finalArr = [];
            var res = liveStandingsData.payload.data.powerDFSRanking;
            var user_id = parseInt(localStorage.PERSONA_USER_ID);
            var userRec = "";
            var leaderScore = 0;
            for(var i = 0; i < res.length; i++)
            {
              if(res[i].ranking == 1)
              {
                setLeader(res[i].score);
              }
              if(res[i].team.user.user_id == user_id)
              {
                userRec = res[i];
                setCurrentRank(userRec.ranking);
                setCurrentWinnings(userRec?.winnings?.amount);
              }
              else {
                finalArr.push(res[i]);
              }
            }
            if(userRec !== "")
            {
              finalArr.unshift(userRec);
            }
            if(JSON.stringify(liveStandingData) !== JSON.stringify(finalArr))
              setLiveStandingData(finalArr);
          }
          //setModalState(!showModal);
        }
        else {
          // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
        }
      }
  });

  const toggleLiveStandingModal = async () => {
    onClickStandings();
    if(!showModal)
    {
      setModalState(!showModal);
    }
    
  };

  const closeModal = () => {
    setModalState(false);
  }

  return (
    <div className={classes.sidebar_header}>
      <div className={classes.header_rank}>
        <p>
          <div className={classes.live_dot} /> Live Rank
          <div className={classes.separater} />
          <strong>{currentRank}</strong>
        </p>
      </div>

      <div className={classes.sidebar_header_content}>
        <div>
          <div className={classes.sidebar_header_left}>
            <div className={classes.sidebar_header_1}>
              <p>Currently Winning:</p>
              <p className={`${classes.sidebar_header_p2} ${classes.sidebar_header_p2_1}`}>
                ${setNumberComma(currentWinnings?currentWinnings:0)}
              </p>
            </div>
            <div className={classes.sidebar_header_1}>
              <p className={classes.sidebar_header_p1}>Leader's Score:</p>
              <p className={`${classes.sidebar_header_p1} ${classes.sidebar_header_p1_1}`} style={{fontSize: 24, fontFamily: 'Teko'}}> {leader} </p>
            </div>
            {/* {props?.currentWin && (
              <div className={classes.sidebar_header_1}>
                <p>Currently Winning:</p>
                <p
                  className={`${classes.sidebar_header_p2} ${classes.sidebar_header_p2_1}`}
                >
                  ${setNumberComma(props?.currentWin)}
                </p>
              </div>
            )} */}
            {/* <div className={classes.sidebar_header_2}>
              <div className={classes.sidebar_left}>
                <div>
                  <p>My Score:</p>
                  <p className={classes.sidebar_header_p2}>{score}</p>
                </div>
                <div>
                  <p className={classes.sidebar_header_p1}>Leader:</p>
                  <p
                    className={`${classes.sidebar_header_p1} ${classes.sidebar_header_p1_1}`}
                  >
                    66
                  </p>
                </div>
              </div>
               <RankIcon rank={ranking} /> 
            </div> */}
          </div>
        </div>
      </div>

      {showButton && (
        <button onClick={toggleLiveStandingModal}>
          <img
            src={SidebarBtnIcon}
            width={19}
            style={{ marginRight: "10px" }}
          />{" "}
          See Full Standings
        </button>
      )}

      <LiveStandings visible={showModal} onClose={closeModal} liveStandingData={liveStandingData} prizePool={props.prizePool}/>
    </div>
  );
}

RankCard.propTypes = {
  showButton: PropTypes.bool,
  currentWin: PropTypes.number,
  ranks: PropTypes.number,
};

export default RankCard;
