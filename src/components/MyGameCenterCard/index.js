import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import classes from "./myGameCenterCard.module.scss";
import MLBPlayer from "../../assets/mlb-player.png";
import NFLPlayer from "../../assets/nfl-player.png";
import NBAPlayer from "../../assets/nba-player.png";
import NHLPlayer from "../../assets/nhl-player.png";
import MLBPlayerMobile from "../../assets/mlb-player-mobile.png";
import NFLPlayerMobile from "../../assets/nfl-player-mobile.png";
import NBAPlayerMobile from "../../assets/nba-player-mobile.png";
import NHLPlayerMobile from "../../assets/nhl-player-mobile-left.png";
import BlueTick from "../../assets/blue_tick.png";
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

import * as MLbActions from "../../actions/MLBActions";
import { useDispatch, useSelector } from "react-redux";
const MyGameCenterCard = (props) => {
  const dispatch = useDispatch();
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
    editPicks = false,
    makePicks = false,
    timeToStart = "",
    viewResults = false,
    finalStandingsModal = false,
    game_set_start = "",
    start_time = "",
    PointsSystem = [],
    Power = [],
    PrizePayout = [],
    onDetailsClick = () => { },
    onBackClick = () => { },
    onNextClick = () => { },
    onEnter = () => { },
    onEdit = () => { },
    onViewResults = () => { },
    onViewResultsBack = () => { },
    onFinalStandings = () => { },
    game_id = 0
  } = props || {};

  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [powerLearnMoreModal, setPowerLearnMoreModal] = useState(false);

  const [isCompleted, setCompleted] = React.useState(0);

  // React.useEffect(async () => {
  //   const response = await dispatch(
  //     MLbActions.mlbData2(game_id)
  //   );
  //   console.log("response", response);
  //   setCompleted(response.completed);
  //   console.log("game_id", game_id);
  // },[game_id]);

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
      border: inProgress ? "1px solid #214f24" : "1px solid #17181a",
      backgroundColor: "#17181a",
      // backgroundSize: "auto"
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "180px -10px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "175px 0px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "35px -10px";
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "185px 30px";
    }
    return backgroundImageStyle;
  };

  return (
    <>
      {isMobile ? (
        <>
          <div
            className={`${classes.__my_game_center_card_mobile} w-100`}
            style={getBackgroundImageWithStyleMobile()}
          >
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              autoPlay={false}
              infiniteLoop={false}
              interval={300000}
            >
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
                      <div className={classes.__completed}>Completed</div>
                    </div>
                  )}

                  <div
                    style={{
                      padding: !inProgress && !completed && "10px 20px",
                    }}
                  >
                    <div className={classes.__my_game_center_card_date_time}>
                      {game_set_start} | {start_time} ET
                    </div>
                    {/* {inProgress || completed || timeToStart != "" ? ( */}
                    {total == outOf ? (
                      <div className={classes.__my_game_center_card_full}>
                        <div className={classes.__my_game_center_card_full_img}>
                          <img src={BlueTick} width="18" height="18" alt="" />
                        </div>
                        <div
                          className={classes.__my_game_center_card_full_text}
                        >
                          Full {<CurrencyFormat
                            value={total}
                            displayType={"text"}
                            thousandSeparator={true}
                            thousandSeparator={total >= 10000 ? true : false}
                            renderText={(value) => value}
                          />}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div
                  className={classes.__my_game_center_card_powerdfs}
                  style={{ marginTop: inProgress || !completed ? -3 : 10 }}
                >
                  <div className={classes.__my_game_center_card_powerdfs_title}>
                    <p>
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
                </div>

                <div className={classes.__my_game_center_card_prize_pool}>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_price
                    }
                  >
                    <CurrencyFormat
                      value={prize}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSeparator={prize >= 10000 ? true : false}
                      prefix={"$"}
                      renderText={(value) => <div>{value}</div>}
                    />
                    {/* ${prize} */}
                  </p>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_text
                    }
                  >
                    {inProgress ? "Currently Winning" : "Prize Pool1"}
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
                <div
                  className={`${classes.__my_game_center_card_buttons} d-flex align-items-center justify-content-between`}
                >
                  {!completed && (
                    <OutlineButton
                      title="Team Manager"
                      onClick={onEnter}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                      }}
                    />
                  )}

                  {editPicks && (
                    <OutlineButton
                      title="Edit Picks1"
                      onClick={onEdit}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                      }}
                    //   icon={<img src={PencilIcon} width="16px" height="16px" />}
                    />
                  )}

                  {makePicks && (
                    <OutlineButton
                      title="Make Picks"
                      onClick={onEnter}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                      }}
                    />
                  )}

                  {completed && (
                    <OutlineButton
                      title="Final Standings"
                      onClick={() => onFinalStandings(id)}
                      styles={{
                        marginTop: 14,
                        margin: ".25rem",
                        fontSize: "12px",
                      }}
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
                  getBackgroundImageWithStyle={getBackgroundImageWithStyle()}
                  PrizePayout={PrizePayout}
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
                  Power={Power}
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
                  PointsSystem={PointsSystem}
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
              {/* {userGames?.game?.game_set_end} | {userGames?.game?.start_time} ET */}
            </div>
            <div className={classes.__my_game_center_card_prize_pool}>
              <p
                className={
                  classes.__my_game_center_card_prize_pool_common +
                  " " +
                  classes.__my_game_center_card_prize_pool_price
                }
              >
                <CurrencyFormat
                  value={prize}
                  displayType={"text"}
                  thousandSeparator={prize >= 10000 ? true : false}
                  prefix={"$"}
                  renderText={(value) => <div>{value}</div>}
                />
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
              {!completed && (
                <OutlineButton title="Team Manager" onClick={onEnter} />
              )}

              {editPicks && (
                <OutlineButton
                  title="Edit Picks"
                  onClick={onEdit}
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

              {!completed && (
                <div style={{marginTop: 5}}>
                    {game_set_start} | {start_time} ET
                </div>
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
              {completed && (
                <div style={{marginTop: 5}}>
                    {game_set_start} | {start_time} ET
                </div>
              )}
            </div>
            <div className={classes.__my_game_center_card_status_and_details}>
              {/* {inProgress || completed || timeToStart != "" ? ( */}
              {total == outOf ? (

                <div className={classes.__my_game_center_card_full}>
                  <div className={classes.__my_game_center_card_full_img}>
                    <img src={BlueTick} width="18" height="18" alt="" />
                  </div>
                  <div className={classes.__my_game_center_card_full_text}>
                    Full <CurrencyFormat
                      value={total}
                      displayType={"text"}
                      thousandSeparator={total >= 10000 ? true : false}
                      renderText={(value) => value}
                    />
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
        <>
          <PowerCenterCardDetails
            Power={Power}
            PrizePayout={PrizePayout}
            PointsSystem={PointsSystem}
            title={title}
            onBackClick={() => onBackClick()}
            onNextClick={() => onNextClick()}
            myGameCenter={true}
            game_set_start={game_set_start}
            prize={(prize)}
          />
        </>
      )}
    </>
  );
};

export default MyGameCenterCard;
