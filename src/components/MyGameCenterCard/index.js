import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
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
import PowersAvailable from "../PowerCenterMobileCard/PowersAvailable";
import PrizeGrid from "../PowerCenterMobileCard/PrizeGrid";
import TeamRoster from "../PowerCenterCardDetails/TeamRoster";
import Pitchers from '../PowerCenterMobileCard/Pitcher';
import PowerLearnMoreModal from "./PowerLearnMoreModal";
import { socket } from "../../config/server_connection";
import { CONSTANTS } from "../../utility/constants";
import ContestRules from "../PowerCenterCardDetails/ContestRules";
import * as MLBActions from "../../actions/MLBActions";
import { isEmpty } from "lodash";
import { printLog, redirectTo } from "../../utility/shared";

import * as MLbActions from "../../actions/MLBActions";
import { useDispatch, useSelector } from "react-redux";
const MyGameCenterCard = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    ON_ROOM_SUB,
    ON_ROOM_UN_SUB,
    EMIT_ROOM,
    ON_POWER_APPLIED,
    ON_GLOBAL_RANKING_REQUEST,
    ON_FANTASY_LOGS_REQUEST,
    GET_GLOBAL_RANKING,
    MATCH_UPDATE,
    GLOBAL_RANKING,
    FANTASY_TEAM_UPDATE,
  } = CONSTANTS.SOCKET_EVENTS.MLB.LIVE;
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
    game_id = 0,
    currency = "USD",
  } = props || {};

  const [ranks, setRanks] = React.useState({
    ranking: 0, score: 0, game_id: 0, team_id: 0
  });

  let _socket = null;

  React.useEffect(() => {
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
  React.useEffect(() => {
    if (_socket) {
      onSocketEmit(game_id, localStorage.PERSONA_USER_ID);
      onSocketListen();
    }
  }, [_socket]);
  //All Emit Events
  const onSocketEmit = (gameId, userId) => {
    _socket.emit(ON_ROOM_SUB, {
      gameId: gameId,
      userId: userId,
    });


  };

  //All listen events
  const onSocketListen = () => {
    //fetch data first time
    _socket?.on(EMIT_ROOM, (res) => {
      const {
        power_dfs_team_rankings = []
      } = res?.data || {};

      // const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
      // if (players && players?.length) {
      //   getPlayers(players, teamD);
      // }

      // const _gameLogs = [...game_logs];
      // const sortedGameLogs = _gameLogs.sort(
      //   (a, b) =>
      //     new Date(a?.play?.created_at).getTime() -
      //     new Date(b?.play?.created_at).getTime()
      // );

      // dispatch(MLBActions.setGameLogs(sortedGameLogs));
      // setLoading(false);
    });

    //MATCH_UPDATE




  };
  const getRank = (game_id) => {

  }

  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [powerLearnMoreModal, setPowerLearnMoreModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onLeaveClick = async () => {

    setIsLoading(true);
    let user_id = localStorage.PERSONA_USER_ID;

    if (game_id && user_id) {

      const res = await dispatch(MLBActions.leaveGame(user_id, game_id));
      if (res) {
        window.location.reload();
      }
      setIsLoading(false);
    }
  }

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
                    {ranks.ranking} <span>Your Current Rank</span>
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
                      title="Edit Picks"
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

              {/* today */}
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
                {/* <PrizeGrid
                  getBackgroundImageWithStyle={getBackgroundImageWithStyle()}
                  PrizePayout={PrizePayout}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                /> */}
                <ContestRules game_set_start={game_set_start} prize={prize} powers={Power} points={PointsSystem} isMobileGameCenter={true} showDateTime={false} />
              </>
              {/* today */}

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
                  game_set_start={game_set_start}
                  start_time={start_time}
                  showDateTime={false}
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
                  game_set_start={game_set_start} start_time={start_time}
                  showDateTime={false}
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
                  showDateTime={false}
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
                <Pitchers title={title} PointsSystem={PointsSystem} game_set_start={game_set_start} start_time={start_time} showDateTime={false} />
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
              onLeave={() => onLeaveClick()}
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
                  Your Current Rank: {ranks.ranking}
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
                <div style={{ marginTop: 5 }}>
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
                <div style={{ marginTop: 5 }}>
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

              <div>
                <span style={{
                  marginLeft: 25,
                  color: "#688fbd",
                  fontSize: 14
                }}>{game_id}</span>
              </div>

              <div className={classes.__my_game_center_card_details}>
                {completed ? (
                  <div
                    className={classes.__my_game_center_card_details_link}
                    onClick={() => onViewResults(id, game_id)}
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
                gameId={game_id}
                game_set_start={game_set_start}
                start_time={start_time}
                prize={prize}
                currency={currency}
              />
            )}
            {leaveGameModal && (
              <LeaveGameModal
                title={title}
                onCancel={() => setLeaveGameModal(false)}
                onLeave={() => onLeaveClick()}
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
