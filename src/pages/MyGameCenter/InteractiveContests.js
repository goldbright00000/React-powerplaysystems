/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import classes from "./interactiveContests.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as CryptoJS from "crypto-js";
import { setUserBalance } from "../../actions/userActions";
import Ball from "../../icons/Ball";
import BasketBall from "../../icons/BasketBall";
import Hockeys from "../../icons/Hockeys";
import SuperBall from "../../icons/SuperBall";
import CashPowerBalance from "../../components/CashPowerBalance";
import OffSeasonComponent from "../../components/OffSeasonComponent";
import {
  redirectTo,
  getDaysFromToday,
  setLocalStorage,
  getLocalStorage,
} from "../../utility/shared";
import CustomDropDown from "../../components/CustomDropDown";
import MyGameCenterCard from "../../components/MyGameCenterCard";
import { URLS } from "../../config/urls";
import http from "../../config/http";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import * as MLbActions from "../../actions/MLBActions";
import * as NFLActions from "../../actions/NFLActions";
import * as NHLActions from "../../actions/NHLActions";
import _ from "underscore";
import moment from "moment";
import moment1 from "moment-timezone";
import * as MLBActions from "../../actions/MLBActions";
import { Link } from "react-router-dom";

import { CONSTANTS } from "../../utility/constants";

// TODO: GET GAMES OF USER FOR WHICH THEY HAVE PAID AND THEN MAKE IT DYNAMIC

const myGameCenterCardData1 = [
  {
    id: 1,
    title: "MLB",
    prize: "5,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/mlb-select-team",
    inProgress: true,
    completed: false,
    teamManager: true,
    editPicks: true,
    makePicks: false,
    timeToStart: "",
  },
  {
    id: 2,
    title: "NFL",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    inProgress: false,
    completed: false,
    teamManager: false,
    editPicks: false,
    makePicks: true,
    timeToStart: "",
    url: "/nfl-select-team",
  },
];

const filters = [
  {
    id: 1,
    title: "SHOW ALL",
    icon: "",
  },
  {
    id: 2,
    title: "NFL",
    icon: <SuperBall />,
  },
  {
    id: 3,
    title: "NBA",
    icon: <BasketBall />,
  },
  {
    id: 4,
    title: "MLB",
    icon: <Ball />,
  },
  {
    id: 5,
    title: "NHL",
    icon: <Hockeys />,
  },
];

const contentTypes = [
  {
    label: "All Active",
    value: "All Active",
  },
  {
    label: "Not Started",
    value: "Not Started",
  },
  {
    label: "In Progress",
    value: "In Progress",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];

const InteractiveContests = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  const dispatch = useDispatch();
  const [isMobileDevice, setMobileDevice] = useState(false);
  const responsiveHandler = (maxWidth) => setMobileDevice(maxWidth.matches);

  const [myGameCenterCardData, setMyGameCenterCardData] = useState([]);
  const [contentType, setContentType] = useState("All Active");
  const [selectedDate, setSelectedDate] = useState(getDaysFromToday()[0].label);
  const [showCardDetails, setShowCardDetails] = useState(-1);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [viewResults, setViewResults] = useState(-1);
  const [balance, setBalance] = useState({});
  const [finalStandingsModal, setFinalStandingsModal] = useState(-1);
  const [days, setDays] = useState([{}]);
  const { user } = useSelector((state) => state?.auth);
  const [userGames, setUserGames] = useState({});
  const { getUserSavedGames } = useSelector((state) => state?.mlb);

  const applyFilter = (type) => {
    setContentType(type);
  };
  useEffect(() => {
    const maxWidth = window.matchMedia("(max-width: 1200px)");
    responsiveHandler(maxWidth);
    maxWidth.addEventListener("change", responsiveHandler);
    return () => maxWidth.removeEventListener("change", responsiveHandler);
  }, []);

  // useEffect(() => {
  //   setFilteredData(myGameCenterCardData);
  //   setDays(getDaysFromToday());
  //   getUserBalance();
  // }, []);

  useEffect(() => {
    const user_id = getLocalStorage("PERSONA_USER_ID");
    dispatch(MLbActions.getUserGames(user_id));
  }, [dispatch, user]);

  useEffect(() => {
    setMyGameCenterCardData(getUserSavedGames);
    setFilteredData(getUserSavedGames);
    setDays(getDaysFromToday());
    getUserBalance();
    setUserGames(getUserSavedGames);
  }, [getUserSavedGames]);

  const getUserBalance = async () => {
    const response = await http.get(URLS.USER.BALANCE);
    dispatch(setUserBalance(response.data));
    setBalance(response.data);
  };

  const onEdit = async (item) => {
    switch (item?.game?.league) {
      case "MLB":
        await dispatch(MLbActions.setSelectedTeam(item));
        dispatch(
          MLbActions.getAndSetEditPlayers({
            game_id: item?.game_id,
            sport_id: item?.sport_id,
            user_id: item?.user_id,
          })
        );

        return redirectTo(props, {
          path: `/mlb-select-team`,
          state: {
            // game_id: item?.game_id,
            // game_details: item?.game,
            // Power: item?.game?.Powers

            game_id: item?.game_id,
            sport_id: item?.game?.sports_id,
            start_date: item?.game?.start_date,
            end_date: item?.game?.end_date,
            start_time: item?.game?.start_time,
            outOf: item?.game?.target,
            enrolledUsers: item?.game?.enrolled_users,
            prizePool: _.reduce(
              item?.game?.PrizePayouts,
              function (memo, num) {
                return memo + parseFloat(num.amount) * parseInt(num.prize);
              },
              0
            ),
            topPrize: parseFloat(
              _.max(item?.game?.PrizePayouts, function (ele) {
                return ele.amount;
              }).amount
            ),
            game_set_start: item?.game?.game_set_start,
            PointsSystem: item?.game?.PointsSystems,
            Power: item?.game?.Powers,
            prizes: item?.game?.PrizePayouts,
            paid_game: item?.game?.is_game_paid,
            entry_fee: item?.game?.entry_fee,
            currency: item?.game?.currency,
          },
        });

      case "NFL":
        await dispatch(NFLActions.setSelectedTeam(item));
        dispatch(
          NFLActions.getAndSetEditPlayers({
            game_id: item?.game_id,
            sport_id: item?.sport_id,
            user_id: item?.user_id,
          })
        );

        return redirectTo(props, {
          path: `/nfl-select-team`,
          state: {
            // game_id: item?.game_id,
            // game_details: item?.game,
            // Power: item?.game?.Powers

            game_id: item?.game_id,
            sport_id: item?.game?.sports_id,
            start_date: item?.game?.start_date,
            end_date: item?.game?.end_date,
            start_time: item?.game?.start_time,
            outOf: item?.game?.target,
            enrolledUsers: item?.game?.enrolled_users,
            prizePool: _.reduce(
              item?.game?.PrizePayouts,
              function (memo, num) {
                return memo + parseFloat(num.amount) * parseInt(num.prize);
              },
              0
            ),
            topPrize: parseFloat(
              _.max(item?.game?.PrizePayouts, function (ele) {
                return ele.amount;
              }).amount
            ),
            game_set_start: item?.game?.game_set_start,
            PointsSystem: item?.game?.PointsSystems,
            Power: item?.game?.Powers,
            prizes: item?.game?.PrizePayouts,
            paid_game: item?.game?.is_game_paid,
            entry_fee: item?.game?.entry_fee,
            currency: item?.game?.currency,
          },
        });

      case "NHL":
        await dispatch(NHLActions.setSelectedTeam(item));
        dispatch(
          NHLActions.getAndSetEditPlayers({
            game_id: item?.game_id,
            sport_id: item?.sport_id,
            user_id: item?.user_id,
          })
        );
        let tempPowers = [
          {
            id: 2667,
            PowerDfsGameId: 937,
            select: true,
            powerId: 3,
            powerName: "3x Point Booster",
            available: null,
            amount: "3",
            SocialMediaUnlock: false,
            createdAt: "2021-11-02T02:25:12.000Z",
            updatedAt: "2021-11-02T02:25:12.000Z",
          },
          {
            id: 2666,
            PowerDfsGameId: 937,
            select: true,
            powerId: 2,
            powerName: "2x Point Booster",
            available: null,
            amount: "3",
            SocialMediaUnlock: false,
            createdAt: "2021-11-02T02:25:12.000Z",
            updatedAt: "2021-11-02T02:25:12.000Z",
          },
          {
            id: 2665,
            PowerDfsGameId: 937,
            select: true,
            powerId: 8,
            powerName: "Power-Up",
            available: null,
            amount: "3",
            SocialMediaUnlock: false,
            createdAt: "2021-11-02T02:25:12.000Z",
            updatedAt: "2021-11-02T02:25:12.000Z",
          },
          {
            id: 2664,
            PowerDfsGameId: 937,
            select: true,
            powerId: 7,
            powerName: "Retro Boost",
            available: null,
            amount: "3",
            SocialMediaUnlock: false,
            createdAt: "2021-11-02T02:25:12.000Z",
            updatedAt: "2021-11-02T02:25:12.000Z",
          },
          {
            id: 2668,
            PowerDfsGameId: 937,
            select: true,
            powerId: 1,
            powerName: "1.5x Point Booster",
            available: null,
            amount: "3",
            SocialMediaUnlock: false,
            createdAt: "2021-11-02T02:25:12.000Z",
            updatedAt: "2021-11-02T02:25:12.000Z",
          },
        ];
        return redirectTo(props, {
          path: `/nhl-select-team`,
          state: {
            // game_id: item?.game_id,
            // game_details: item?.game,
            // Power: item?.game?.Powers

            game_id: item?.game_id,
            sport_id: item?.game?.sports_id,
            start_date: item?.game?.start_date,
            end_date: item?.game?.end_date,
            start_time: item?.game?.start_time,
            outOf: item?.game?.target,
            enrolledUsers: item?.game?.enrolled_users,
            prizePool: _.reduce(
              item?.game?.PrizePayouts,
              function (memo, num) {
                return memo + parseFloat(num.amount) * parseInt(num.prize);
              },
              0
            ),
            topPrize: parseFloat(
              _.max(item?.game?.PrizePayouts, function (ele) {
                return ele.amount;
              }).amount
            ),
            game_set_start: item?.game?.game_set_start,
            PointsSystem: item?.game?.PointsSystems,
            Power: tempPowers, //item?.game?.Powers,
            prizes: item?.game?.PrizePayouts,
            paid_game: item?.game?.is_game_paid,
            entry_fee: item?.game?.entry_fee,
            currency: item?.game?.currency,
          },
        });
    }
  };

  const onEnter = async (item) => {
    const {
      game = {},
      sport_id,
      team_id,
      userID: user_id,
      gameID: game_id,
    } = item || {};
    const { league = "NHL" } = game || {};
    switch (league) {
      case "MLB":
        const encData = CryptoJS.AES.encrypt(
          JSON.stringify(item),
          CONSTANTS.DATA_ENC_KEY
        ).toString();
        await dispatch(MLbActions.setSelectedTeam(item));
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME, encData);
        return redirectTo(props, { path: "/mlb-live-powerdfs", state: item });
      case "NFL":
        const encData1 = CryptoJS.AES.encrypt(
          JSON.stringify(item),
          CONSTANTS.DATA_ENC_KEY
        ).toString();
        await dispatch(NFLActions.setSelectedTeam(item));
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NFL_LIVE_GAME, encData1);
        return redirectTo(props, { path: "/nfl-live-powerdfs", state: item });
      case "NHL":
        const encData2 = CryptoJS.AES.encrypt(
          JSON.stringify(item),
          CONSTANTS.DATA_ENC_KEY
        ).toString();
        await dispatch(NHLActions.setSelectedTeam(item));
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME, encData2);
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME_ID, game_id);
        return redirectTo(props, { path: "/nhl-live-powerdfs", state: item });
    }
  };

  const getLocalDateTime = (date, time) => {
    const offset = moment1?.tz("America/New_York")?.format("Z");
    const localDateTime = moment
      .utc(date + " " + time, "YYYY-MM-DD hh:mm A")
      .utcOffset(offset)
      .format("YYYY-MM-DD=hh:mm A");

    const splitted = localDateTime.split("=");

    return {
      date: splitted[0],
      time: splitted[1],
    };

    // const localDateTime = moment(moment.utc(date + " " + time, "YYYY-MM-DD hh:mm A").toDate()).format("YYYY-MM-DD=hh:mm A");
    // const splitted = localDateTime.split("=");
    // return {
    //   date: splitted[0],
    //   time: splitted[1],
    // };
  };

  const setFilteredDataWithDate = (selectedOption) => {
    let day = moment(selectedOption).format("YYYY-MM-DD");
    const today = moment();
    let data = [];
    if (selectedOption === "All") {
      setFilteredData(getUserSavedGames);
    } else if (selectedOption === "Today") {
      myGameCenterCardData.map((item) => {
        if (item?.startDate == today.format("YYYY-MM-DD")) {
          data.push(item);
        }
      });
      setFilteredData(data);
    } else {
      myGameCenterCardData.map((item) => {
        if (item?.startDate == day) {
          data.push(item);
        }
      });
      setFilteredData(data);
    }
  };

  const handleViewResult = async (cardId, game_id) => {
    setViewResults(cardId);
    await dispatch(MLBActions.getFinalStandings(game_id));
  };

  const myGameCenterCard = (item, redirectUri, index) => {
    return (
      <div
        className={`${classes.__interactive_contests_power_center_card} col-auto my-2`}
        key={index}
      >
        <MyGameCenterCard
          isMobile={isMobile}
          id={item?.team_id}
          title={"NHL"} //item?.game?.league}
          prize={
            item?.reward.length > 0
              ? _.reduce(
                  item?.reward,
                  function (memo, num) {
                    return memo + parseFloat(num.amount) * parseInt(num.prize);
                  },
                  0
                )
              : 0
          }
          outOf={item?.enrolled_users}
          total={item?.game?.target}
          percent={item?.game?.percent}
          game_type={item?.gameType}
          game_id={item?.gameID}
          game_set_start={
            getLocalDateTime(item?.startDate, item?.startTime)?.date
          }
          start_time={getLocalDateTime(item?.startDate, item?.startTime)?.time}
          PointsSystem={item?.pointSystem}
          Power={item?.powersAvailable}
          PrizePayout={_.sortBy(item?.reward, "from")}
          inProgress={item?.gameStatus === "In-Progress" ? true : false}
          completed={item?.gameStatus === "closed" ? true : false}
          editPicks={item?.gameStatus === "Activated" ? true : false}
          currency={item?.game?.currency}
          makePicks={item.makePicks}
          timeToStart={item.timeToStart}
          showDetails={showCardDetails === item?.team_id}
          viewResults={viewResults === item?.team_id}
          finalStandingsModal={finalStandingsModal === item?.team_id}
          onEnter={() => onEnter(item)}
          onEdit={() => {
            onEdit(item);
          }}
          onDetailsClick={(cardId) => setShowCardDetails(cardId)}
          onBackClick={() => setShowCardDetails(-1)}
          onNextClick={() => setShowCardDetails(-1)}
          onViewResults={(cardId, game_id) => {
            handleViewResult(cardId, game_id);
          }}
          onViewResultsBack={() => setViewResults(-1)}
          onFinalStandings={(cardId) => setFinalStandingsModal(cardId)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="__table-wrapper __mb-6">
        <div className={`${classes.__ic_scroll}`}>
          <div style={{ flex: 1 }}>
            <div
              className="__badges-wrapper __text-in-one-line __mediam filtersTab"
              style={{ display: "flex" }}
            >
              {myGameCenterCardData &&
                filters.map((item, index) => {
                  return (
                    <div
                      className={
                        "__outline-badge __f1 " +
                        (selectedFilter == item.id && "__active")
                      }
                      key={index}
                      style={{ maxWidth: 120 }}
                      onClick={() => {
                        setSelectedFilter(item.id);
                        const filteredData =
                          item.id === 1
                            ? myGameCenterCardData
                            : myGameCenterCardData?.length > 0 &&
                              myGameCenterCardData.filter(
                                (cardItem) =>
                                  //cardItem?.game?.league === item.title
                                  item.title === "NHL"
                              );
                        setFilteredData(filteredData);
                      }}
                    >
                      {item.icon}
                      {item.title}
                    </div>
                  );
                })}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
            {/* <CashPowerBalance 
                            cashBalance={balance.cashBalance}
                            powerBalance={balance.tokenBalance}
                            styles={{ margin: 0, backgroundColor: '#202124', boxShadow: 'none' }} 
                            onDepositClick={() => redirectTo(props, {path: '/my-account'})}
                        /> */}
          </div>
        </div>
        <div className={classes.__interactive_contests_filter}>
          {isMobile ? (
            <div className={classes.__interactive_contests_content_type}>
              <CustomDropDown
                value={contentType}
                options={contentTypes}
                onChange={(selectedOption) => setContentType(selectedOption)}
              />
            </div>
          ) : (
            <>
              <div
                className={
                  contentType === "All Active"
                    ? classes.__interactive_contests_most_popular
                    : classes.__interactive_contests_prize_total
                }
                onClick={() => {
                  applyFilter("All Active");
                }}
              >
                <p>All Active</p>
              </div>
              <div
                className={
                  contentType === "Not Started"
                    ? classes.__interactive_contests_most_popular
                    : classes.__interactive_contests_prize_total
                }
                onClick={() => {
                  applyFilter("Not Started");
                }}
              >
                <p>Not Started</p>
              </div>
              <div
                className={
                  contentType === "In Progress"
                    ? classes.__interactive_contests_most_popular
                    : classes.__interactive_contests_prize_total
                }
                onClick={() => {
                  applyFilter("In Progress");
                }}
              >
                <p>In Progress</p>
              </div>
              <div
                className={
                  contentType === "Completed"
                    ? classes.__interactive_contests_most_popular
                    : classes.__interactive_contests_prize_total
                }
                onClick={() => {
                  applyFilter("Completed");
                }}
              >
                <p>Completed</p>
              </div>
            </>
          )}
          <div className={classes.__interactive_contests_date}>
            <CustomDropDown
              wrapperClassName={classes.__interactive_contests_date_wrapper}
              dropdownClassName={classes.__interactive_contests_date_dropdown}
              value={
                selectedDate === "Today"
                  ? "Today"
                  : selectedDate === "All"
                  ? "All"
                  : moment(selectedDate).format("ddd,MMM DD")
              }
              options={days}
              onChange={(selectedOption) => {
                setSelectedDate(selectedOption);
                setFilteredDataWithDate(selectedOption);
              }}
            />
          </div>
        </div>

        {myGameCenterCardData &&
          (() => {
            if (selectedFilter == 4) {
              return <OffSeasonComponent />;
            }
            const itemsInaRow = 4;
            const numberOfRows = Math.ceil(
              myGameCenterCardData.length / itemsInaRow
            );
            var subFiltered = [];
            if (filteredData.length > 0) {
              filteredData.map(function (power) {
                if (
                  contentType === "In Progress" &&
                  power?.gameStatus === "In-Progress"
                ) {
                  subFiltered.push(power);
                } else if (
                  contentType === "Completed" &&
                  power?.gameStatus === "closed"
                ) {
                  subFiltered.push(power);
                } else if (
                  contentType === "Not Started" &&
                  power?.gameStatus === "Activated"
                ) {
                  subFiltered.push(power);
                } else if (
                  contentType === "All Active" &&
                  power?.gameStatus !== "closed"
                ) {
                  subFiltered.push(power);
                }

                // if (selectedDate === "Today") {
                //   var m = moment().format("YYYY-MM-DD");
                // } else {
                //   var m = moment(
                //     selectedDate + " " + moment().format("YYYY")
                //   ).format("YYYY-MM-DD");
                // }
                // var sDate = m + " 00:00";
                // var eDate = m + " 23:59";
                // var s = power?.game?.start_time;
                // s = "0" + s;
                // s = s.slice(-8);
                // s = s.split(/(?=[A-Z]{2})/).join(" ");
                // var startDate = moment(
                //   power?.game?.start_date + " " + s
                // ).format("YYYY-MM-DD hh:mm A");
                // var endDate = moment(
                //   power?.game?.end_date + " 11:59 PM"
                // ).format("YYYY-MM-DD hh:mm A");
                // var isBetween1 = moment(startDate).isBetween(sDate, eDate);
                // if (contentType === "Completed" || selectedDate === "All") {
                //   isBetween1 = 1;
                // }
                // if (isBetween1) {
                //   var a = false;
                //   if (contentType === "In Progress") {
                //     var a = moment(
                //       moment().format("YYYY-MM-DD hh:mm A")
                //     ).isBetween(
                //       power?.game?.game_set_start +
                //       " " +
                //       power?.game?.start_time,
                //       power?.game?.game_set_end + " 11:59 PM"
                //     );
                //   } else if (contentType === "Completed") {
                //     var a = moment(moment().format("YYYY-MM-DD")).isAfter(
                //       power?.game?.game_set_end
                //     );
                //   } else if (contentType === "Not Started") {
                //     var s = power?.game?.start_time;
                //     s = "0" + s;
                //     s = s.slice(-8);
                //     var a = moment(
                //       moment().format("YYYY-MM-DD hh:mm A")
                //     ).isBefore(power?.game?.game_set_start + " " + s);
                //   } else if (contentType === "All Active") {
                //     var a1 = moment(
                //       moment().format("YYYY-MM-DD hh:mm A")
                //     ).isBetween(
                //       power?.game?.game_set_start +
                //       " " +
                //       power?.game?.start_time,
                //       power?.game?.game_set_end + " 11:59 PM"
                //     );
                //     var a2 = power?.game?.status === "Activated";
                //     var a3 = moment(moment().format("YYYY-MM-DD")).isAfter(
                //       power?.game?.game_set_end
                //     );
                //     if (a3 === true) {
                //       a = false;
                //     } else {
                //       var a = a1 === true || a2 === true;
                //     }
                //   }
                //   if (a) {
                //     subFiltered.push(power);
                //   }
                // }
              });
            }
            if (myGameCenterCardData.length == 0) {
              return (
                <div className={classes.noGameDiv}>
                  <h2>You are not currently entered in any games</h2>
                  <p>
                    Head over to the Power Center, browse the available games,
                    and get in on the action!
                  </p>
                  <Link to="/power-center">Go to Power Center</Link>
                </div>
              );
            }
            const myGameCenterCardView = Array(numberOfRows)
              .fill(undefined)
              .map((item, i) => {
                const start = (i + 1) * itemsInaRow - 4;
                const end = (i + 1) * itemsInaRow;
                var items = subFiltered.slice(start, end);
                console.log("items: ", items);
                // console.log("power1", moment(moment().format("YYYY-MM-DD hh:mm A")).isBetween(
                //   item?.game?.game_set_start + ' ' + item?.game?.start_time,
                //   item?.game?.game_set_end + ' 11:59 AM'
                // ));
                return (
                  <>
                    {isMobile ? (
                      <div>
                        {items?.length > 0 ? (
                          items.map((power, index) => {
                            return myGameCenterCard(power, power.url, index);
                          })
                        ) : i == 0 ? (
                          contentType !== "Completed" ? (
                            <div className={classes.noGameDiv}>
                              <h2>
                                You are not currently entered in any games
                              </h2>
                              <p>
                                Head over to the Power Center, browse the
                                available games, and get in on the action!
                              </p>
                              <Link to="/power-center">Go to Power Center</Link>
                            </div>
                          ) : (
                            <h1 className="nogamesmessage">No games</h1>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <>
                        <div
                          className={
                            classes.__interactive_contests_power_center_card_row
                          }
                        >
                          {items?.length > 0 ? (
                            items.map((power, index) => {
                              return myGameCenterCard(power, power.url, index);
                            })
                          ) : // _.times((4 - items.length), (i) => (
                          //   <div className={`${classes.__interactive_contests_power_center_card} col-auto my-2`} style={{width: 280}}/>
                          // ))
                          i == 0 ? (
                            contentType !== "Completed" ? (
                              <div className={classes.noGameDiv}>
                                <h2>
                                  You are not currently entered in any games
                                </h2>
                                <p>
                                  Head over to the Power Center, browse the
                                  available games, and get in on the action!
                                </p>
                                <Link to="/power-center">
                                  Go to Power Center
                                </Link>
                              </div>
                            ) : (
                              <h1 className="nogamesmessage">No games</h1>
                            )
                          ) : (
                            ""
                          )}

                          {items?.length > 0 &&
                            4 - items.length > 0 &&
                            _.times(4 - items.length, (i) => (
                              <div
                                className={`${classes.__interactive_contests_power_center_card} col-auto my-2`}
                                style={{ width: 280 }}
                              />
                            ))}
                        </div>
                      </>
                    )}
                  </>
                );
              });
            return myGameCenterCardView;
          })()}
      </div>
    </>
  );
};

export default InteractiveContests;
