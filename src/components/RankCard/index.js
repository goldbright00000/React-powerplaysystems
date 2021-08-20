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
  const dispatch = useDispatch();
  const { showButton = true, ranks = {}, onClickStandings = () => {} } =
    props || {};

  const { ranking = 0, score = 0, game_id = 0, team_id = 0 } = ranks || {};

  const toggleLiveStandingModal = async () => {
    onClickStandings();
    if(!showModal)
    {
      let liveStandingsData = await dispatch(MLBActions.getLiveStandings(props?.game_id));
      console.log("liveStandingsData", liveStandingsData);
      if(typeof liveStandingsData !== "undefined")
      {
        if(liveStandingsData.payload.error == false)
        {
          if(
            JSON.stringify(liveStandingsData.payload.data) !== JSON.stringify(liveStandingData)
          ) {
            setLiveStandingData(liveStandingsData.payload.data);
          }
          setModalState(!showModal);
        }
        else {
          alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
        }
      }
      else {
        alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
      }
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
          <strong>23</strong>
        </p>
      </div>

      <div className={classes.sidebar_header_content}>
        <div>
          <div className={classes.sidebar_header_left}>
            <div className={classes.sidebar_header_1}>
              <p>Currently Winning:</p>
              <p className={`${classes.sidebar_header_p2} ${classes.sidebar_header_p2_1}`}>
                ${setNumberComma(props?.currentWin)}
              </p>
            </div>
            <div className={classes.sidebar_header_1}>
              <p className={classes.sidebar_header_p1}>Leader's Score:</p>
              <p className={`${classes.sidebar_header_p1} ${classes.sidebar_header_p1_1}`} style={{fontSize: 24, fontFamily: 'Teko'}}> 66 </p>
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
