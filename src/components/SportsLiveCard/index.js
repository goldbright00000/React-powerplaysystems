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

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCard(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showReplaceModal, setReplaceModalState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);

  const {
    player = {},
    playerList = [],
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    starPlayerCount = 0,
    onSelectCard = () => {},
    onChangeXp = (xp, player) => {},
    updateReduxState = (currentPlayer, newPlayer) => {},
  } = props || {};

  const {
    name: playerName = "",
    category = "",
    status = "",
    points = 0,
    teamA = "",
    teamB = "",
    stats = {},
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    isStarPlayer = false,
    team = "",
    range = "",
    id = "",
    xp = {},
  } = player || {};

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
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {stats?.val1}
          </p>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {stats?.val2}
          </p>
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
          className={`${classes.points} ${
            isTeamD() ? classes.team_d_width : largeView && classes.large_view
          } ${isTeamD() && largeView && classes.large_view_d}`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
          {!isTeamD() && <RenderXpToolTip />}
        </div>
      </div>
      {isTeamD() && (
        <div
          className={`${classes.team_d_icons} ${
            largeView && classes.large_view
          }`}
        >
          <VideoIcon size={largeView ? 28 : 24} />
          <ShieldIcon size={largeView ? 28 : 24} />
        </div>
      )}
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

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {category}
      </p>
      <div className={classes.header_teams}>
        <p>{teamA}</p> vs <span>{teamB}</span>
      </div>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>{category}</p>
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
    isTeamD() &&
    !singleView && <span className={classes.teamd_range}>{range}</span>;

  const RenderHeaderIcons = () =>
    !isTeamD() ? (
      <Replace size={singleView ? 23 : 22} onClick={toggleReplaceModal} />
    ) : (
      isTeamD() && singleView && <VideoIcon size={singleView && 23} />
    );

  const toggleReplaceModal = () => {
    setReplaceModalState(!showReplaceModal);
  };

  const onSwap = (playerId) => {
    const [swapablePlayer] = playerList?.filter(
      (player) => player?.id === playerId
    );
    if (swapablePlayer) {
      updateReduxState(player, swapablePlayer);
      toggleReplaceModal();
    }
  };

  const isTeamD = () => team === "d" || team === "defence";

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
          onClick={() => onSelectCard(player)}
        >
          <RenderStarPower />
          <div className={classes.container_header}>
            <p
              className={`${classes.container_title} ${
                largeView && classes.large_view
              }`}
            >
              {playerName} <RenderTeamDHeader />
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
                    <RenderStatus
                      success={
                        hasText(status, "batting") ||
                        hasText(status, "pitching") ||
                        hasText(status, "hitting")
                      }
                      danger={hasText(status, "deck")}
                    />

                    {!isEmpty(playerStats) && !singleView && (
                      <RenderMLBPlayerStats
                        playerStats={playerStats}
                        {...props}
                      />
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

          <SportsLiveCardOverlay
            text="Video review is available now"
            visible={isTeamD() && !singleView && showVideoOverlay}
            onGotIt={() => setVideoOverlayState(false)}
            largeView={largeView}
          />
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
  player: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  starPlayerCount: PropTypes.number,
  playerList: PropTypes.array,
  active: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onChangeXp: PropTypes.func,
  updateReduxState: PropTypes.func,
};

export default SportsLiveCard;
