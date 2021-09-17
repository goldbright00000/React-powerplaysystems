import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock3";
import PowerPlayIcon from "../../assets/token.png";
import XPIcon from "../../icons/XPIcon";
import ReplaceAllIcon from "../../icons/Replace";
import ToolTip from "../../components/ToolTip";
import XP1_5 from "../../icons/XP1_5";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon from "../../icons/XP2";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3 from "../../icons/XP3";
import XP3_1 from "../../icons/XP3_1";
import { hasText } from "../../utility/shared";
import * as NHLActions from "../../actions/NHLActions";
import { CONSTANTS } from "../../utility/constants";
import ShieldIcon from "../../icons/ShieldIcon";
import VideoIcon from "../../icons/VideoIcon";

function SportsSavedPlayerCard(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    item: currentPlayer = {},
    style = {},
    compressed = false,

    selected = false,
    onSelectCard = (item) => { },
  } = props || {};
  const { live_data: selectedData = [], starPlayerCount = 0 } = useSelector(
    (state) => state.nhl
  );
  const dispatch = useDispatch();

  const {
    category = "",
    title = "",
    teamA = "",
    teamB = "",
    id = "",
    isSelected = false,
    isStarPlayer = false,
    live_data_steps = [],
    xp = "",
    xpPoints = 0,
    xpTimes = "",
  } = currentPlayer || {};

  useEffect(() => {
    setCurrentStep(0);
  }, [currentPlayer]);

  useEffect(() => {
    if (compressed) {
      setCurrentStep(0);
    }
  }, [compressed]);

  const nextStep = () => {
    let _currentStep = currentStep;
    if (currentStep < live_data_steps?.length - 1) {
      _currentStep++;
    } else {
      _currentStep = 0;
    }

    setCurrentStep(_currentStep);
  };

  const backStep = () => {
    let _currentStep = currentStep;
    if (currentStep > 0) {
      _currentStep--;
    } else {
      _currentStep = currentStep;
    }

    setCurrentStep(_currentStep);
  };

  const onSelectXP = (xp = "", xpVal) => {
    // let _calculatedXp = (xpVal || 1) * parseInt(live_data_steps[currentStep]?.points)

    const _dataList = [...selectedData];
    let index = _dataList?.indexOf(currentPlayer);
    currentPlayer.xp = xp;
    currentPlayer.xpPoints = 6;
    currentPlayer.xpTimes = xpVal;
    _dataList[index] = currentPlayer;

    dispatch(NHLActions.setLiveNhlData(_dataList));
  };

  const renderSelectedXp = () => {
    if (xp === CONSTANTS.XP.xp1_5) return <XP1_5_1 />;
    else if (xp === CONSTANTS.XP.xp2) return <XP2Icon_1 />;
    else if (xp === CONSTANTS.XP.xp3) return <XP3_1 />;

    return <XPIcon size={24} />;
  };

  const renderXp = () =>
    !hasText(category, "team d") && (
      <ToolTip
        toolTipContent={
          <div className={classes.tool_tip_xp}>
            <span onClick={() => onSelectXP(CONSTANTS.XP.xp1_5, 1.5)}>
              <XP1_5 />
            </span>
            <span onClick={() => onSelectXP(CONSTANTS.XP.xp2, 2)}>
              <XP2Icon />
            </span>
            <span onClick={() => onSelectXP(CONSTANTS.XP.xp3, 3)}>
              <XP3 />
            </span>
          </div>
        }
      >
        <div className={classes.state_xp}>{renderSelectedXp()}</div>
      </ToolTip>
    );

  return (
    <>
      <div className={classes.container_body_card} style={style} key={id}>
        <div className={classes.container_card_header}>
          <div
            className={`
                    ${classes.container_card_header_left} 
                    ${hasText(category, "Team") && classes.teamD}
                    `}
          >
            <span className={classes.header_line_bar} />
            {currentPlayer?.player?.type || 'D'}
          </div>
          <div className={classes.container_card_header_right}>
            <p>
              {teamA} vs <span className={classes.teamB}>{teamB}</span>
            </p>
          </div>
        </div>
        <div
          className={`${classes.container_card_body} 
            ${compressed ? classes.compressed : classes.height}`}
        >
          <div className={classes.container_card_title}>
            <div className={classes.card_title_left}>
              {isStarPlayer && <img src={PowerPlayIcon} alt="" />}
              <p className={classes.container_selected_p}>{currentPlayer?.player?.name || currentPlayer?.team_d_mlb_team?.name}</p>
            </div>
            {!hasText(category, "team d") && (
              <div className={classes.card_title_right}>
                <ReplaceAllIcon
                  style={{ height: "auto" }}
                  size={24}
                // onClick={toggleReplaceModal}
                />
              </div>
            )}
          </div>
          <div className={classes.divider} />
          {live_data_steps?.length ? (
            <div className={classes.card_state_main_container}>
              {
                <>
                  {currentStep === 0 && (
                    <div className={classes.states_points}>
                      <div className={classes.states_points_top}>
                        <div className={classes.states_points_left}>
                          <p>Stats</p>
                          <div>
                            <span>
                              SOG: {live_data_steps[currentStep]?.states.sog}
                            </span>
                            <div>
                              <span>
                                G: {live_data_steps[currentStep]?.states.g}
                              </span>
                              <span className={classes.separater} />
                              <span>
                                A: {live_data_steps[currentStep]?.states.a}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${classes.states_points_right} ${hasText(category, "team d") && classes.width
                            }`}
                        >
                          <p className={classes.states_xp_times}>
                            {xpTimes && `${xpTimes}x`} Points
                            {xpTimes && <span>01:30</span>}
                          </p>
                          <div className={`${classes.points_right_1}`}>
                            <span>{xpPoints || 6}</span>
                            {renderXp()}
                          </div>
                        </div>
                        {hasText(category, "team d") && (
                          <div className={classes.team_d}>
                            <VideoIcon />
                            <ShieldIcon size={24} />
                          </div>
                        )}
                      </div>

                      <div className={classes.states_points_center}>
                        <div>
                          <p
                            className={`${classes.p_1} ${hasText(
                              live_data_steps[currentStep].type,
                              "D-Wall"
                            ) && classes.d_wall
                              } 
                                                    ${hasText(
                                live_data_steps[
                                  currentStep
                                ].type,
                                "ice"
                              )
                                ? classes.bg_s
                                : hasText(
                                  live_data_steps[
                                    currentStep
                                  ].type,
                                  "bench"
                                )
                                  ? classes.bg_p
                                  : hasText(
                                    live_data_steps[
                                      currentStep
                                    ].type,
                                    "D-Wall"
                                  )
                                    ? classes.bg_b
                                    : classes.bg_n
                              }`}
                          >
                            {live_data_steps[currentStep]?.type}
                          </p>
                          {!compressed && (
                            <div
                              className={classes.container_card_body_top_main}
                            >
                              <div
                                className={`${classes.container_card_body_top
                                  } ${hasText(category, "team d") &&
                                  classes.margin_bottom
                                  }`}
                              >
                                <div>
                                  <ClockIcon />
                                  <span> P1 | 12:59</span>
                                </div>
                                {hasText(category, "team d") && (
                                  <p
                                    className={`${classes.container_card_body_top} ${classes.zero_margin}`}
                                  >
                                    G: F. Anderson | .920
                                  </p>
                                )}
                              </div>
                              <p className={classes.p_2}>
                                {live_data_steps[currentStep]?.value}
                              </p>
                            </div>
                          )}
                        </div>
                        {!compressed && <p>Opp. G: P. Roy .976</p>}
                      </div>
                    </div>
                  )}
                  {!compressed && currentStep === 1 && (
                    <div className={classes.points_summary}>
                      <p className={classes.points_summary_title}>
                        Points Summary
                      </p>
                      <div className={classes.points_summary_1}>
                        <div className={classes.points_summary_h}>
                          <span>Time</span>
                          <span>Type</span>
                          <span>Power</span>
                          <span>Pts</span>
                        </div>
                        <div
                          className={`${classes.points_summary_b} 
                                                        ${live_data_steps[
                              currentStep
                            ]?.step?.length > 4
                              ? classes.overflow
                              : ""
                            }`}
                        >
                          {live_data_steps[currentStep]?.step &&
                            live_data_steps[currentStep]?.step?.length &&
                            live_data_steps[currentStep]?.step?.map(
                              (itm, indx) => (
                                <div>
                                  <span>{itm?.p1}</span>
                                  <span>{itm?.type}</span>
                                  <span>
                                    {itm?.power === "" ? "-" : itm?.power}
                                  </span>
                                  <span>{itm?.pts}</span>
                                </div>
                              )
                            )}
                        </div>
                        <div className={classes.summary_total_pts}>
                          Total Points:{" "}
                          {live_data_steps[currentStep]?.totalPoints}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              }

              {!compressed && live_data_steps?.length ? (
                <div className={classes.card_footer_arrow}>
                  {currentStep > 0 ? (
                    <>
                      <div onClick={backStep} className={classes.footer_back}>
                        Back
                      </div>
                      <div className={classes.left_align}>
                        <span
                          className={`${classes.arrow} ${classes.left}`}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={nextStep}
                        className={classes.card_details}
                      >
                        Details
                      </div>
                      <span className={`${classes.arrow} ${classes.right}`} />
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <p
              className={`
                            ${classes.container_body_card_state} 
                            ${classes.card_state_no_data} 
                            ${isSelected ? classes.active : ""}`}
            >
              No Data
            </p>
          )}
        </div>
      </div>

    </>
  );
}

SportsSavedPlayerCard.propTypes = {
  item: PropTypes.object,
  style: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  compressed: PropTypes.bool,

  selected: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onSelectDeselect: PropTypes.func,
};

export default SportsSavedPlayerCard;
