import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";

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
import CamIcon from "../../icons/CamIcon";
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

function MLBPowerdFsLive(props) {
  const [loading, setLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);

  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [playerIds, setPlayerIds] = useState([]);
  const [data, setData] = useState([]);

  const history = useHistory();

  const {
    live_data: selectedData = [],
    data: mlbData = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseModal = () => setLearnMoreModal(false);

  useEffect(() => {
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

  useEffect(() => {
    if (_socket) {
      onSocketEmit();

      onSocketListen();
    }
  }, [_socket]);

  //All Emit Events
  const onSocketEmit = () => {
    const { gameId, userId, teamId, sportId } = history.location.state || {};
    printLog(history.location.state);
    _socket.emit(ON_ROOM_SUB, {
      gameId: gameId,
      userId: userId,
    });

    //On Power applied
    _socket.emit(ON_POWER_APPLIED, {
      fantasyTeamId: 172,
      matchId: 7052,
      playerId: 10790,
      powerId: 1,
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
      const {
        game_id = "",
        score = 0,
        sport_id = "",
        status = null,
        team_id = "",
        defense = [],
        players = [],
      } = res?.data || {};

      console.log(res.data);

      const teamD = defense[0] || {};
      if (players && players?.length) {
        getPlayers(players, teamD);
      }

      setLoading(false);
    });

    //MATCH_UPDATE
    _socket?.on(MATCH_UPDATE, (res) => {
      printLog("MATCH_UPDATE: ", res);
    });

    //GLOBAL_RANKING
    _socket?.on(GLOBAL_RANKING, (res) => {
      printLog("GLOBAL_RANKING: ", res);
    });

    //FANTASY_TEAM_UPDATE
    _socket?.on(FANTASY_TEAM_UPDATE, (res) => {});
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

    setData(playersArr);
  };

  const onChangeXp = (xp, player) => {
    const _selectedXp = {
      xp,
    };
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    const indexOfPlayer = selectedData?.indexOf(player);

    if (indexOfPlayer) {
      player.xp = _selectedXp;
      selectedData[indexOfPlayer] = player;
      return dispatch(MLBActions.mlbLiveData(selectedData));
    }
  };

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => (
    <div className={classes.sidebar_content_p}>
      <div className={classes.sidebar_power_header}>
        {isSvgIcon ? (
          <Icon size={54} />
        ) : (
          <img src={Icon} width={54} height={54} />
        )}
        <div className={classes.sidebar_lock_icon}>
          <LockIcon />
        </div>
      </div>
      <p className={classes.power_title}>{title}</p>
      <div className={classes.power_footer}>
        {count <= 0 ? (
          <>
            <p>Share to unlock:</p>
            <div>
              <button>
                <FacebookIcon />
              </button>
              <button>
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
    </div>
  );

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

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const _data = [...selectedData];
    const indexOfPlayer = _data && _data?.indexOf(currentPlayer);
    let _starPlayerCount = starPlayerCount;

    if (starPlayerCount >= 3 && !newPlayer?.isStarPlayer) {
      return;
    } else if (
      starPlayerCount >= 3 &&
      newPlayer?.isStarPlayer &&
      currentPlayer?.isStarPlayer
    ) {
      _data[indexOfPlayer] = newPlayer;
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

  const RenderView = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (selectedView === CONSTANTS.NHL_VIEW.S) {
      return (
        <SingleView
          data={data}
          playerList={mlbData?.[0]?.players}
          onChangeXp={onChangeXp}
          updateReduxState={updateReduxState}
          starPlayerCount={starPlayerCount}
        />
      );
    } else if (data && data?.length) {
      return data?.map((item, index) => (
        <>
          {item?.team_d_mlb_team && item?.team_d_mlb_team?.type === D ? (
            <SportsLiveCardTeamD
              data={item}
              compressedView={compressedView}
              key={index + "" + item?.team_d_mlb_team?.type}
            />
          ) : (
            <SportsLiveCard
              data={item}
              compressedView={compressedView}
              key={index + ""}
              onChangeXp={onChangeXp}
              playerList={mlbData?.[0]?.players}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
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
                    powerBalance={50000}
                    cashBalance={200000}
                    styles={{
                      width: "100%",
                      marginTop: "-40px",
                    }}
                    cashTitle="Prize Pool"
                    powerTitle="Top Prize"
                    centered
                    showIcons={false}
                  />
                  <RankCard currentWin={100000} {...props} />

                  <div className={classes.sidebar_content}>
                    <p>
                      <span>My</span> Powers
                    </p>
                    <div className={classes.sidebar_content_1}>
                      <RenderPower
                        title="Point Multiplier"
                        isSvgIcon
                        Icon={XPIcon}
                        count={1}
                      />
                      <RenderPower
                        title="Swap Player"
                        isSvgIcon
                        Icon={ReplaceAllIcon}
                        count={0}
                      />
                      <RenderPower
                        title="D-Wall"
                        isSvgIcon
                        Icon={ShieldIcon}
                        count={0}
                      />
                      <RenderPower
                        title="Video Review"
                        isSvgIcon
                        Icon={CamIcon}
                        count={4}
                      />
                    </div>
                    <button onClick={() => setLearnMoreModal(true)}>
                      Learn more
                    </button>
                  </div>
                </Sidebar>
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
        <Mobile />
      )}
    </>
  );
}

MLBPowerdFsLive.propTypes = {};

export default MLBPowerdFsLive;
