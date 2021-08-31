import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import NFLHeaderImage from "../../assets/nfl-live.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import XPIcon from "../../icons/XPIcon";
import RetroBoost from "../../icons/RetroBoost";
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
import { redirectTo } from "../../utility/shared";
import { socket } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import Undo from "../../icons/Undo";
import { CardType } from "../../components/SportsLiveCard/CardType";
import { dummyData } from "./dummyData";

const { D, K, QB, RB, TE, WR } = CONSTANTS.FILTERS.NFL;
const dummy = dummyData;

let _socket = null;
function NFLPowerdFsLive(props) {
  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [playerIds, setPlayerIds] = useState([]);
  const [data, setData] = useState([...dummy]);

  console.log("DUMMY : : :", data);

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

  const getPlayers = async () => {
    const dataResponse = await dispatch(
      MLBActions.getMlbLivePlayPlayerTeamData({
        game_id,
        sport_id,
        user_id: user.user_id,
      })
    );

    const playersArr = new Array(8);
    const { players = [], teamD = {} } = dataResponse || {};

    const [playerQB] = players?.filter(
      (plr) => `${plr?.type}`?.toLocaleLowerCase() === QB
    );

    const playerRB = players?.filter(
      (plr) => `${plr?.type}`?.toLocaleLowerCase() === RB
    );

    const playerWR = players?.filter(
      (plr) => `${plr?.type}`?.toLocaleLowerCase() === WR
    );
    const [playerTE] = players?.filter(
      (plr) => `${plr?.type}`?.toLocaleLowerCase() === TE
    );
    const [playerK] = players?.filter(
      (plr) => `${plr?.type}`?.toLocaleLowerCase() === K
    );

    playersArr[0] = playerQB;
    playersArr[5] = playerTE;
    playersArr[6] = playerK;

    if (playerRB?.length) {
      playersArr[1] = playerRB[0];
      playersArr[1].type = "RB1";
      playersArr[2] = playerRB[1];
      playersArr[2].type = "RB2";
    }

    if (playerWR?.length) {
      playersArr[3] = playerWR[0];
      playersArr[3].type = "WR1";
      playersArr[4] = playerWR[1];
      playersArr[4].type = "WR2";
    }
    playersArr[7] = teamD;
    playersArr[7].type = D;

    setData(playersArr);
  };

  const onChangeXp = (xp, player) => {
    const _selectedXp = {
      xp,
    };
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    // const indexOfPlayer = selectedData?.indexOf(player);
    const indexOfPlayer = data?.indexOf(player);

    if (indexOfPlayer) {
      player.xp = _selectedXp;
      // selectedData[indexOfPlayer] = player;
      data[indexOfPlayer] = player;
      return dispatch(MLBActions.mlbLiveData(data));
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
    // const _data = [...selectedData];
    const _data = [...data];
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
          {item?.type === D ? (
            <SportsLiveCardTeamD
              team={item}
              compressedView={compressedView}
              key={index + ""}
            />
          ) : (
            <SportsLiveCard
              player={item}
              compressedView={compressedView}
              key={index + ""}
              onChangeXp={onChangeXp}
              playerList={mlbData?.[0]?.players}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
              cardType={CardType.NFL}
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

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          titleMain1="NFL 2021"
          titleMain2="PowerdFS"
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={NFLHeaderImage}
          compressedView
          currentState={<RenderLiveState />}
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
              teamManagerLink="/nfl-live-powerdfs"
              scoreDetailLink="/nfl-live-powerdfs/my-score-details"
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

                  <RenderPower
                    title="Retro Boost"
                    isSvgIcon
                    Icon={RetroBoost}
                    count={2}
                  />

                  <RenderPower title="Undo" isSvgIcon Icon={Undo} count={2} />
                </div>
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
  );
}

NFLPowerdFsLive.propTypes = {};

export default NFLPowerdFsLive;
