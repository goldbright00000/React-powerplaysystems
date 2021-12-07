import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import classes from "./index.module.scss";
import * as NHLActions from "../../actions/NHLActions";
import _ from "underscore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/hockey1.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import PowerSidebar from "../../components/PowerCollapesible";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import { getLocalStorage, printLog, redirectTo } from "../../utility/shared";
import { socket, socketNHL } from "../../config/server_connection";
import Mobile from "../../pages/Mobile/Mobile";
import PrizeModal from "../../components/PrizeModal";
import LiveStandings from "../../components/LiveStandings";
import MyScoreCard from "./MyScoreCard";
import TeamManager from "./TeamManager";

const { CENTER, XW, D, G, TD } = CONSTANTS.FILTERS.NHL;
const {
  NHL_CONNECT_MATCH_ROOM,
  NHL_GET_MATCH_ROOM_UPDATES,
  ALL_UPDATES,
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
} = CONSTANTS.SOCKET_EVENTS.NHL.LIVE;

let _socket = null;
let isMatchUpdate = false;

const POWER_IDs = {
  SWAP_POWER: 4,
  D_WALL: 5,
  CHALLENGE: 6,
  RETRO_BOOST: 10,
  POINT_BOOSTER_1_5X: 11,
  POINT_BOOSTER_2X: 12,
  POINT_BOOSTER_3X: 13,
};

function NHLPowerdFsLive(props) {
  const [loading, setLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);
  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [matchUpdateData, setMatchUpdateData] = useState({});
  const [points, setPoints] = useState(0);
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [playerToSwap, setPlayerToSwap] = useState({});
  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const [pointBooster15x, setPointBooster15xCounts] = useState(0);
  const [pointBooster2x, setPointBooster2xCounts] = useState(0);
  const [pointBooster3x, setPointBooster3xCounts] = useState(0);
  const [retroBoostCounts, setRetroBoostCounts] = useState(0);
  const [powerUpCounts, setPowerUpCounts] = useState(0);
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const dispatch = useDispatch();
  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );
    return decSelectedTeamData;
  }
  function getGameIDFromLocalStorage() {
    const gameID = getLocalStorage(
      CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME_ID
    );
    if (gameID) {
      dispatch({
        type: NHLActions.NHL_UPDATE_STATE,
        payload: { gameID: parseInt(gameID) },
      });
      return parseInt(gameID);
    }
    return gameID;
  }
  const selectedTeam = getTeamFromLocalStorage();
  const {gameID: gid = 0} = selectedTeam;
  const {
    live_players = [],
    live_totalTeamPts = 0,
    live_all_team_logs = [],
    live_team_logs = {},
    live_score_details = [],
    live_teamD = {},
    live_eventData = [],
    live_home = {},
    live_away = {},
    period = 0,
    powersApplied = [],
    swappedPlayers= []
  } = useSelector((state) => state.nhl);
  
  const { user = {} } = useSelector((state) => state.auth);
  const { token = "", user_id: userID } = user || {};
  const getFantasyTeam = async () => {
    setLoading(true);
    let payload = {
      gameID: gid,
      userID: userID,
    };
    await dispatch(NHLActions.getFantasyTeam(payload));
    setLoading(false);
  };
  useEffect(() => {
    if (userID && gid) {
      getFantasyTeam();
    }
  }, [userID, gid]);
  useEffect(() => {
    getGameIDFromLocalStorage();
    _socket = socketNHL();
    return function cleanUP() {
      //reset logs
      dispatch(NHLActions.setGameLogs([]));
      //disconnect the socket
      _socket?.disconnect();
      // dispatch({
      //   type: NHLActions.NHL_RESET,
      //   payload: []
      // });
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
  }, []);
  const {
    challenge_amount= 0,
    entryFees = 0,
    gameType = "",
    playersActualScore = [],
    pointSystem = {},
    posCenterPoints = 0,
    posD1Points = 0,
    posD2Points = 0,
    posGoaliePts= 25,
    posXW1Points= 0,
    posXW2Points= 6,
    posXW3Points= 23,
    powersAvailable = [],
    reward = [],
    teamDPts = 0,
    status = "",
    currencys = "$",
  } = selectedTeam;
  let prizePool,
    topPrize = 0,
    entry_fee = 0,
    currency;
  prizePool = _.reduce(
    reward,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  topPrize = parseFloat(
    _.max(reward, function (ele) {
      return ele.amount;
    }).amount
  );
  entry_fee = entryFees;
  currency = currencys;
  let evaluateTeamLogs = () => {
    console.log("live_team_logs: ", live_team_logs);

    dispatch({
      type: NHLActions.NHL_UPDATE_STATE,
      payload: {
        live_all_team_logs: [...live_all_team_logs, live_team_logs],
      },
    });

    let {
      posD1Points = 0,
      posD2Points = 0,
      posXW1Points = 0,
      posXW2Points = 0,
      posXW3Points = 0,
      posCenterPoints = 0,
      posGoaliePts = 0,
      teamDPts = 0,
      teamLogs = [],
      playersActualScore = [],
    } = live_team_logs;
    // Players
    let lp = [...live_players];
    playersActualScore.forEach((player) => {
      lp.forEach((playr) => {
        if (playr.id === player.playerID) {
          playr.stats = player;
        }
      });
    });

    teamLogs.forEach((item) => {
      let { fantasyLog, period, clock, totalTeamPts } = item;
      let {
        type,
        player,
        playerPts,
        goal,
        saved,
        assists,
        myscore_description,
        strength,
        homeTeamD,
        awayTeamD,
      } = fantasyLog || {};

      lp.forEach((playr) => {
        if (playr.id === player.id) {
          if (!Array.isArray(playr.events)) {
            playr.events = [];
          }
          playr.events.push(fantasyLog);
        }
      });

      dispatch({
        type: NHLActions.NHL_UPDATE_STATE,
        payload: {
          live_period: period,
          live_clock: clock,
          live_strength: strength,
        },
      });
    });

    dispatch({
      type: NHLActions.NHL_UPDATE_STATE,
      payload: {
        live_players: lp,
        posD1Points,
        posD2Points,
        posXW1Points,
        posXW2Points,
        posXW3Points,
        posCenterPoints,
        posGoaliePts,
        teamDPts,
        live_totalTeamPts:
          posD1Points +
          posD2Points +
          posXW1Points +
          posXW2Points +
          posXW3Points +
          posCenterPoints +
          posGoaliePts +
          teamDPts,
      },
    });
  };

  let evaluateEventData = () => {
    live_eventData.forEach((item) => {
      let { eventData } = item || {};
      let { on_ice } = eventData || {};
      if (on_ice) {
        let team1 = on_ice[0]?.team || {};
        let team2 = on_ice[1]?.team || {};

        // Players
        let lp = [...live_players];

        lp.forEach((live_playr) => {
          let { match } = live_playr;
          let { home } = match || {};
          if (home.id !== team1.id && home.id === team2.id) {
            team1?.players?.map((i) => {
              if (i.primary_position === "G") {
                live_playr.OppGoalie = i.full_name;
              }
            });

            team2.players.map((i) => {
              if (i.id === live_playr) {
                if (live_playr.stats.status) {
                  live_playr.stats.status = "on-ice";
                } else {
                  if (!live_playr.stats) {
                    live_playr.stats = {};
                  }
                  lp.stats.status = "on-ice";
                }
              }
            });
          } else if (home.id === team1.id && home.id !== team2.id) {
            team2?.players?.map((i) => {
              if (i.primary_position === "G") {
                live_playr.OppGoalie = i.full_name;
              }
            });

            team1.players.map((i) => {
              if (i.id === live_playr) {
                if (live_playr.stats.status) {
                  live_playr.stats.status = "on-ice";
                } else {
                  if (!live_playr.stats) {
                    live_playr.stats = {};
                  }
                  live_playr.stats.status = "on-ice";
                }
              }
            });
          }

          if (live_playr?.stats?.status === "inprogress") {
            live_playr = "on-bench";
          }
        });

        dispatch({
          type: NHLActions.NHL_UPDATE_STATE,
          payload: {
            live_players: lp,
          },
        });
      }
    });
  };
  useEffect(() => {
    evaluateTeamLogs();
  }, [live_team_logs]);
  useEffect(() => {
    evaluateEventData();
  }, [live_eventData]);
  async function setPowers() {
    let a = powersAvailable;
    if (a === undefined) {
      return;
    }

    let remainingPowers = a;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i];
      if (rec !== undefined && rec !== null) {
        if (rec.powerName === "D-Wall") {
          dwall = remainingPowers[i].amount;
        } else if (rec.powerName === "Challenge") {
          challenge = remainingPowers[i].amount;
        } else if (rec.powerName === "1.5x Point Booster") {
          p15 = remainingPowers[i].amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].amount);
        } else if (rec.powerName === "2x Point Booster") {
          p2 = remainingPowers[i].amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].amount);
        } else if (rec.powerName === "3x Point Booster") {
          p3 = remainingPowers[i].amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].amount);
        } else if (rec.powerName === "Swap" || rec.powerName === "Swap Players") {
          swap = remainingPowers[i].amount;
        } else if (rec.powerName === "Retro Boost") {
          retro_boost = remainingPowers[i].amount;
        } else if (rec.powerName === "Power-Up") {
          power_up = remainingPowers[i].amount;
        }
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(swap);
    setDwallCounts(dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  }

  async function useSwap(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gid, userID, 4)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 4,
          userId: userID,
          gameId: gid,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useDwall(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gid, userID, 5)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 5,
          userId: userID,
          gameId: gid,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useChallenge(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gid, userID, 6)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 6,
          userId: userID,
          gameId: gid,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  useEffect(async () => {
    setPowers();
  }, []);

  useEffect(() => {
    if (gid !== 0) {
      _socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });

      _socket.on("connected", (data) => {
        console.log("Socket Connected: ", data);
        _socket.emit("NHL_CONNECT_MATCH_ROOM", {
          gameID: gid,
        });
        _socket.emit("EMIT_MATCH_EVENTS",{gameID: gid});
      });

      _socket.on("NHL_CONNECT_MATCH_ROOM", (data) => {
        console.log("NHL_CONNECT_MATCH_ROOM", data);
      });

      _socket.on("ROOM_CONNECTED", (data) => {
        console.log("ON ROOM CONNECTED: ", data);
        if (data !== "room connection successful") {
          dispatch({
            type: NHLActions.NHL_UPDATE_STATE,
            payload: {
              live_score_details: data,
            },
          });
        }
      });

      _socket.on("EMIT_MATCH_EVENTS", (data) => {
        console.log("Match Events", data);
        dispatch(NHLActions.add_live_events(data));
      });

      _socket.on("NHL_MATCH_EVENT", (data) => {
        console.log("New event: ", data);
      });
      _socket.on(`NHL-GAME-${gid}-${userID}`, (data) => {
        console.log("NHL-GAME Room", data);
        // evaluateTeamLogs(data);
        // if (Array.isArray(data)) {
        dispatch({
          type: NHLActions.NHL_UPDATE_STATE,
          payload: {
            live_team_logs: data,
          },
        });
        // }
      });

      _socket.on("ROOM_DATA", (data) => {
        console.log("ROOM DATA: ", data);
      });

      _socket.on("EMIT_MATCH_STATUS", (data) => {
        console.log("NHL_MATCH_STATUS", data);
        dispatch(NHLActions.add_match_status(data));
      })
    }
  }, [_socket, gid]);

  // useEffect(() => {
  //   setPlayerToSwap({});
  // }, [_socket]);

  const setMatchUpdates = () => {
    const { match_id } = matchUpdateData?.data || {};
    const dataToUpdate = live_players?.filter(
      (match) => match?.match_id === match_id
    );

    if (dataToUpdate.length) {
      for (let i = 0; i < dataToUpdate.length; i++) {
        const { match = {} } = dataToUpdate[i] || {};
        const updateMatch = {
          ...match,
          boxscore: [{ ...match?.boxscore[0], ...matchUpdateData?.data }],
        };

        delete dataToUpdate[i].match;
        dataToUpdate[i].match = updateMatch;
      }

      const liveData = union(live_players, dataToUpdate);

      dispatch(NHLActions.nhlLiveData(liveData));
    }
  };

  const onFantasyTeamUpdate = (res) => {
    const { log = {}, updated_player = {} } = res?.data || {};

    const { fantasy_points_after = 0 } = log || {};
    setPoints(fantasy_points_after);
    if (!live_players?.length) return;

    const liveData = [...live_players];
    if (!isEmpty(playerToSwap)) {
      const updatedPlayerIndex = liveData?.indexOf(playerToSwap);
      if (updatedPlayerIndex !== -1) {
        liveData[updatedPlayerIndex] = updated_player;
      }

      dispatch(NHLActions.nhlLiveData(liveData));
    }
  };

  const onFantasyScoreUpdate = (fantasyScores) => {
    fantasyScores.forEach((item) => {
      console.log(item);
    });
  };

  const onEventDataUpdate = (res) => {
    const { eventData, away, home } = res?.data || {};
    const { on_ice } = eventData || {};

    const team1 = on_ice[0];
    const team2 = on_ice[1];

    let awayTeam = {},
      homeTeam = {};

    if (team1 && team2 && away && home) {
      if (team1.id === away.id) {
        awayTeam = team1;
        homeTeam = team2;
      } else if (team2.id === away.id) {
        awayTeam = team2;
        homeTeam = team1;
      }
    }
  };

  const onChangeXp = async (xp, player) => {
    const _selectedXp = {
      xp,
    };
    const current_match_id = selectedTeam.players[0].match_id;
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";
    let indexOfPlayer = -1;
    indexOfPlayer = live_players?.indexOf(player);
    if (indexOfPlayer !== -1) {
      player.xp = _selectedXp;

      live_players[indexOfPlayer] = player;
      let power = 0;
      if (_selectedXp.xpVal === "1.5x") {
        power = 1;
      } else if (_selectedXp.xpVal === "2x") {
        power = 2;
      } else if (_selectedXp.xpVal === "3x") {
        power = 3;
      }
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gid, userID, power)
      );
      // throw new Error("FOUND");
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          powerId: power,
          multiplier: _selectedXp.xpVal,
          playerId: player.player_id,
          matchId: current_match_id,
          userId: userID,
          gameId: gid,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
      return dispatch(NHLActions.nhlLiveData(live_players));
    }
  };

  const onPowerApplied = (data) => {
    _socket.emit(ON_POWER_APPLIED, data);
  };

  const onClickStandings = async () => {
    await dispatch(NHLActions.getFinalStandings(gid));
  };

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    console.log("selectedTeam", selectedTeam);
    const { team_id, user_id, game_id } = selectedTeam || {};
    setPlayerToSwap(currentPlayer);
    onPowerApplied({
      fantasyTeamId: team_id,
      matchId: currentPlayer.match_id,
      playerId: currentPlayer.player_id,
      playerId2: newPlayer.playerId,
      matchIdP2: newPlayer.match_id,
      powerId: POWER_IDs.SWAP_POWER,
      userId: userID,
      gameId: gid,
    });
  };
  const setView = (viewType = CONSTANTS.NHL_VIEW.FV) => {
    switch (viewType) {
      case CONSTANTS.NHL_VIEW.FV:
        setCompressedView(false);
        break;

      case CONSTANTS.NHL_VIEW.C:
        setCompressedView(true);
        break;

      case CONSTANTS.NHL_VIEW.S:
        break;
    }
    setSelectedView(viewType);
  };

  const RenderLiveState = ({ isLive = false }) =>
    isLive ? (
      <p className={classes.currentState}>
        <span className={classes.orb} /> Live Game In Progress
      </p>
    ) : (
      <p className={`${classes.currentState} ${classes.column}`}>
        5d 4h 15min
        <span className={classes.span_text}>Live Game Stars in</span>
      </p>
    );
    window.onresize = () => {
      setScreenSize(window.screen.width);
    };
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = () => {
    setActiveTab(activeTab === 0 ? 1 : 0);
  };
  const [showModal, setModalState] = useState(false);
  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };
  const [matchEvents, setMatchEvents] = useState([]);
  return (
    <>
      {screenSize > 550 ? (
        <>
          <Header />
          <div className="teamManagerDiv">
            <div className={classes.wrapper}>
              <Header4
                // outof={outOf}
                // enrolledUsers={enrolledUsers}
                outof={1000}
                enrolledUsers={10}
                titleMain1="NHL"
                titleMain2="PowerdFS"
                subHeader1="Introducing Live-Play Fantasy Baseball"
                subHeader2={
                  <>
                    Use your <span>Powers</span> during the live game to drive
                    your team up the standings
                  </>
                }
                contestBtnTitle="Gameplay Rules"
                prizeBtnTitle="Prize Grid"
                bgImageUri={BaseballImage}
                compressedView
                currentState={<RenderLiveState isLive />}
                onClickPrize={() => setPrizeModalState(true)}
                selectedTeam={selectedTeam}
                token={token}
                livePage={true}
              />

              <div className={classes.container}>
                <div className={classes.container_left_side}>
                  <NHLLiveSportsHeader
                    btnTitle1="Full View"
                    btnTitle2="Compressed"
                    btnTitle3="Single"
                    selectedView={selectedView}
                    onFullView={() => setView(CONSTANTS.NHL_VIEW.FV)}
                    onCompressedView={() => setView(CONSTANTS.NHL_VIEW.C)}
                    onSingleView={() => setView(CONSTANTS.NHL_VIEW.S)}
                    activeTab={activeTab}
                    handleChangeTab={handleChangeTab}
                    // teamManagerLink="/nhl-live-powerdfs"
                    // scoreDetailLink="/nhl-live-powerdfs/my-score-details"
                    onGoBack={() => {
                      redirectTo(props, { path: "/my-game-center" });
                    }}
                    state={selectedTeam}
                    {...props}
                  />

                  <Card ranks={{ score: live_totalTeamPts }}>
                    {activeTab === 0 ? (
                      <TeamManager
                        compressedView={compressedView}
                        selectedView={selectedView}
                        loading={loading}
                        swapCounts={swapCounts}
                        dwallCounts={dwallCounts}
                        challengeCounts={challengeCounts}
                        pointMultiplierCounts={pointMultiplierCounts}
                        pointBooster15x={pointBooster15x}
                        pointBooster2x={pointBooster2x}
                        pointBooster3x={pointBooster3x}
                        retroBoostCounts={retroBoostCounts}
                        powerUpCounts={powerUpCounts}
                        setPlayerToSwap={setPlayerToSwap}
                        onPowerApplied={onPowerApplied}
                        POWER_IDs={POWER_IDs}
                        setPowers={setPowers}
                        useChallenge={useChallenge}
                        useDwall={useDwall}
                        powers={powersAvailable == "" ? [] : powersAvailable}
                        matchEvents={matchEvents}
                        getFantasyTeam={getFantasyTeam}
                      />
                    ) : (
                      <MyScoreCard />
                    )}
                  </Card>
                  <div
                    className={classes.left_side_footer}
                    style={{ position: "relative" }}
                  >
                    {/* <img src={FooterImage} alt="" /> */}
                    <a
                      href="https://fanatics.93n6tx.net/c/2068372/1126094/9663"
                      target="_blank"
                      id="1126094"
                    >
                      <img
                        src="https://a.impactradius-go.com/display-ad/9663-1126094"
                        border="0"
                        alt=""
                        width="1000"
                        height="640"
                      />
                    </a>
                    <div style={{ position: "absolute", bottom: 0, right: 5 }}>
                      {selectedTeam.game_id}
                    </div>
                  </div>
                </div>

                <div className={classes.sidebar_container}>
                  <Sidebar>
                    <CashPowerBalance
                      entryFee={entry_fee}
                      currency={currency}
                      powerBalance={topPrize}
                      cashBalance={prizePool}
                      styles={{
                        width: "100%",
                        marginTop: "-40px",
                      }}
                      cashTitle="Prize Pool"
                      powerTitle="Top Prize"
                      entryTitle="Entry Fee"
                      centered
                      showIcons={false}
                      entryFee={selectedTeam?.entryFees}
                      currency={"USD"}
                    />
                    <RankCard
                      ranks={ranks}
                      currentWin={100000}
                      onClickStandings={onClickStandings}
                      prizePool={prizePool}
                      {...props}
                    />
                    <PowerSidebar
                      collapse={false}
                      swapCounts={swapCounts}
                      dwallCounts={dwallCounts}
                      challengeCounts={challengeCounts}
                      pointMultiplierCounts={pointMultiplierCounts}
                      pointBooster15x={pointBooster15x}
                      pointBooster2x={pointBooster2x}
                      pointBooster3x={pointBooster3x}
                      retroBoostCounts={retroBoostCounts}
                      powerUpCounts={powerUpCounts}
                      game={selectedTeam}
                      powers={powersAvailable == "" ? [] : powersAvailable}
                    />
                  </Sidebar>
                </div>
              </div>
            </div>
          </div>
          <Footer isBlack={true} />
          <PrizeModal
            visible={showPrizeModal}
            sportsName="NHL"
            data={selectedTeam?.reward}
            onClose={() => setPrizeModalState(false)}
          />
        </>
      ) : (
        <>
          <Mobile
            data={live_players}
            ranks={ranks}
            counts={{
              swapCounts,
              dwallCounts,
              challengeCounts,
              retroBoostCounts,
              powerUpCounts,
              pointMultiplierCounts,
            }}
            loading={loading}
            swapCounts={swapCounts}
            dwallCounts={dwallCounts}
            challengeCounts={challengeCounts}
            pointMultiplierCounts={pointMultiplierCounts}
            pointBooster15x={pointBooster15x}
            pointBooster2x={pointBooster2x}
            pointBooster3x={pointBooster3x}
            retroBoostCounts={retroBoostCounts}
            powerUpCounts={powerUpCounts}
            setPlayerToSwap={setPlayerToSwap}
            onPowerApplied={onPowerApplied}
            POWER_IDs={POWER_IDs}
            setPowers={setPowers}
            cardType="nhl"
          />
        </>
      )}
      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

NHLPowerdFsLive.propTypes = {};

export default NHLPowerdFsLive;
