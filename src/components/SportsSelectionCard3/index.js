import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import StarIcon from "../../icons/Star";
import ForwardArrow from "../../icons/ForwardArrow";
import AidIcon from "../../icons/AidIcon";
import MLBPlayerStat from "./MLBPlayerStat";
import NFLPlayerStat from "./NFLPlayerStats";
import NHLPlayerStat from "./NHLPlayerStats";
import StarterStats from "./StarterStats";
import { PAGE_TYPES } from "./PageTypes";
import MLBDetailStats from "./MLBDetailStats";
import AdImage from "../../assets/img.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./carousel.scss";

import { useMediaQuery } from "react-responsive";

function SportsSelectionCard3(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const {
    player = {},
    loading = false,
    onSelectDeselect = (id, matchId) => {},
    disabled = false,
    isSelected = false,
    btnTitle = "+ Select",
    btnIcon = "",
    pageType = PAGE_TYPES.MLB,
    type = "",
  } = props || {};

  const {
    playerId = "",
    playerName = "",
    id = "",
    full_name = "",
    homeTeam = "",
    awayTeam = "",
    date = "",
    time = "",
    stadium = "",
    isStarPlayer = false,
    playerStats = {},
    injured = false,
    position = "",
    match_id,
    primary_position = "",
    is_star_player = false,
  } = player || {};

  const checkIfIsStarPlayer = () => {
    if (type == "p" || type == "P") {
      if (player?.playerStats?.earned_runs_average < 3.5) {
        return true;
      }
    } else {
      if (
        player?.playerStats?.batting_average > 0.29 ||
        player?.playerStats?.home_runs > 30
      ) {
        return true;
      }
    }
    return false;
  };

  const nextStep = () => {
    let _currentStep = currentStep;
    if (currentStep !== 2) {
      _currentStep++;
    } else {
      _currentStep = 0;
    }

    setCurrentStep(_currentStep);
  };

  const renderStats = () => {
    switch (pageType) {
      case PAGE_TYPES.MLB:
        return (
          <MLBPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={type}
          />
        );

      case PAGE_TYPES.NFL:
        return (
          <NFLPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={primary_position}
          />
        );

      case PAGE_TYPES.NHL:
        return (
          <NHLPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={type}
          />
        );

      default:
        return <MLBPlayerStat playerStats={playerStats} active={isSelected} />;
    }
  };

  return (
    <div
      className={`${classes.container_body_card} ${
        checkIfIsStarPlayer()
          ? classes.container_body_card_start_power_background
          : ``
      } ${isSelected ? classes.activeBorder : ""}`}
    >
      {checkIfIsStarPlayer() && (
        <span className={classes.container_body_card_start_power}>
          <StarIcon solidcolor="#000" /> <p>Star Power</p>
        </span>
      )}
      <div className={classes.container_body_card_header}>
        <p
          className={`${classes.container_selected_p} ${
            isSelected ? classes.active : ""
          }`}
        >
          {pageType === PAGE_TYPES.NHL ? (
            <>
              <span>{type}</span>
              {full_name}
            </>
          ) : (
            <>
              <span>{primary_position}</span>
              {playerName}
            </>
          )}
        </p>
        {props.player.isInjured && (
          <div className={classes.injured}>
            <AidIcon />
            <span>Injured</span>
          </div>
        )}
        {!isSelected ? (
          <button
            onClick={() => {
              if (pageType === PAGE_TYPES.NHL) {
                onSelectDeselect(id, match_id);
              } else {
                onSelectDeselect(playerId, match_id);
              }
            }}
            className={disabled && classes.disabled}
            disabled={disabled}
          >
            {btnIcon && btnIcon} {btnTitle || "+ Select"}
          </button>
        ) : (
          <div className={classes.container_selected}>
            <p className={classes.container_selected_p_1}>
              <Tick2 /> Selected{" "}
              <img
                src={DeleteIcon}
                onClick={() => onSelectDeselect(id, match_id)}
              />
            </p>
          </div>
        )}
      </div>

      <div
        className={
          classes.card_state_main_container + " sports_selection_card_carousel"
        }
      >
        {isMobile ? (
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={false}
            infiniteLoop={false}
            interval={1e11}
            // className=".carousel .control-dots"
          >
            <>
              {renderStats()}
              <div className={classes.container_card_footer_main}>
                <div className={classes.card_footer_left}>
                  <p>
                    <span className={classes.teamA}>{homeTeam}</span> VS{" "}
                    <span className={classes.teamB}>{awayTeam}</span>
                  </p>

                  <div className={classes.divider}></div>
                  <p className={classes.container_body_footer}>
                    <span>
                      <ClockIcon /> {time}
                    </span>
                    <span>
                      <CalenderIcon /> {date}
                    </span>
                    <span>
                      <StadiumIcon /> {stadium}
                    </span>
                  </p>
                </div>
              </div>
            </>

            <MLBDetailStats position={primary_position} />

            <>
              <StarterStats position={primary_position} />
              <div
                className={classes.container_card_footer_main}
                style={{ marginTop: "10px" }}
              >
                <div className={classes.card_footer_left}>
                  <div className={classes.divider}></div>
                  <p className={classes.container_body_footer}>
                    <span>
                      <ClockIcon /> {time}
                    </span>
                    <span>
                      <CalenderIcon /> {date}
                    </span>
                    <span>
                      <StadiumIcon /> {stadium}
                    </span>
                  </p>
                </div>
              </div>
            </>

            <img src={AdImage} />
          </Carousel>
        ) : (
          <>
            {currentStep === 0 ? (
              renderStats()
            ) : currentStep === 1 ? (
              <MLBDetailStats position={primary_position} />
            ) : (
              <img src={AdImage} />
            )}
          </>
        )}
      </div>

      {isMobile ? null : (
        <div className={classes.container_card_footer_main}>
          {currentStep === 0 && (
            <div className={classes.card_footer_left}>
              <p>
                <span className={classes.teamA}>{homeTeam}</span> VS{" "}
                <span className={classes.teamB}>{awayTeam}</span>
              </p>

              <div className={classes.divider}></div>
              <p className={classes.container_body_footer}>
                <span>
                  <ClockIcon /> {time}
                </span>
                <span>
                  <CalenderIcon /> {date}
                </span>
                <span>
                  <StadiumIcon /> {stadium}
                </span>
              </p>
            </div>
          )}

          <div className={classes.card_footer_right} onClick={nextStep}>
            <ForwardArrow color={"#fb6e00"} />
          </div>
        </div>
      )}
    </div>
  );
}

SportsSelectionCard3.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  btnTitle: PropTypes.string,
  btnIcon: PropTypes.element,
  onSelectDeselect: PropTypes.func,
  loading: PropTypes.bool,
  pageType: PropTypes.string,
  type: PropTypes.string,
};

export default SportsSelectionCard3;
