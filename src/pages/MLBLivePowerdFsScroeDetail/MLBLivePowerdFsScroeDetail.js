import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import moment from "moment";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header3 from "../../components/Header3";
import HeaderBgUri from "../../assets/baseball.jpg";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import Card from "../../components/PowerpickCard";
import SidebarBtnIcon from "../../assets/nhl-sidebar-icon.png";
import RankCard from "../../components/RankCard";
import SportsContestRules from "../../components/SportsContestRules";
import MLBFooterImage from "../../assets/NHL.png";
import NHLGear from "../../assets/nhl-gear.png";
import LiveStandings from "../../components/LiveStandings";
import XP2Icon from "../../icons/XP2";
import XP3Icon from "../../icons/XP3";
import XP1_5Icon from "../../icons/XP1_5";
import FooterImage from "../../assets/NHL-live-footer.png";
import { redirectTo } from "../../utility/shared";

const basicRules = [
  "No purchase necessary.",
  "Open to residents of United States who are over the age of majority.",
  "Contest closes at 11:59pm ET - April 22, 2020.",
];

const detailRules = [
  "Five (5) prizes to be won. See full rules for complete details of all prizes.",
  "One entry per person.",
  "Odds of winning depend on player knowledge.",
  "Mathematical skill testing question must be correctly answered to win.",
];

function NHLLivePowerdFsScroeDetail(props) {
  const [showModal, setModalState] = useState(false);
  const [logs, setLogs] = useState([]);
  let tableRef = useRef();

  const { gameLogs = [] } = useSelector((state) => state.mlb);

  //set score and running totals
  useEffect(() => {
    if (!gameLogs?.length) {
      return;
    }

    const _logs = [];
    for (let i = 0; i < gameLogs?.length; i++) {
      //total score
      const rbiData = getRBI(gameLogs[i]?.play?.runners);
      const rsData = getRS(
        gameLogs[i]?.play?.runners,
        gameLogs[i]?.play?.outcome_id
      );

      const rbi = rbiData.rbi || 0;
      const rbiPts = rbi === 1 ? 2 : 0;
      const rs = rsData?.rs || 0;
      const rsPts = rs === 1 ? 2 : 0;

      const isPitcher =
        gameLogs[i]?.play?.pitcher_id ===
        gameLogs[i]?.effected_player?.player_id;
      const isAbOver = gameLogs[i]?.play?.is_ab_over;

      const playPts = getPoints(
        gameLogs[i]?.play?.outcome_id,
        isPitcher,
        isAbOver
      );

      const totalScore = playPts + rbiPts + rsPts;
      gameLogs[i].totalScore = totalScore;
      gameLogs[i].rbi = rbi;
      gameLogs[i].rbiPts = rbiPts;
      gameLogs[i].rsPts = rsPts;
      gameLogs[i].rs = rs;
      gameLogs[i].playPts = playPts;
      _logs.push(gameLogs[i]);
    }

    //calculate running totals
    for (let i = 0; i < _logs?.length; i++) {
      if (i === 0) _logs[i].runningTotal = _logs[i]?.totalScore;

      if (
        i !== 0 &&
        _logs[i - 1] &&
        _logs[i - 1]?.totalScore &&
        i !== _logs?.length
      ) {
        console.log(
          _logs[i - 1]?.runningTotal + _logs[i]?.totalScore,
          _logs[i - 1]?.runningTotal,
          _logs[i]?.totalScore
        );
        _logs[i].runningTotal =
          _logs[i - 1]?.runningTotal + _logs[i]?.totalScore;
      }
      // else {
      //   _logs[i].runningTotal =
      //     _logs[i - 1]?.runningTotal + _logs[_logs?.length - 1]?.totalScore;
      // }
    }

    setLogs(_logs);
  }, [gameLogs]);

  useEffect(() => {
    tableRef?.current?.scrollIntoView();
  }, [tableRef]);

  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };

  const getPoints = (id, isPitcher = false, isAbOver = false) => {
    if (
      id === "aD" ||
      id === "aDAD3" ||
      id === "ADAD3" ||
      id === "aDAD4" ||
      id === "ADAD4" ||
      (id === "oDT3" && !isPitcher) ||
      (id === "oDT4" && !isPitcher)
    )
      return 5;

    if (id === "aHR") return 10;

    if (
      id === "oGO" ||
      id === "oFO" ||
      id === "aIBB" ||
      id === "aFCAD2" ||
      id === "aFCAD3" ||
      id === "aFCAD4" ||
      id === "aSBAD1" ||
      id === "aSBAD2" ||
      id === "aSBAD3" ||
      id === "aSBAD4" ||
      id === "aSFAD1" ||
      id === "aSFAD2" ||
      id === "aSFAD3" ||
      id === "aSFAD4" ||
      id === "bPO" ||
      id === "oDT3" ||
      id === "oDT4" ||
      id === "oFC" ||
      id === "oFC2" ||
      id === "oFC3" ||
      id === "oFC4" ||
      id === "oKLT1" ||
      id === "oKLT2" ||
      id === "oKLT3" ||
      id === "oKST1" ||
      id === "oKST2" ||
      id === "oKST3" ||
      id === "oLO" ||
      id === "oOP" ||
      id === "oPO" ||
      id === "oROET2" ||
      id === "oROET3" ||
      id === "oROET4" ||
      id === "oSB" ||
      id === "oSBT2" ||
      id === "oSBT3" ||
      id === "oSBT4" ||
      id === "oSF" ||
      id === "oSFT2" ||
      id === "oSFT3" ||
      id === "oSFT4" ||
      id === "oST2" ||
      id === "oST3" ||
      id === "oST4" ||
      id === "oTT4" ||
      id === "PO" ||
      id === "POCS2" ||
      id === "POCS3" ||
      id === "POCS4" ||
      id === "TO2" ||
      id === "TO3" ||
      id === "TO4" ||
      id === "FO1" ||
      id === "FO2" ||
      id === "FO3" ||
      id === "FO4" ||
      id === "CS2" ||
      id === "CS3" ||
      id === "CS4" ||
      id === "RI"
    )
      return 1;

    if (
      id === "aS" ||
      id === "aSAD2" ||
      id === "aSAD3" ||
      id === "aSAD4" ||
      id === "oST2" ||
      id === "oST3" ||
      id === "oST4"
    )
      return 3;

    if (id === "aSFAD4" || id === "aSBAD4" || id === "oKLT4" || id === "oKST4")
      return 2;

    if ((id === "kKL" || id === "kKS" || id === "kFT") && isAbOver) return 2;

    if (id === "aT" || id === "aTAD4" || id === "oTT4") return 8;

    return 0;
  };

  const getRBI = (runners = []) => {
    let rbi;
    for (let i = 0; i < runners?.length; i++) {
      if (
        runners[i]?.outcome_id === "ERN" ||
        runners[i]?.outcome_id === "URN" ||
        runners[i]?.outcome_id === "ERNu"
      ) {
        const [player] = gameLogs?.filter((p) => {
          return p?.effected_player?.player_id === runners[i]?.player_id;
        });

        if (player) {
          return { rbi: 1 };
        } else {
          console.log(player);
          return { rbi: 0 };
        }
      }
    }

    return {
      rbi,
    };
  };

  const getRS = (runners = [], id = "") => {
    let rs;
    for (let i = 0; i < runners?.length; i++) {
      if (id === "aHR") {
        const [player] = gameLogs?.filter((p) => {
          return p?.effected_player?.player_id === runners[i]?.player_id;
        });

        if (player) {
          return { rs: 1 };
        } else {
          console.log(player);
          return { rs: 0 };
        }
      }
    }

    return {
      rs,
    };
  };

  const RenderXP = (xp) => {
    switch (xp) {
      case "1.5":
      case "1_5":
        return <XP1_5Icon />;

      case 2:
      case "2":
        return <XP2Icon />;

      case 3:
      case "3":
        return <XP3Icon />;

      default:
        return "-";
    }
  };

  const Row = ({
    position,
    name,
    inning,
    plays,
    pts,
    totalPts,
    powers,
    score,
    runningTotal,
    rbi = {},
    runs = {},
    isHit = false,
    activePower = null,
    timeStamp = "",
  }) => (
    <div
      className={`${classes.card_row} ${classes.card_row_1} ${
        isHit ? classes.primary_bg : ""
      }`}
    >
      <span className={classes.child_1}>{position}</span>
      <span className={classes.child_2}>{name}</span>
      <span className={`${classes.child_3} ${classes.space}`}>{timeStamp}</span>
      <span className={classes.child_3}>{inning}</span>
      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{plays}</p>
        </span>
        <span>
          <p className={classes.secondary}> {pts}</p>
        </span>
      </div>

      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{runs?.rs}</p>
        </span>
        <span>
          <p className={classes.secondary}> {runs?.pts}</p>
        </span>
      </div>

      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{rbi?.rbi}</p>
        </span>
        <span>
          <p className={classes.secondary}> {rbi?.pts}</p>
        </span>
      </div>

      {/* <span className={`${classes.child_4} ${classes.center}`}><p className={classes.secondary}>{totalPts}</p></span> */}
      <span className={classes.center}>
        {activePower !== null && RenderXP(powers)}
      </span>
      <span className={classes.center}>
        <p className={score < 0 ? classes.danger : classes.success}>
          {score < 0 ? `Reversed ${score}` : score}
        </p>
      </span>
      <span className={classes.center}>
        <p className={`${classes.primary} ${classes.border}`}>{runningTotal}</p>
      </span>
    </div>
  );

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header3
          titleMain1="MLB 2021"
          titleMain2="PowerdFS"
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          subHeader1="Introducing Live-Play Fantasy Hockey"
          bgImageUri={HeaderBgUri}
          isLive
        />

        <div className={classes.container}>
          <div className={classes.container_left_side} ref={tableRef}>
            <div className={classes.container_header}>
              <NHLLiveSportsHeader
                buttonTitle="Full Standings"
                buttonIcon={
                  <img
                    src={SidebarBtnIcon}
                    width={19}
                    style={{ marginRight: "5px" }}
                  />
                }
                onPress={toggleLiveStandingModal}
                singleBtn
                teamManagerLink="/mlb-live-powerdfs"
                scoreDetailLink="/mlb-live-powerdfs/my-score-details"
                onGoBack={() => redirectTo(props, { path: "/my-game-center" })}
              />
              <div className={classes.card_rank}>
                <RankCard showButton={false} />
              </div>
            </div>
            <Card className={classes.card}>
              <div className={classes.card_header}>
                <div className={classes.card_row}>
                  <span className={classes.child_1}>Position</span>
                  <span className={classes.child_2}>Name</span>
                  <span className={`${classes.child_3} ${classes.space}`}>
                    Time Stamp
                  </span>
                  <span className={classes.child_3}>Inning</span>
                  <div className={classes.card_header_1}>
                    <p>Game Plays</p>
                    <div className={classes.card_combine_row}>
                      <span>Plays</span>
                      <span>Pts</span>
                    </div>
                  </div>
                  <div className={classes.card_header_1}>
                    <p>Runs</p>
                    <div className={classes.card_combine_row}>
                      <span>RS</span>
                      <span>Pts</span>
                    </div>
                  </div>
                  <div className={classes.card_header_1}>
                    <p>RBI</p>
                    <div className={classes.card_combine_row}>
                      <span>RBI</span>
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
                {logs && logs?.length ? (
                  logs?.map((row, ind) => {
                    const {
                      active_powerplay = null,
                      effected_player = {},
                      fantasy_points_occured = 0,
                      fantasy_points_occured_without_powerplay = 0,
                      fantasy_points_after = 0,
                      play = {},
                      totalScore = 0,
                      runningTotal = 0,
                      rbi = 0,
                      rbiPts = 0,
                      rs = 0,
                      rsPts = 0,
                      playPts = 0,
                    } = row || {};

                    const {
                      active = true,
                      bat_hand = "0",
                      current_position = "0",
                      current_team = 0,
                      datafeed_id = "",
                      height = "",
                      is_injured = false,
                      jersey_number = 0,
                      name = "",
                      player_id = 0,
                      primary_position = "",
                      throw_hand = "",
                      type = "",
                    } = effected_player || {};

                    const {
                      balls = 0,
                      created_at = "",
                      created_at_feed = "",
                      // datafeed_id = "8850001a-fc26-4a9c-8fa8-482ef6184200",
                      event_name = null,
                      half = "",
                      hitter_id = 0,
                      inning_number = 0,
                      inning_sequence = 0,
                      is_ab_over = false,
                      is_bunt = false,
                      is_double_play = false,
                      is_hit = false,
                      is_passed_ball = false,
                      is_triple_play = false,
                      is_wild_pitch = false,
                      match_id = 0,
                      outcome_id = "",
                      outs = 0,
                      pitch_count = 0,
                      pitch_speed = 0,
                      pitch_type = null,
                      pitch_zone = 0,
                      pitcher_id = 0,
                      play_id = 0,
                      status = "",
                      strikes = 0,
                      type: pType = "",
                      updated_at = "",
                      updated_at_feed = "",
                      runners = [],
                    } = play || {};

                    return (
                      <Row
                        position={type}
                        name={name}
                        inning={
                          `${half}`.toLocaleLowerCase() === "t"
                            ? `Top ${inning_number}`
                            : `Bot ${inning_number}`
                        }
                        plays={outcome_id}
                        pts={playPts}
                        totalPts="8"
                        powers="1.5"
                        score={totalScore}
                        runningTotal={runningTotal}
                        runs={{
                          rs: rs,
                          pts: rsPts,
                        }}
                        rbi={{
                          rbi: rbi,
                          pts: rbiPts,
                        }}
                        isHit={false}
                        activePower={active_powerplay}
                        timeStamp={moment(created_at).format("hh:mm A")}
                        key={ind?.toString()}
                      />
                    );
                  })
                ) : (
                  <>No Data</>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className={classes.footer_main}>
          <img src={FooterImage} className={classes.container_body_img} />
        </div>
      </div>
      <Footer isBlack={true} />

      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

NHLLivePowerdFsScroeDetail.propTypes = {};

export default NHLLivePowerdFsScroeDetail;
