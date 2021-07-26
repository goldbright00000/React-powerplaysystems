import React, { useEffect, useState } from "react";
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
  const [ranks, setRanks] = useState({});
  const [powersInventory, setPowersInventory] = useState({
    swap: 2,
    point_multiplier: 0,
    d_wall: 1,
    challenge: 1,
  });
  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const history = useHistory();

  const {
    live_data = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseModal = () => setLearnMoreModal(false);
  let item = props.location.state.item;
  
  let prizePool, topPrize = 0;
  let powers = item?.game?.Powers;
  
  prizePool = _.reduce(
    item?.game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  topPrize= parseFloat(
    _.max(item?.game?.PrizePayouts, function (ele) {
      return ele.amount;
    }).amount
  );


  function powerVal(type) {
    console.log("type", type);
    let powerss = item?.game?.Powers;
    let val = 0;
    for(var i = 0; i < powerss.length; i++)
    {
      if(powerss[i].powerName === type)
      {
        val = powerss[i].amount;
      }
    }
    switch(type)
    {
      case "Swap":
        if(val !== swapCounts)
          setSwapCounts(val);
        break;
      case "D-Wall":
        val = 1;
        if(val !== dwallCounts){
          console.log("type1", type);
          setDwallCounts(1);
        }
        break;
      case "Challenge":
        val = 1;
        if(val !== challengeCounts)
          setChallengeCounts(1);
        break;
      case "Point Miltiplier":
        if(val !== pointMultiplierCounts)
          setPointMultiplierCounts(val);
        break;
    }
    return val;
  }
  function useSwap(action) {
    if(action)
    {
      var oldCount = swapCounts;
      if(oldCount > 0)
      {
        oldCount = oldCount - 1;
        setSwapCounts(oldCount);
        return;
      }
      setSwapCounts(0);
    }
  }
  function useDwall(action)
  {
    if(action)
    {
      var oldCount = dwallCounts;
      if(oldCount > 0)
      {
        oldCount = oldCount - 1;
        setDwallCounts(oldCount);
        return;
      }
      setDwallCounts(0);
    }
  }
  function useChallenge(action)
  {
    if(action)
    {
      var oldCount = challengeCounts;
      if(oldCount > 0)
      {
        oldCount = oldCount - 1;
        setChallengeCounts(oldCount);
        return;
      }
      setChallengeCounts(0);
    }
  }
  useEffect(() => {
    _socket = socket();

    powerVal("Swap");
    powerVal("Challenge");
    powerVal("D-Wall");

    return function cleanUP() {
      isMatchUpdate = false;

      //disconnect the socket
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
  }, []);

  useEffect(() => {
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
    const { gameId, userId, teamId, sportId } = history.location.state || {};
    printLog(history.location.state);
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
  };

  //All listen events
  const onSocketListen = () => {
    //fetch data first time
    setLoading(true);
    _socket?.on(EMIT_ROOM, (res) => {
      console.log("EMIT_ROOM: ", res);
      const {
        game_id = "",
        score = 0,
        sport_id = "",
        status = null,
        team_id = "",
        defense = [],
        players = [],
        power_dfs_team_rankings = [],
      } = res?.data || {};

      const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
      if (players && players?.length) {
        getPlayers(players, teamD);
      }

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

    dispatch(MLBActions.mlbLiveData(playersArr));
  };

  const setMatchUpdates = () => {
    const { match_id } = matchUpdateData?.data || {};
    const dataToUpdate = live_data?.filter(
      (match) => match?.match_id === match_id
    );

    console.log("LIVE DATE: ", live_data, dataToUpdate, match_id);

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
    console.log("FANTAY TEAM UPDATE: ", res);
    const { log: { data: { fantasy_points_after = 0 } = {} } = {} } = res || {};
    setPoints(fantasy_points_after);
    if (!live_data?.length) return;

    const liveData = [...live_data];
    // console.log("FANTASY_TEAM_UPDATE_2: ", liveData, fantasy_points_after);
    // for (let i = 0; i < liveData?.length; i++) {
    //   liveData[i].player.points = fantasy_points_after || 0;
    // }

    dispatch(MLBActions.mlbLiveData(liveData));
  };

  const onChangeXp = (xp, player) => {
    const _selectedXp = {
      xp,
    };
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    const indexOfPlayer = live_data?.indexOf(player);

    if (indexOfPlayer) {
      player.xp = _selectedXp;
      live_data[indexOfPlayer] = player;
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

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;

    const { gameId, sportId, teamId, userId } = history.location.state || {};

    console.log(currentPlayer, newPlayer);

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
          {count <= 0 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </div>
        <p className={classes.power_title}>{title}</p>
        <div className={classes.power_footer}>
          {count <= 0 ? (
            <>
              <p>Share to unlock:</p>
              <div>
                <a
                  href={`https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${text}&redirect_uri=http://defygames.io`}
                >
                  <button>
                    <FacebookIcon />
                  </button>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${text}${count}`}
                  target="_blank"
                >
                  <button>
                    <TwitterIcon />
                  </button>
                </a>
              </div>
            </>
          ) : (
            <p className={classes.power_footer_count}>
              {count} <span>left</span>
            </p>
          )}
        </div>
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
          gameInfo={history.location.state}
        />
      );
    } else if (live_data && live_data?.length) {
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
            />
          ) : (
            <SportsLiveCard
              data={item}
              compressedView={compressedView}
              key={index + ""}
              onChangeXp={onChangeXp}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
              gameInfo={history.location.state}
              useSwap={useSwap}
              swapCount={swapCounts}
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
                      powerBalance={topPrize}
                      cashBalance={prizePool}
                      styles={{
                        width: "100%",
                        marginTop: "-40px",
                      }}
                      cashTitle="Prize Pool"
                      powerTitle="Top Prize"
                      centered
                      showIcons={false}
                    />
                    <RankCard ranks={ranks} currentWin={100000} {...props} />

                    <div className={classes.sidebar_content}>
                      <p>
                        <span>My</span> Powers
                      </p>
                      <div className={classes.sidebar_content_1}>
                        <RenderPower
                          title="Point Booster"
                          isSvgIcon
                          Icon={XPIcon}
                          count={powersInventory.point_multiplier}
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
        <Mobile data={live_data} />
      )}
    </>
  );
}

MLBPowerdFsLive.propTypes = {};

export default MLBPowerdFsLive;
