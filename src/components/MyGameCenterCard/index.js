import React, { useState } from "react";
import classes from "./myGameCenterCard.module.scss";
import MLBPlayer from "../../assets/mlb-player.png";
import NFLPlayer from "../../assets/nfl-player.png";
import NBAPlayer from "../../assets/nba-player.png";
import NHLPlayer from "../../assets/nhl-player.png";
import BlueTick from "../../assets/blue_tick.png";
import PencilIcon from "../../assets/pencil_icon.png";
import PowerCenterCardDetails from "../PowerCenterCardDetails";
import OutlineButton from "../OutlineButton";
import ViewResults from "../../pages/MyGameCenter/ViewResults";
import FinalStandingsModal from "./FinalStandingsModal";
import LeaveGameModal from "./LeaveGameModal";
import { Carousel } from "react-responsive-carousel";
import PointSystem from "../PowerCenterCardDetails/PointSystem";
import PowersAvailable from "../PowerCenterCardDetails/PowersAvailable";
import PrizeGrid from "../PowerCenterCardDetails/PrizeGrid";
import TeamRoster from "../PowerCenterCardDetails/TeamRoster";
import PowerLearnMoreModal from "./PowerLearnMoreModal";
import Hitters from "../PowerCenterCardDetails/Hitters";

const MyGameCenterCard = (props) => {
  const {
    isMobile = false,
    id = null,
    title = "",
    prize = null,
    outOf = null,
    total = null,
    percent = null,
    showDetails = false,
    inProgress = false,
    completed = false,
    teamManager = false,
    editPicks = false,
    makePicks = false,
    timeToStart = "",
    viewResults = false,
    finalStandingsModal = false,
    onDetailsClick = () => { },
    onBackClick = () => { },
    onNextClick = () => { },
    onEnter = () => { },
    onViewResults = () => { },
    onViewResultsBack = () => { },
    onFinalStandings = () => { },
  } = props || {};

  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [powerLearnMoreModal, setPowerLearnMoreModal] = useState(false);

  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      border: inProgress && "1px solid #214f24",
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayer})`;
      backgroundImageStyle.backgroundPosition = "-46px 18px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      backgroundImageStyle.backgroundPosition = "65px 60px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      backgroundImageStyle.backgroundPosition = "-75px 68px";
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
      backgroundImageStyle.backgroundPosition = "36px 106px";
    }
    return backgroundImageStyle;
  };

  const getBackgroundImageWithStyleMobile = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      border: inProgress ? "1px solid #214f24" : "1px solid #000",
      backgroundColor: "#000",
      // background: !inProgress && "#000",
      // zIndex: 2,
      // opacity: "0.6",
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayer})`;
      backgroundImageStyle.backgroundPosition = "110px -40px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      backgroundImageStyle.backgroundPosition = "120px -15px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      backgroundImageStyle.backgroundPosition = "-20px -35px";
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
      backgroundImageStyle.backgroundPosition = "180px 0px";
    }
    return backgroundImageStyle;
  };

  return (
    <>
      {isMobile ? (
        <>
          <div
            className={classes.__my_game_center_card_mobile}
            style={getBackgroundImageWithStyleMobile()}
          >
            <Carousel showArrows={false} showStatus={false} autoPlay={false}>
              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      padding: !inProgress && !completed && "10px 20px",
                    }}
                  >
                    <div className={classes.__my_game_center_card_date_time}>
                      Oct 24, 2020 | 8:00PM ET
                    </div>
                    {inProgress || completed || timeToStart != "" ? (
                      <div className={classes.__my_game_center_card_full}>
                        <div className={classes.__my_game_center_card_full_img}>
                          <img src={BlueTick} width="18" height="18" />
                        </div>
                        <div
                          className={classes.__my_game_center_card_full_text}
                        >
                          Full 200,000
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div
                  className={classes.__my_game_center_card_powerdfs}
                  style={{ marginTop: inProgress || !completed ? -3 : 10 }}
                >
                  <p className={classes.__my_game_center_card_powerdfs_title}>
                    <span
                      className={
                        classes.__my_game_center_card_powerdfs_title_first
                      }
                    >
                      {title}
                    </span>{" "}
                    PowerdFS
                  </p>
                </div>

                <div className={classes.__my_game_center_card_prize_pool}>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_price
                    }
                  >
                    ${prize}
                  </p>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_text
                    }
                  >
                    {inProgress ? "Currently Winning" : "Prize Pool"}
                  </p>
                </div>

                {inProgress || completed || timeToStart != "" ? null : (
                  <div className={classes.__my_game_center_card_total}>
                    <p>
                      {outOf} of <span>{total}</span>
                    </p>
                  </div>
                )}

                {timeToStart && (
                  <div
                    className={
                      classes.__my_game_center_card_buttons_time_to_start
                    }
                  >
                    {timeToStart}
                  </div>
                )}
                {inProgress && (
                  <div
                    className={
                      classes.__my_game_center_card_buttons_your_current_rank
                    }
                  >
                    240,051 <span>Your Current Rank</span>
                  </div>
                )}
                <div className={classes.__my_game_center_card_buttons}>
                  {teamManager && (
                    <OutlineButton
                      title="Team Manager"
                      onClick={onEnter}
                      styles={{ width: "140px", fontSize: "14px" }}
                    />
                  )}

                  {editPicks && (
                    <OutlineButton
                      title="Edit Picks"
                      onClick={onEnter}
                      styles={{ width: "140px", fontSize: "14px" }}
                    //   icon={<img src={PencilIcon} width="16px" height="16px" />}
                    />
                  )}

                  {makePicks && (
                    <OutlineButton
                      title="Make Picks"
                      onClick={onEnter}
                      styles={{ width: "140px", fontSize: "14px" }}
                    />
                  )}

                  {completed && (
                    <OutlineButton
                      title="Final Standings"
                      onClick={() => onFinalStandings(id)}
                      styles={{ marginTop: 14 }}
                    />
                  )}
                </div>
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PrizeGrid
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                />
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PowersAvailable
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                  learnMore={() => setPowerLearnMoreModal(true)}
                />
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PointSystem
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                />
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <TeamRoster
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                />
              </>
            </Carousel>
          </div>
          {leaveGameModal && (
            <LeaveGameModal
              isMobile={isMobile}
              title={title}
              onCancel={() => setLeaveGameModal(false)}
            />
          )}
          {powerLearnMoreModal && (
            <PowerLearnMoreModal
              isMobile={isMobile}
              title={title}
              onCancel={() => setPowerLearnMoreModal(false)}
            />
          )}
        </>
      ) : !showDetails ? (
        !viewResults ? (
          <div
            className={classes.__my_game_center_card}
            style={getBackgroundImageWithStyle()}
          >
            {inProgress && (
              <div className={classes.__my_game_center_card_in_progress}>
                <div className={classes.__in_progress}>
                  <span></span>In Progress
                </div>
              </div>
            )}
            {!completed && !inProgress && (
              <div
                className={classes.__close_icon}
                onClick={() => setLeaveGameModal(true)}
              >
                x
              </div>
            )}
            <div
              className={classes.__my_game_center_card_powerdfs}
              style={{ marginTop: inProgress || !completed ? -3 : 10 }}
            >
              <span
                className={
                  classes.__my_game_center_card_powerdfs_hr +
                  " " +
                  classes.__my_game_center_card_powerdfs_hr_left
                }
              ></span>
              <p className={classes.__my_game_center_card_powerdfs_title}>
                <span
                  className={classes.__my_game_center_card_powerdfs_title_first}
                >
                  {title}
                </span>{" "}
                PowerdFS
              </p>
              <span
                className={
                  classes.__my_game_center_card_powerdfs_hr +
                  " " +
                  classes.__my_game_center_card_powerdfs_hr_right
                }
              ></span>
            </div>
            <div className={classes.__my_game_center_card_date_time}>
              Oct 24, 2020 | 8:00PM ET
            </div>
            <div className={classes.__my_game_center_card_prize_pool}>
              <p
                className={
                  classes.__my_game_center_card_prize_pool_common +
                  " " +
                  classes.__my_game_center_card_prize_pool_price
                }
              >
                ${prize}
              </p>
              <p
                className={
                  classes.__my_game_center_card_prize_pool_common +
                  " " +
                  classes.__my_game_center_card_prize_pool_text
                }
              >
                {inProgress ? "Currently Winning" : "Prize Pool"}
              </p>
            </div>
            <div className={classes.__my_game_center_card_buttons}>
              {timeToStart && (
                <div
                  className={
                    classes.__my_game_center_card_buttons_time_to_start
                  }
                >
                  {timeToStart}
                </div>
              )}

              {inProgress && (
                <div
                  className={
                    classes.__my_game_center_card_buttons_your_current_rank
                  }
                >
                  Your Current Rank: 240,051
                </div>
              )}
              {teamManager && (
                <OutlineButton title="Team Manager" onClick={onEnter} />
              )}

              {editPicks && (
                <OutlineButton
                  title="Edit Picks"
                  onClick={onEnter}
                  styles={{ color: "#f2f2f2", marginTop: 14 }}
                //   icon={<img src={PencilIcon} width="16px" height="16px" />}
                />
              )}

              {makePicks && (
                <OutlineButton
                  title="Make Picks"
                  onClick={onEnter}
                  styles={{ color: "#f2f2f2" }}
                />
              )}

              {completed && (
                <div
                  className={classes.__my_game_center_card_buttons_completed}
                >
                  COMPLETED
                </div>
              )}

              {completed && (
                <OutlineButton
                  title="Final Standings"
                  onClick={() => onFinalStandings(id)}
                  styles={{ marginTop: 14 }}
                />
              )}
            </div>
            <div className={classes.__my_game_center_card_status_and_details}>
              {inProgress || completed || timeToStart != "" ? (
                <div className={classes.__my_game_center_card_full}>
                  <div className={classes.__my_game_center_card_full_img}>
                    <img src={BlueTick} width="18" height="18" />
                  </div>
                  <div className={classes.__my_game_center_card_full_text}>
                    Full 200,000
                  </div>
                </div>
              ) : (
                <div className={classes.__my_game_center_card_total}>
                  <p>
                    {outOf} of <span>{total}</span>
                  </p>
                </div>
              )}

              <div className={classes.__my_game_center_card_details}>
                {completed ? (
                  <div
                    className={classes.__my_game_center_card_details_link}
                    onClick={() => onViewResults(id)}
                  >
                    Winners
                  </div>
                ) : (
                  <div
                    className={classes.__my_game_center_card_details_link}
                    onClick={() => onDetailsClick(id)}
                  >
                    Details
                  </div>
                )}
                <div
                  className={
                    classes.__my_game_center_card_details_link_forward_arrow
                  }
                >
                  {">"}
                </div>
              </div>
            </div>
            {finalStandingsModal && (
              <FinalStandingsModal
                isVisible={finalStandingsModal}
                onClose={() => onFinalStandings(-1)}
              />
            )}
            {leaveGameModal && (
              <LeaveGameModal
                title={title}
                onCancel={() => setLeaveGameModal(false)}
              />
            )}
          </div>
        ) : (
          <ViewResults
            title={title}
            onViewResultsBack={() => onViewResultsBack()}
          />
        )
      ) : (
        <PowerCenterCardDetails
          title={title}
          onBackClick={() => onBackClick()}
          onNextClick={() => onNextClick()}
          myGameCenter={true}
        />
      )}
    </>
  );
};

export default MyGameCenterCard;
