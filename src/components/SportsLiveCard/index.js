import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import Replace from "../../icons/Replace";
import XPIcon from "../../icons/XPIcon";
import StarPower from "../../assets/star_power.png";
import { hasText } from "../../utility/shared";
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

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCard(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showReplaceModal, setReplaceModalState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);
  const [playerList, setPlayerList] = useState({});

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
    match_id,
  } = props || {};

  const { player = {}, match = {} } = data || {};

  const {
    name = "",
    type = "",
    type1 = "",
    points = 6,
    homeTeam = "",
    awayTeam = "",
    stats = {},
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    isStarPlayer = false,
    range = "",
    id = "",
    xp = {},
    mlb_player_stats = [],
    boost = {},
  } = player || {};

  const { away_team = {}, home_team = {}, status = "", boxscore = [] } =
    match || {};

  const {
    hits = 0,
    doubles = 0,
    triples = 0,
    home_runs = 0,
    stolen_bases = 0,
    runs_batted_in = 0,
    batting_average = 0,
    wins = 0,
    losses = 0,
    innings_pitched = 0,
    pitch_count = 0,
    strikes = 0,
    earned_runs_average = 0,
    base_on_balls = 0,
    walks_hits_per_innings_pitched = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
  } = boxscore[0] || {};

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

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
          onClick={() => onChangeXp(0, player)}
        >
          <XPIcon size={singleView ? 14 : largeView ? 28 : 24} />
        </div>
      ) : (
        <Tooltip
          toolTipContent={
            <div className={classes.xp_icons}>
              <XP1_5 onClick={() => onChangeXp(CONSTANTS.XP.xp1_5, player)} />
              <XP2Icon onClick={() => onChangeXp(CONSTANTS.XP.xp2, player)} />
              <XP3 onClick={() => onChangeXp(CONSTANTS.XP.xp3, player)} />
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
                K:{strikes} | W:{wins}
              </p>
            </>
          ) : (
            <>
              RBI: {runs_batted_in} | R: {0}
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
        {status}
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
        <p>
          {away_team?.name} {away_team_runs}
        </p>{" "}
        vs{" "}
        <span>
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

  const toggleReplaceModal = () => {
    if (cardType === CardType.MLB) {
      const [_playerList] =
        mlbData &&
        mlbData?.length &&
        mlbData?.filter(
          (data) => data?.type === `${type}`?.toLocaleLowerCase()
        );

      if (_playerList) {
        setPlayerList(_playerList);
        setReplaceModalState(!showReplaceModal);
      }
    }
  };

  const onSwap = (playerId, match_id) => {
    const [swapablePlayer] =
      !isEmpty(playerList) &&
      playerList?.listData?.length &&
      playerList?.listData?.filter(
        (player) =>
          player?.playerId === playerId && player?.match_id === match_id
      );
    if (swapablePlayer) {
      updateReduxState(player, swapablePlayer);
      toggleReplaceModal();
    }
  };

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
                        {...props}
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
              title="Bot 1st | 2 Out"
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
};

export default SportsLiveCard;
