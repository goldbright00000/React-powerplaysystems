import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import { hasText } from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import Challenge from "../../icons/Challenge";
import { isEmpty } from "lodash";
import RenderPointsSummary from "./RenderPointsSummary";
import SportsLiveCardOverlay from "./SportsLiveCardOverlay";
import { CardType } from "./CardType";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCardTeamD(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);

  const {
    data = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    onSelectCard = () => {},
    cardType = CardType.MLB,
  } = props || {};

  const { team_d_mlb_team: team = {}, match = {} } = data || {};

  const { away_team = {}, home_team = {}, status = "", boxscore = [] } =
    match || {};

  const {
    name = "",
    type = "",
    points = 0,
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    range = "",
    xp = {},
    mlb_team_stats = [],
  } = team || {};

  const {
    abbr = 0,
    average_runs_against = 0,
    loses = 0,
    season_id = 0,
    stats_id = 0,
    status: teamStatus = null,
    team_id,
    wins: teamWins = 0,
  } = mlb_team_stats[0] || {};

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
    strikes = 0,
    earned_runs_average = 0,
    base_on_balls = 0,
    walks_hits_per_innings_pitched = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
    current_inning = 0,
    current_inning_half = "",
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
            Runs Against:{average_runs_against}
            HR Against:{2}
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
          className={`${classes.points} ${classes.team_d_width} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
        </div>
      </div>
      <div
        className={`${classes.team_d_icons} ${largeView && classes.large_view}`}
      >
        {cardType === CardType.MLBR ? (
          <Challenge size={largeView ? 28 : 24} />
        ) : (
          <Challenge size={largeView ? 28 : 24} />
        )}
        <ShieldIcon size={largeView ? 28 : 24} />
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

  const RenderChallengeButton = () => {
    return (
      <button className={classes.challenge_btn}>
        Click here to Challenge!
      </button>
    );
  };

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {type}
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

  const RenderHeaderIcons = () =>
    singleView && <VideoIcon size={singleView && 23} />;

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
                      <RenderChallengeButton />
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
              title={footerTitle()}
              largeView={largeView}
            />
          )}

          {/* {cardType !== CardType.MLBR && (
            <SportsLiveCardOverlay
              text="Video review is available now"
              visible={!singleView && showVideoOverlay}
              onGotIt={() => setVideoOverlayState(false)}
              largeView={largeView}
            />
          )} */}
        </div>
      </div>
    </>
  );
}

SportsLiveCardTeamD.propTypes = {
  data: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  active: PropTypes.bool,
  cardType: PropTypes.string,
  onSelectCard: PropTypes.func,
};

export default SportsLiveCardTeamD;
