import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as mlbActions from "../../actions/MLBActions";
import classes from "./index.module.scss";
import Replace from "../../icons/Replace";
import XPIcon from "../../icons/XPIcon";
import StarPower from "../../assets/star_power.png";
import {
  hasText,
  printLog,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import XP1_5 from "../../icons/XP1_5";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon from "../../icons/XP2";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3 from "../../icons/XP3";
import XP3_1 from "../../icons/XP3_1";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import MiniStar from "../../assets/mini_star.png";
import Tooltip from "../ToolTip";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../../utility/constants";
import RenderPointsSummary from "./RenderPointsSummary";
import SportsLiveCardOverlay from "./SportsLiveCardOverlay";
import RenderModal from "./RenderModal";
import { CardType } from "./CardType";
import HomeRun from "./HomeRun";
import ActivatedBoost from "./ActivatedBoost";
import NFLFooterStats from "./NFLFooterStats";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCard(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showReplaceModal, setReplaceModalState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);
  const [playerList, setPlayerList] = useState({});
  const [loadingPlayerList, setLoadingPlayerList] = useState(false);

  const dispatch = useDispatch();
  const { data: mlbData = [] } = useSelector((state) => state.mlb);

  const {
    data = {},
    // playerList = [],
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    starPlayerCount = 0,
    onSelectCard = () => {},
    onChangeXp = (xp, player) => {},
    updateReduxState = (currentPlayer, newPlayer) => {},
    cardType = CardType.MLB,
    isHomeRun = false,
    gameInfo = {},
    pointXpCount = {},
  } = props || {};

  const { gameId, userId, teamId, sportId } = gameInfo || {};

  const { player = {}, match = {}, xp = {} } = data || {};

  const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

  const {
    name = "",
    type = "",
    type1 = "",
    points = 0,
    homeTeam = "",
    awayTeam = "",
    stats = {},
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    isStarPlayer = false,
    range = "",
    id = "",
    mlb_player_stats = [],
    boost = {},
    current_team = "",
    player_id = "",
  } = player || {};

  const {
    base_on_balls = 0,
    batting_average = 0,
    doubles = 0,
    earned_runs_average = 0,
    hits = 0,
    home_runs = 0,
    losses = 0,
    ops = 0,
    // player_id = 0,
    // runs_batted_in = 0,
    season_id = 1,
    stats_id = 0,
    stolen_bases = 0,
    triples = 0,
    type: playerStatType = "",
    walks_hits_per_innings_pitched = 0,
    wins = 0,
    match_stats = {},
  } = mlb_player_stats[0] || {};

  const {
    data_id = 0,
    match_id = 0,
    pitch_count = 0,
    walks = 0,
    // hits = 0,
    // runs = 0,
    runs_batted_in = 0,
    innings_pitched = 0,
    strike_outs = 0,
    // batting_average = 0,
    // earned_runs_average = 0,
  } = match_stats || {};

  const {
    away_team = {},
    home_team = {},
    status = "",
    boxscore = [],
    date_time = "",
  } = match || {};

  const {
    // hits = 0,
    // doubles = 0,
    // triples = 0,
    // home_runs = 0,
    // stolen_bases = 0,
    // runs_batted_in = 0,
    // batting_average = 0,
    // wins = 0,
    // losses = 0,
    // innings_pitched = 0,
    strikes = 0,
    balls = 0,
    // earned_runs_average = 0,
    // base_on_balls = 0,
    // walks_hits_per_innings_pitched = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    current_inning = 0,
    current_inning_half = null,
  } = boxscore[0] || {};

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

  const footerTitle = () => {
    if (isEmpty(current_inning_half)) {
      return ``;
    }

    const currentInningHalf = `${current_inning_half}`.toLocaleLowerCase();
    if (currentInningHalf === "b") {
      return `Bot ${current_inning} | ${outs} outs`;
    }

    return `Top ${current_inning} | ${outs} outs`;
  };

  const toggleReplaceModal = useCallback(async () => {
    if (cardType === CardType.MLB) {
      setLoadingPlayerList(true);
      setReplaceModalState(!showReplaceModal);
      const response = await dispatch(mlbActions.mlbData(gameId));

      if (response?.filterdList && response?.filterdList?.length) {
        // const _mlbData = [...mlbData];
        const _mlbData = [...response?.filterdList];
        const [swapablePlayerData] = _mlbData?.filter(
          (data) => data?.type === `${type}`?.toLocaleLowerCase()
        );

        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(date_time).clone().format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data) => `${data?.time}` === _time && data?.playerId !== player_id
          );

          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };

          printLog(newListData);

          setPlayerList(_dataToRender);
        }
      }
      setLoadingPlayerList(false);
    }
  }, [mlbData]);

  const onSwap = (playerId, match_id) => {
    const [swapablePlayer] =
      !isEmpty(playerList) &&
      playerList?.listData?.length &&
      playerList?.listData?.filter(
        (player) =>
          player?.playerId === playerId && player?.match_id === match_id
      );

    if (swapablePlayer) {
      updateReduxState(data, swapablePlayer);
      toggleReplaceModal();
    }
  };

  const getStatus = () => {
    if (`${status}`?.toLocaleLowerCase() === "scheduled") {
      return `${moment(date_time).format("MMM Do")} - ${moment(
        date_time
      ).format("hh:mm A")}`;
    }

    return status;
  };

  const getCurrentInningHalf = () => {
    if (isEmpty(current_inning_half)) return null;

    return `${current_inning_half}`.toLocaleLowerCase();
  };

  const renderXp = () => {
    let svgSize = singleView ? 14 : largeView ? 28 : 24;
    if (xp && xp?.xp === CONSTANTS.XP.xp1_5)
      return <XP1_5_1 className={classes.xp_svg} size={svgSize} />;
    else if (xp && xp?.xp === CONSTANTS.XP.xp2)
      return <XP2Icon_1 className={classes.xp_svg} size={svgSize} />;
    else if (xp && xp?.xp === CONSTANTS.XP.xp3)
      return <XP3_1 className={classes.xp_svg} size={svgSize} />;

    if (!singleView) {
      return <XPIcon size={svgSize} />;
    }

    return null;
  };

  const RenderStarPower = ({}) =>
    isStarPlayer && (
      <img
        className={`${classes.star_power} ${singleView && classes.mini_star}`}
        src={singleView ? MiniStar : StarPower}
      />
    );

  const RenderXpToolTip = () => (
    <div className={classes.stat_xp}>
      {cardType === CardType.MLBR ? (
        <div
          className={classes.stat_xp_mlbr}
          onClick={() => onChangeXp(0, data)}
        >
          <XPIcon size={singleView ? 14 : largeView ? 28 : 24} />
        </div>
      ) : (
        <Tooltip
          toolTipContent={
            <div className={classes.xp_icons}>
              <div
                className={`${classes.xp_block} ${
                  xp1 <= 0 && classes.disabled
                }`}
              >
                <XP1_5 onClick={() => onChangeXp(CONSTANTS.XP.xp1_5, data)} />
                <p>
                  <span>{xp1}</span> left
                </p>
              </div>
              <div
                className={`${classes.xp_block} ${
                  xp2 <= 0 && classes.disabled
                }`}
              >
                <XP2Icon onClick={() => onChangeXp(CONSTANTS.XP.xp2, data)} />
                <p>
                  <span>{xp2}</span> left
                </p>
              </div>
              <div
                className={`${classes.xp_block} ${
                  xp3 <= 0 && classes.disabled
                }`}
              >
                <XP3 onClick={() => onChangeXp(CONSTANTS.XP.xp3, data)} />
                <p>
                  <span>{xp3}</span> left
                </p>
              </div>
            </div>
          }
        >
          {renderXp()}
        </Tooltip>
      )}
    </div>
  );

  const RenderStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          Stats
        </p>
        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          {type === "P" ? (
            <>
              <p className={`${classes.p} ${largeView && classes.large_view}`}>
                IP: {innings_pitched} | PC: {pitch_count}
              </p>
              <p className={`${classes.p} ${largeView && classes.large_view}`}>
                K:{strike_outs} | W:{walks}
              </p>
            </>
          ) : (
            <>
              <p>{removeZeroBeforeDecimalPoint(batting_average)}</p>
              <p>
                RBI: {runs_batted_in} | R: {0}
              </p>
            </>
          )}
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          {xp?.xpVal} Points
        </p>
        <div
          className={`${classes.points} ${largeView && classes.large_view} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
          <RenderXpToolTip />
        </div>
      </div>
    </div>
  );

  const RenderStatus = ({ success = false, danger = false }) => (
    <p
      className={`${classes.container_status} ${
        singleView ? classes.margin_top_bottom_8 : classes.margin_top_bottom_16
      } ${largeView && classes.large_view}`}
    >
      <span
        className={`
        ${largeView && classes.large_view}
        ${success && classes.success} 
        ${danger && classes.danger}`}
      >
        {getStatus()}
      </span>
    </p>
  );

  const RenderMlbRechargeStatus = () => {
    if (isHomeRun) {
      return <HomeRun largeView={largeView} />;
    }

    if (!isEmpty(boost)) {
      return <ActivatedBoost largeView={largeView} boost={boost} />;
    }

    return (
      <RenderStatus
        success={
          hasText(status, "batting") ||
          hasText(status, "pitching") ||
          hasText(status, "hitting")
        }
        danger={hasText(status, "deck")}
      />
    );
  };

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {type === "XB" || type === "OF" ? type1 : type}
      </p>
      <div className={classes.header_teams}>
        <p
          className={current_team === away_team.team_id && classes.current_team}
        >
          {getCurrentInningHalf() === "b" ? (
            <BaseballStick style={{ marginRight: "5px" }} />
          ) : (
            <Baseball style={{ marginRight: "5px" }} />
          )}
          {away_team?.name} {away_team_runs}
        </p>{" "}
        vs{" "}
        <span
          className={current_team === home_team.team_id && classes.current_team}
        >
          {home_team?.name} {home_team_runs}
        </span>
      </div>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>{type}</p>
      <div>
        <p className={classes.single_view_pts}>
          Pts: <span className={xp && xp?.xp && classes.active}>30</span>
          {renderXp()}
        </p>
      </div>
      <p>
        Bot 1st
        <span className={classes.divider_1}>|</span>2 Out
      </p>
    </div>
  );

  const RenderTeamDHeader = () =>
    !singleView && <span className={classes.teamd_range}>{range}</span>;

  const RenderHeaderIcons = () => (
    <Replace size={singleView ? 23 : 22} onClick={toggleReplaceModal} />
  );

  return (
    <>
      <div className={classes.card_wrapper}>
        {!singleView && <RenderHeader />}

        <div
          className={`${classes.card_container} ${
            !compressedView && !singleView && classes.height_284
          }
          ${largeView && !compressedView && classes.height_340}
          ${singleView && classes.single_view_hover}
          ${active && classes.active}
        `}
          onClick={() => onSelectCard(data)}
        >
          <RenderStarPower />
          <div className={classes.container_header}>
            <p
              className={`${classes.container_title} ${
                largeView && classes.large_view
              }`}
            >
              {name} <RenderTeamDHeader />
            </p>
            <RenderHeaderIcons />
          </div>
          {!singleView && <div className={classes.divider} />}

          <div className={classes.container_body}>
            {!showSummary ? (
              <>
                {!singleView && <RenderStatPoints />}
                {!compressedView && (
                  <>
                    {singleView && <RenderSingleViewStats />}
                    {cardType === CardType.MLBR ? (
                      <RenderMlbRechargeStatus />
                    ) : (
                      <RenderStatus
                        success={
                          hasText(status, "batting") ||
                          hasText(status, "pitching") ||
                          hasText(status, "hitting")
                        }
                        danger={hasText(status, "deck")}
                      />
                    )}

                    {cardType !== CardType.NFL && !singleView ? (
                      <RenderMLBPlayerStats
                        hitter={hitter}
                        pitcher={pitcher}
                        type={type}
                        baserunner_1={baserunner_1}
                        baserunner_2={baserunner_2}
                        baserunner_3={baserunner_3}
                        baserunner_4={baserunner_4}
                        strikes={strikes}
                        balls={balls}
                        largeView={compressedView || !compressedView}
                        batting_average={removeZeroBeforeDecimalPoint(
                          batting_average
                        )}
                        // {...props}
                      />
                    ) : (
                      cardType === CardType.NFL && <NFLFooterStats />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <RenderPointsSummary
                  titleList={MLBSummaryTitles}
                  tableList={pointsSummary}
                  totalPoints={totalPts}
                  largeView={largeView}
                />
              </>
            )}
          </div>

          {!compressedView && !singleView && (
            <SportsLiveCardFooter
              showSummary={showSummary}
              onClickBack={() => setSummaryState(false)}
              onClickDetails={() => setSummaryState(true)}
              title={footerTitle()}
              largeView={largeView}
            />
          )}
        </div>
      </div>
      <RenderModal
        player={player}
        visible={showReplaceModal}
        onClose={toggleReplaceModal}
        onSwap={onSwap}
        playerList={playerList}
        starPlayerCount={starPlayerCount}
        loading={loadingPlayerList}
      />
    </>
  );
}

SportsLiveCard.propTypes = {
  data: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  isHomeRun: PropTypes.bool,
  boost: PropTypes.object,
  cardType: PropTypes.string,
  starPlayerCount: PropTypes.number,
  playerList: PropTypes.array,
  active: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onChangeXp: PropTypes.func,
  updateReduxState: PropTypes.func,
  gameInfo: PropTypes.object,
  pointXpCount: PropTypes.object,
};

export default SportsLiveCard;
