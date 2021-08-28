import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as MLBActions from "../../actions/MLBActions";
import _ from "underscore";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

import { redirectTo } from "../../utility/shared";
import { socket } from "../../config/server_connection";
import { CONSTANTS } from "../../utility/constants";
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
import Replace from "../../icons/Replace";

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
  const [liveStandingData, setLiveStandingData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [powers, setPowerss] = useState([]);
  const [pointss, setPointss] = useState([]);
  const dispatch = useDispatch();
  const {
    ON_ROOM_SUB,
    ON_ROOM_UN_SUB,
    EMIT_ROOM,
    ON_POWER_APPLIED,
    ON_GLOBAL_RANKING_REQUEST,
    ON_FANTASY_LOGS_REQUEST,
    GET_GLOBAL_RANKING,
    MATCH_UPDATE,
    GLOBAL_RANKING,
    FANTASY_TEAM_UPDATE,
  } = CONSTANTS.SOCKET_EVENTS.MLB.LIVE;

  const history = useHistory();

  let tableRef = useRef();
  let _socket = null;
  const { gameLogs = [], selectedTeam = {} } = useSelector(
    (state) => state.mlb
  );
  const { game = {} } = useSelector((state) => selectedTeam);
  const { game_id = 0, PointsSystems = [], Powers = [] } = useSelector(
    (state) => game
  );
  let prizePool = 0;
  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  useEffect(() => {
    setPointss(_.groupBy(PointsSystems, "type"));
    setPowerss(Powers);
  }, [game]);
  useEffect(() => {
    if (isEmpty(selectedTeam)) {
      return redirectTo(props, { path: "/my-game-center" });
    }
    _socket = socket();
    return function cleanUP() {
      //disconnect the socket
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
  }, []);

  React.useEffect(async () => {
    let liveStandingsData = await dispatch(
      MLBActions.getLiveStandings(game_id)
    );
    if (typeof liveStandingsData !== "undefined") {
      if (liveStandingsData.payload.error == false) {
        if (
          JSON.stringify(liveStandingsData.payload.data) !==
          JSON.stringify(liveStandingData)
        ) {
          var finalArr = [];
          var res = liveStandingsData.payload.data.powerDFSRanking;
          var user_id = parseInt(localStorage.PERSONA_USER_ID);
          var userRec = "";
          var leaderScore = 0;
          for (var i = 0; i < res.length; i++) {
            if (res[i].team.user.user_id == user_id) {
              userRec = res[i];
            } else {
              finalArr.push(res[i]);
            }
          }
          if (userRec !== "") {
            finalArr.unshift(userRec);
          }
          if (JSON.stringify(liveStandingData) !== JSON.stringify(finalArr))
            setLiveStandingData(finalArr);
        }
        //setModalState(!showModal);
      } else {
        // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
      }
    }
  });

  useEffect(() => {
    if (_socket) {
      onSocketEmit(game_id, localStorage.PERSONA_USER_ID);
      onSocketListen();
    }
  }, [_socket]);

  //All Emit Events
  const onSocketEmit = (gameId, userId) => {
    _socket.emit(ON_ROOM_SUB, {
      gameId: gameId,
      userId: userId,
    });

    //ON_GLOBAL_RANKING_REQUEST
    _socket.emit(ON_GLOBAL_RANKING_REQUEST, {
      gameId: gameId,
    });

    //ON_FANTASY_LOGS_REQUEST
    _socket.emit(ON_FANTASY_LOGS_REQUEST, {
      fantasyTeamId: 172,
    });

    //GET_GLOBAL_RANKING -> Standings
    _socket.emit(GET_GLOBAL_RANKING, {
      gameId: gameId,
      upperLimit: 0,
      lowerLimit: 10,
    });
  };

  //All listen events
  const onSocketListen = () => {
    //fetch data first time
    _socket?.on(EMIT_ROOM, (res) => {
      const {
        game_id = "",
        score = 0,
        sport_id = "",
        status = null,
        team_id = "",
        defense = [],
        players = [],
        power_dfs_team_rankings = [],
        game_logs = [],
      } = res?.data || {};
      const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
    });
  };

  //set score and running totals
  useEffect(() => {
    if (!gameLogs?.length) {
      return;
    }

    const _logs = [];
    for (let i = 0; i < gameLogs?.length; i++) {
      const isPitcher =
        gameLogs[i]?.play?.pitcher_id ===
        gameLogs[i]?.effected_player?.player_id;
      const isAbOver = gameLogs[i]?.play?.is_ab_over;
      const id = gameLogs[i]?.play?.outcome_id;

      if (id === "kKL" && !isAbOver) {
        continue;
      }

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

      const playPts = getPoints(id, isPitcher, isAbOver);

      const totalScore = playPts + rbiPts + rsPts;
      gameLogs[i].totalScore = totalScore;
      gameLogs[i].runningTotal = 0;
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

      if (i !== 0 && _logs[i - 1] && _logs[i - 1]?.totalScore) {
        _logs[i].runningTotal =
          _logs[i - 1]?.runningTotal + _logs[i]?.totalScore;
      }
    }

    // //re-order on time basis
    // const sortedGameLogs = _logs.sort((a, b) =>
    //   a?.play === null && b?.play === null
    //     ? new Date(a?.created_at).getTime() - new Date(b?.created_at).getTime()
    //     : new Date(a?.play?.created_at).getTime() -
    //       new Date(b?.play?.created_at).getTime()
    // );

    setLogs(_logs);
  }, [gameLogs]);

  useEffect(() => {
    if (history.location.pathname === "/mlb-live-powerdfs/my-score-details")
      tableRef?.current?.scrollIntoView();
  }, [tableRef]);

  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const getPoints = (id, isPitcher = false) => {
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

    if (id === "aT" || id === "aTAD4" || id === "oTT4") return 8;

    return 0;
  };

  const getRBI = (runners = []) => {
    let rbi;
    for (let i = 0; i < runners?.length; i++) {
      if (
        runners[i]?.outcome_id === "ERN" ||
        runners[i]?.outcome_id === "URN" ||
        runners[i]?.outcome_id === "ERNu" ||
        runners[i]?.outcome_id === "aHR"
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
          return { rs: 2 };
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
    hasPlay = false,
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
      {hasPlay ? (
        <>
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
        </>
      ) : (
        <div className={classes.no_play}>
          <p>Player Swapped</p>
        </div>
      )}

      {/* <span className={`${classes.child_4} ${classes.center}`}><p className={classes.secondary}>{totalPts}</p></span> */}
      <span className={classes.center}>
        {hasPlay && activePower !== null && RenderXP(powers)}
        {!hasPlay && <Replace size={40} />}
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
          points={pointss}
          powers={powers}
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
                liveStandingData={liveStandingData}
              />
              <div className={classes.card_rank}>
                <RankCard showButton={false} ranks={ranks} game_id={game_id} />
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
                      created_at: createdAt = "",
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

                    if (
                      outcome_id === "KKL" ||
                      outcome_id === "kKL" ||
                      outcome_id === "KKS" ||
                      outcome_id === "kKS"
                    ) {
                      return <></>;
                    }

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
                        timeStamp={moment(created_at || createdAt).format(
                          "hh:mm A"
                        )}
                        hasPlay={play !== null}
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

      <LiveStandings
        visible={showModal}
        onClose={toggleLiveStandingModal}
        liveStandingData={liveStandingData}
        prizePool={prizePool}
      />
    </>
  );
}

NHLLivePowerdFsScroeDetail.propTypes = {};

export default NHLLivePowerdFsScroeDetail;
