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
import XPIcon from "../../icons/XPIcon";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import PowerSidebar from "../../components/PowerCollapesible";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import SportsLiveCard from "../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../utility/shared";
import { socket, socketNHL } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
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

// let _socket = null;
let _socket;
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
  const [updatesLoaded, setUpdatesLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);

  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [points, setPoints] = useState(0);

  const [playerIds, setPlayerIds] = useState([]);
  const [matchUpdateData, setMatchUpdateData] = useState({});
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [powersInventory, setPowersInventory] = useState({
    swap: 2,
    point_multiplier: 0,
    d_wall: 1,
    challenge: 1,
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
  const [showGameLogs, setGameLogsPageState] = useState(false);
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const dispatch = useDispatch();
  const selectedTeam = getTeamFromLocalStorage();
console.log("selectedTeam", selectedTeam);
  function getGameIDFromLocalStorage() {
    const gameID = getLocalStorage(
      CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME_ID
    );
    if (gameID) {
      dispatch({
        type: NHLActions.NHL_UPDATE_STATE,
        payload: { gameID },
      });
    }
    return gameID;
  }

  const {
    game_id = 0,
    gameID = getGameIDFromLocalStorage(),
    live_players = [],
    live_totalTeamPts = 0,
    live_all_team_logs = [],
    live_team_logs = [],
    live_score_details = [],
    live_teamD = {},
    live_eventData = [],
    live_home = {},
    live_away = {},
    period = 0,
    powersApplied = [],
  } = useSelector((state) => state.nhl);
  useEffect(() => {
    console.log("live_players: ", live_players);
  }, [live_players]);

  const { user = {} } = useSelector((state) => state.auth);
  const { token = "", user_id } = user || {};

  const getFantasyTeam = async () => {
    setLoading(true);
    let payload = {
      gameID: getGameIDFromLocalStorage(),
      userID: user_id,
    };
    // NHLActions.getFantasyTeam(payload);
    await dispatch(NHLActions.getFantasyTeam(payload));

    setLoading(false);
  };
  useEffect(() => {
    getGameIDFromLocalStorage();
    if (user_id) {
      getFantasyTeam();
    }
    _socket = socketNHL();
    console.log("_socket", _socket);
  }, [user_id]);

  const {
    gameID: gameId = "",
    userID: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
    Prizes = [],
    reward = [],
    powersAvailable = "",
    entryFee = 0,
     currencys = "$"
  } = selectedTeam || {};
  console.log(game);
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
  entry_fee = entryFee;
  currency = currencys;

  async function setPowers() {
    let a = await dispatch(NHLActions.getUserRemainingPowers(gameId, userId));
    if (a === undefined) {
      return;
    }

    let remainingPowers = a.payload;
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
      let rec = remainingPowers[i].fantasy_powers;
      if (rec !== undefined && rec !== null) {
        if (rec.name === "D-Wall") {
          dwall = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Challenge") {
          challenge = remainingPowers[i].remaining_amount;
        } else if (rec.name === "1.5x Point Booster") {
          p15 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "2x Point Booster") {
          p2 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "3x Point Booster") {
          p3 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "Swap" || rec.name === "Swap Players") {
          swap = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Retro Boost") {
          retro_boost = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Power-Up") {
          power_up = remainingPowers[i].remaining_amount;
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
        NHLActions.updateUserRemainingPowers(gameId, userId, 4)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 4,
          userId: userId,
          gameId: game_id,
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
        NHLActions.updateUserRemainingPowers(gameId, userId, 5)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 5,
          userId: userId,
          gameId: gameId,
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
        NHLActions.updateUserRemainingPowers(gameId, userId, 6)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 6,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }

  let evaluateTeamLogs = () => {
    dispatch({
      type: NHLActions.NHL_UPDATE_STATE,
      payload: {
        live_all_team_logs: [...live_all_team_logs, ...live_team_logs],
      },
    });

    live_team_logs.forEach((item, index) => {
      console.log(item);

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

      // Team D
      let lv_teamD = live_teamD;
      // Team D
      if (myscore_description === "shotagainst") {
        console.log("myscore_description: shotagainst");
        if (lv_teamD?.stats?.savesAgainst) {
          lv_teamD.stats.savesAgainst = lv_teamD?.stats?.savesAgainst + 1;
        } else {
          if (!lv_teamD.stats) {
            lv_teamD.stats = {};
          }
          if (lv_teamD?.stats) {
            lv_teamD.stats.savesAgainst = 1;
          }
        }
      }

      if (goal && saved === false) {
        if (lv_teamD?.stats?.goalsAgainst) {
          lv_teamD.stats.goalsAgainst = lv_teamD?.stats?.goalsAgainst + 1;
        } else {
          if (!lv_teamD.stats) {
            lv_teamD.stats = {};
          }
          if (lv_teamD?.stats) {
            lv_teamD.stats.goalsAgainst = 1;
          }
        }
      }

      if (homeTeamD) {
        if (lv_teamD?.stats?.points) {
          lv_teamD.stats.points = lv_teamD.stats.points + homeTeamD;
        } else {
          if (!lv_teamD.stats) {
            lv_teamD.stats = {};
          }
          if (lv_teamD?.stats) {
            lv_teamD.stats.points = homeTeamD;
          }
        }
      }

      if (awayTeamD) {
        if (lv_teamD?.stats?.points) {
          lv_teamD.stats.points = lv_teamD.stats.points + awayTeamD;
        } else {
          if (!lv_teamD.stats) {
            lv_teamD.stats = {};
          }
          if (lv_teamD?.stats) {
            lv_teamD.stats.points = awayTeamD;
          }
        }
      }

      // Players
      let lp = [...live_players];

      lp.forEach((playr) => {
        if (playr.id === player.id) {
          if (!Array.isArray(playr.events)) {
            playr.events = [];
          }

          playr.events.push(fantasyLog);
          if (playerPts) {
            if (playr?.stats?.points) {
              playr.stats.points = playr.stats.points + playerPts;
            } else {
              if (!playr.stats) {
                playr.stats = {};
              }
              playr.stats.points = playerPts;
            }
          }

          if (myscore_description === "goal") {
            if (playr?.stats?.goals) {
              playr.stats.goals = playr.stats.goals + 1;
            } else {
              if (!playr.stats) {
                playr.stats = {};
              }
              playr.stats.goals = 1;
            }

            if (playr?.stats?.shots) {
              playr.stats.shots = playr.stats.shots + 1;
            } else {
              if (!playr.stats) {
                playr.stats = {};
              }
              playr.stats.shots = 1;
            }
          }

          if (assists) {
            if (playr?.stats?.assists) {
              playr.stats.assists = playr.stats.assists + 1;
            } else {
              if (!playr.stats) {
                playr.stats = {};
              }
              playr.stats.assists = 1;
            }
          }

          console.log("Player Stats: ", playr.stats);
        }
      });

      dispatch({
        type: NHLActions.NHL_UPDATE_STATE,
        payload: {
          live_period: period,
          live_clock: clock,
          live_totalTeamPts: live_totalTeamPts + totalTeamPts,
          live_players: lp,
          live_strength: strength,
          live_teamD: lv_teamD,
        },
      });
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

  useEffect(async () => {
    setPowers();
  }, []);

  useEffect(() => {
    if (gameID !== 0) {
      _socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });

      _socket.on("connected", () => {
        console.log("Socket Connected");
        _socket.emit("NHL_CONNECT_MATCH_ROOM", {
          gameID: gameID,
        });
      });

      _socket.on("ROOM_CONNECTED", (data) => {
        console.log("ON ROOM CONNECTED: ", data);
        dispatch({
          type: NHLActions.NHL_UPDATE_STATE,
          payload: {
            live_score_details: data,
          },
        });
      });

      _socket.on(`NHL-GAME-${gameID}-${user_id}`, (data) => {
        console.log("THIS IS TEAM LOGS", data);

        if (Array.isArray(data)) {
          dispatch({
            type: NHLActions.NHL_UPDATE_STATE,
            payload: {
              live_team_logs: data,
            },
          });
        }
      });

      _socket.on("ROOM_DATA", (data) => {
        console.log("ROOM DATA: ", data);
      });
    }
  }, [_socket, gameID]);

  useEffect(() => {
    setPlayerToSwap({});
  }, [_socket]);

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
        NHLActions.updateUserRemainingPowers(gameId, userId, power)
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
          userId: userId,
          gameId: gameId,
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

  const onClickStandings = () => {};

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const { team_id, user_id, game_id } = selectedTeam || {};
    setPlayerToSwap(currentPlayer);
    onPowerApplied({
      fantasyTeamId: team_id,
      matchId: currentPlayer.match_id,
      playerId: currentPlayer.player_id,
      playerId2: newPlayer.playerId,
      matchIdP2: newPlayer.match_id,
      powerId: POWER_IDs.SWAP_POWER,
      userId: user_id,
      gameId: game_id,
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
                      entryTitle="Entry Fee"
                      cashTitle="Prize Pool"
                      powerTitle="Top Prize"
                      entryTitle="Entry Fee"
                      centered
                      showIcons={false}
                      entryFee={selectedTeam?.game?.entry_fee}
                      currency={"USD"}
                    />
                    <RankCard
                      ranks={ranks}
                      currentWin={100000}
                      onClickStandings={onClickStandings}
                      game_id={selectedTeam.game_id}
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
                      game={game}
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
            data={selectedTeam?.game?.PrizePayouts}
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
