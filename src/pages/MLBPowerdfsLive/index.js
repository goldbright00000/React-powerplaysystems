import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import { Link } from "react-router-dom";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";
import _ from "underscore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/mlb_compress_header.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import XPIcon from "../../icons/XPIcon";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import ReplaceAllIcon from "../../icons/Replace";
import ShieldIcon from "../../icons/ShieldIcon";
import ChallengeIcon from "../../icons/Challenge";
import RetroIcon from "../../icons/RetroBoost";
import PowerUpIcon from "../../icons/PowerUp";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";
import SportsLiveCard from "../../components/SportsLiveCard";
import { printLog, redirectTo } from "../../utility/shared";
import { socket } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import Mobile from "../../pages/Mobile/Mobile";
import PowerCollapesible from "../../components/PowerCollapesible";
const { D, P, C, OF, XB, SS } = CONSTANTS.FILTERS.MLB;
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

function MLBPowerdFsLive(props) {
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
  const history = useHistory();
  // const { gameId, userId, teamId, sportId } = history.location.state || {};

  const {
    live_data = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);
  const { selectedTeam = {} } = useSelector((state) => state.mlb);
  const dispatch = useDispatch();

  const onCloseModal = () => setLearnMoreModal(false);
  // let item = props.location.state.item;

  const {
    game_id: gameId = "",
    user_id: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
  } = selectedTeam || {};
  // let item = selectedTeam.item;

  let prizePool,
    topPrize = 0,
    entry_fee = 0,
    currency;
  // let powers = item?.game?.Powers;

  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  topPrize = parseFloat(
    _.max(game?.PrizePayouts, function (ele) {
      return ele.amount;
    }).amount
  );
  entry_fee = game?.entry_fee;
  currency = game?.currency;

  async function setPowers() {
    let a = await dispatch(MLBActions.getUserRemainingPowers(gameId, userId));
    let remainingPowers = a.payload;
    console.log("powers a", a);
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
      } else if (rec.name === "Swap") {
        swap = remainingPowers[i].remaining_amount;
      } else if (rec.name === "Retro Boost") {
        retro_boost = remainingPowers[i].remaining_amount;
      } else if (rec.name === "Power-Up") {
        power_up = remainingPowers[i].remaining_amount;
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(10 || swap);
    setDwallCounts(10 || dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  }

  function isPowerAvailable(type) {
    let powerss = game?.Powers;
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    if (typeof powerss == "undefined") {
      return;
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  }

  function isPowerLocked(type) {
    let powerss = game?.Powers;
    if (typeof powerss == "undefined") {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      }
    }
    return locked;
  }

  async function useSwap(action) {
    if (action) {
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, 4)
      );
      console.log("SWAP REQUEST: ", requests);
      if (requests.payload[0] == 1) {
        setPowers();
      } else {
        alert("Something went wrong. Please try after sometime.");
      }
    }
  }

  async function useDwall(action) {
    if (action) {
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, 5)
      );
      if (requests.payload[0] == 1) {
        setPowers();
      } else {
        alert("Something went wrong. Please try after sometime.");
      }
    }
  }

  async function useChallenge(action) {
    if (action) {
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, 6)
      );
      if (requests.payload[0] == 1) {
        setPowers();
      } else {
        alert("Something went wrong. Please try after sometime.");
      }
    }
  }

  useEffect(async () => {
    if (isEmpty(selectedTeam)) {
      return redirectTo(props, { path: "/my-game-center" });
    }

    _socket = socket();
    setPowers();
    return function cleanUP() {
      isMatchUpdate = false;

      //reset logs
      dispatch(MLBActions.setGameLogs([]));

      //disconnect the socket
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
  }, []);

  useEffect(() => {
    setPlayerToSwap({});
    if (_socket) {
      onSocketEmit();

      onSocketListen();
    }
  }, [_socket]);

  useEffect(() => {
    if (isEmpty(matchUpdateData) && isEmpty(matchUpdateData.data)) return;

    setMatchUpdates();
  }, [matchUpdateData]);

  //All Emit Events
  const onSocketEmit = () => {
    printLog({ ...history.location.state, selectedTeam, gameId, userId });
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
    setLoading(true);
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
      if (players && players?.length) {
        getPlayers(players, teamD);
      }

      const _gameLogs = [...game_logs];
      const sortedGameLogs = _gameLogs.sort(
        (a, b) => a?.fantasy_points_after - b?.fantasy_points_after
      );
      dispatch(MLBActions.setGameLogs(sortedGameLogs));
      setLoading(false);
    });

    //MATCH_UPDATE
    _socket?.on(MATCH_UPDATE, (res) => {
      printLog(res);
      setMatchUpdateData(res);
    });

    //GLOBAL_RANKING
    _socket?.on(GLOBAL_RANKING, (res) => {
      printLog("GLOBAL_RANKING: ", res);
    });

    //FANTASY_TEAM_UPDATE
    _socket?.on(FANTASY_TEAM_UPDATE, (res) => {
      onFantasyTeamUpdate(res);
    });
  };

  const getPlayers = async (players = [], teamD = {}) => {
    const playersArr = new Array(8);
    const [playerP] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === P
    );
    const [playerC] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === C
    );
    const [playerSS] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === SS
    );
    const playerXB = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === XB
    );
    const playerOF = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === OF
    );

    playersArr[0] = { ...playerP };

    playersArr[1] = { ...playerC };
    playersArr[2] = { ...playerSS };

    if (playerXB?.length) {
      playersArr[3] = { ...playerXB[0] };
      playersArr[3].player.type1 = "XB1";
      playersArr[4] = { ...playerXB[1] };
      playersArr[4].player.type1 = "XB2";
    }

    if (playerOF?.length) {
      playersArr[5] = { ...playerOF[0] };
      playersArr[5].player.type1 = "OF1";
      playersArr[6] = { ...playerOF[1] };
      playersArr[6].player.type1 = "OF2";
    }
    playersArr[7] = teamD;
    playersArr[7].team_d_mlb_team.type = D;

    let _totalScore = 0;
    for (let i = 0; i < playersArr?.length - 1; i++) {
      _totalScore += playersArr[i]?.score;
    }

    const _ranks = { ...ranks };

    setRanks({
      ..._ranks,
      score: _totalScore,
    });

    dispatch(MLBActions.mlbLiveData(playersArr));
  };

  const setMatchUpdates = () => {
    const { match_id } = matchUpdateData?.data || {};
    const dataToUpdate = live_data?.filter(
      (match) => match?.match_id === match_id
    );

    // console.log("LIVE DATE: ", live_data, dataToUpdate, match_id);

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

      const liveData = union(live_data, dataToUpdate);

      dispatch(MLBActions.mlbLiveData(liveData));
    }
  };

  const onFantasyTeamUpdate = (res) => {
    const {
      log = {},
      event = {},
      fantasy_team = {},
      updated_player = {},
      updated_team_defense = {},
    } = res?.data || {};
    console.log("ON FANTASY UPDATES: ", res);

    const { fantasy_points_after = 0 } = log || {};
    setPoints(fantasy_points_after);
    if (!live_data?.length) return;

    const liveData = [...live_data];
    if (!isEmpty(playerToSwap)) {
      const updatedPlayerIndex = liveData?.indexOf(playerToSwap);
      if (updatedPlayerIndex !== -1) {
        liveData[updatedPlayerIndex] = updated_player;
      }

      dispatch(MLBActions.mlbLiveData(liveData));
    }
  };
  async function usePointBoosterPower(action, power) {
    if (action) {
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, power)
      );
      if (requests.payload[0] == 1) {
        setPowers();
      } else {
        alert("Something went wrong. Please try after sometime.");
      }
    }
  }

  const onChangeXp = async (xp, player) => {
    console.log("onChangeXp");
    const _selectedXp = {
      xp,
    };
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";
    let indexOfPlayer = -1;
    indexOfPlayer = live_data?.indexOf(player);
    if (indexOfPlayer !== -1) {
      player.xp = _selectedXp;
      live_data[indexOfPlayer] = player;
      let power = 0;
      if (_selectedXp.xpVal == "1.5x") {
        power = 1;
      } else if (_selectedXp.xpVal == "2x") {
        power = 2;
      } else if (_selectedXp.xpVal == "3x") {
        power = 3;
      }
      console.log("power", power, gameId, userId);
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, power)
      );
      if (requests.payload[0] == 1) {
        setPowers();
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
      return dispatch(MLBActions.mlbLiveData(live_data));
    }
  };

  const onPowerApplied = (fantasyTeamId, matchId, playerId, powerId) => {
    //On Power applied
    _socket.emit(ON_POWER_APPLIED, {
      fantasyTeamId: fantasyTeamId,
      matchId: matchId,
      playerId: playerId,
      powerId: powerId,
    });
  };

  const onClickStandings = () => {};

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;

    const { gameId, sportId, teamId, userId } = history.location.state || {};

    // console.log(currentPlayer, newPlayer);
    setPlayerToSwap(currentPlayer);

    onPowerApplied(
      teamId,
      newPlayer.match_id,
      newPlayer.playerId,
      POWER_IDs.SWAP
    );

    return;
    const _data = [...live_data];
    const indexOfPlayer = _data && _data?.indexOf(currentPlayer);
    let _starPlayerCount = starPlayerCount;

    if (starPlayerCount >= 3 && !newPlayer?.isStarPlayer) {
      return;
    } else if (
      starPlayerCount >= 3 &&
      newPlayer?.isStarPlayer &&
      currentPlayer?.isStarPlayer
    ) {
      _data[indexOfPlayer].player = newPlayer;
    } else if (
      starPlayerCount < 3 &&
      newPlayer?.isStarPlayer &&
      !currentPlayer?.isStarPlayer
    ) {
      _data[indexOfPlayer] = newPlayer;
      _starPlayerCount++;
    } else if (
      currentPlayer?.isStarPlayer &&
      !newPlayer?.isStarPlayer &&
      starPlayerCount > 0
    ) {
      _data[indexOfPlayer] = newPlayer;
      _starPlayerCount--;
    } else if (!newPlayer?.isStarPlayer && !currentPlayer?.isStarPlayer) {
      _data[indexOfPlayer] = newPlayer;
    }

    dispatch(MLBActions.setStarPlayerCount(_starPlayerCount));
    dispatch(MLBActions.mlbLiveData(_data));
  };

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => {
    const text = process.env.REACT_APP_POST_SHARING_TEXT;
    return (
      <div className={classes.sidebar_content_p}>
        <div className={classes.sidebar_power_header}>
          {isSvgIcon ? (
            <Icon size={54} />
          ) : (
            <img src={Icon} width={54} height={54} />
          )}
          {isPowerAvailable(title) === 1 && isPowerLocked(title) === 1 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </div>
        <p className={classes.power_title}>{title}</p>
        {isPowerAvailable(title) === 0 ? (
          <div style={{ opacity: 0.6, fontSize: "0.9rem" }}>Not Available</div>
        ) : (
          <div className={classes.power_footer}>
            {isPowerLocked(title) === 1 ? (
              <>
                <p>Share to unlock:</p>
                <div>
                  <button
                    onClick={() => {
                      var left = window.screen.width / 2 - 600 / 2,
                        top = window.screen.height / 2 - 600 / 2;
                      window.open(
                        `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                        "targetWindow",
                        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                          left +
                          ",top=" +
                          top
                      );
                    }}
                  >
                    <FacebookIcon />
                  </button>

                  <button
                    onClick={() => {
                      var left = window.screen.width / 2 - 600 / 2,
                        top = window.screen.height / 2 - 600 / 2;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                        "targetWindow",
                        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                          left +
                          ",top=" +
                          top
                      );
                    }}
                  >
                    <TwitterIcon />
                  </button>
                </div>
              </>
            ) : (
              <p className={classes.power_footer_count}>
                {count} <span>left</span>
              </p>
            )}
          </div>
        )}
      </div>
    );
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

  const RenderView = () => {
    // console.log('loading -> ', loading)

    // console.log('selectedView -> ', selectedView)

    // console.log('live_data -> ', live_data)

    if (loading) {
      return <p>Loading...</p>;
    }

    if (selectedView === CONSTANTS.NHL_VIEW.S) {
      return (
        <SingleView
          data={live_data}
          onChangeXp={onChangeXp}
          updateReduxState={updateReduxState}
          starPlayerCount={starPlayerCount}
          gameInfo={selectedTeam}
          dwall={dwallCounts}
          challenge={challengeCounts}
          useDwall={useDwall}
          useChallenge={useChallenge}
          dataMain={selectedTeam}
          useSwap={useSwap}
          swapCount={swapCounts}
          setPowers={setPowers}
          pointXpCount={{
            xp1: pointBooster15x,
            xp2: pointBooster2x,
            xp3: pointBooster3x,
          }}
        />
      );
    } else if (live_data && live_data?.length) {
      console.log("live_data", live_data);
      return live_data?.map((item, index) => (
        <>
          {item?.team_d_mlb_team && item?.team_d_mlb_team?.type === D ? (
            <SportsLiveCardTeamD
              data={item}
              compressedView={compressedView}
              key={index + "" + item?.team_d_mlb_team?.type}
              dwall={dwallCounts}
              challenge={challengeCounts}
              useDwall={useDwall}
              useChallenge={useChallenge}
              dataMain={selectedTeam}
              setPowers={setPowers}
            />
          ) : (
            <SportsLiveCard
              data={item}
              compressedView={compressedView}
              key={index + ""}
              onChangeXp={onChangeXp}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
              gameInfo={selectedTeam}
              useSwap={useSwap}
              swapCount={swapCounts}
              dataMain={selectedTeam}
              setPowers={setPowers}
              pointXpCount={{
                xp1: pointBooster15x,
                xp2: pointBooster2x,
                xp3: pointBooster3x,
              }}
            />
          )}
        </>
      ));
    }
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

  return (
    <>
      {screenSize > 550 ? (
        <>
          <Header />
          <div className="teamManagerDiv">
            <div className={classes.wrapper}>
              <Header4
                titleMain1="MLB 2021"
                titleMain2="PowerdFS"
                subHeader1="Introducing Live-Play Fantasy Baseball"
                subHeader2={
                  <>
                    Use your <span>Powers</span> during the live game to drive
                    your team up the standings
                  </>
                }
                contestBtnTitle="Contest Rules"
                prizeBtnTitle="Prize Grid"
                bgImageUri={BaseballImage}
                compressedView
                currentState={<RenderLiveState isLive />}
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
                    teamManagerLink="/mlb-live-powerdfs"
                    scoreDetailLink="/mlb-live-powerdfs/my-score-details"
                    onGoBack={() =>
                      redirectTo(props, { path: "/my-game-center" })
                    }
                    state={history.location.state}
                    {...props}
                  />
                  <Card>{RenderView()}</Card>
                  <div className={classes.left_side_footer}>
                    <img src={FooterImage} alt="" />
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
                      {...props}
                    />

                    <div className={classes.sidebar_content}>
                      <p>
                        <span>My</span> Powers
                      </p>
                      <div className={classes.sidebar_content_1}>
                        <RenderPower
                          title="Point Booster"
                          isSvgIcon
                          Icon={XPIcon}
                          count={pointMultiplierCounts}
                        />
                        <RenderPower
                          title="Swap Player"
                          isSvgIcon
                          Icon={ReplaceAllIcon}
                          count={swapCounts}
                        />
                        <RenderPower
                          title="D-Wall"
                          isSvgIcon
                          Icon={ShieldIcon}
                          count={dwallCounts}
                        />
                        <RenderPower
                          title="Challenge"
                          isSvgIcon
                          Icon={ChallengeIcon}
                          count={challengeCounts}
                        />
                        <RenderPower
                          title="Retro Boost"
                          isSvgIcon
                          Icon={RetroIcon}
                          count={retroBoostCounts}
                        />
                        <RenderPower
                          title="Power Up"
                          isSvgIcon
                          Icon={PowerUpIcon}
                          count={powerUpCounts}
                        />
                      </div>
                      <button onClick={() => setLearnMoreModal(true)}>
                        Learn more
                      </button>
                    </div>

                    {/* <PowerCollapesible powers={powers} /> */}
                  </Sidebar>
                </div>
              </div>
            </div>
          </div>
          <Footer isBlack={true} />
          <LearnMoreModal
            title="Point Multipler"
            learnMoreModal={learnMoreModal}
            onCloseModal={onCloseModal}
          />
        </>
      ) : (
        <Mobile data={live_data} ranks={ranks} />
      )}
    </>
  );
}

MLBPowerdFsLive.propTypes = {};

export default MLBPowerdFsLive;
