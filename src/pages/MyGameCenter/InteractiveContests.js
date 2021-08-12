/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import classes from "./interactiveContests.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserBalance } from "../../actions/userActions";
import Ball from "../../icons/Ball";
import BasketBall from "../../icons/BasketBall";
import Hockeys from "../../icons/Hockeys";
import SuperBall from "../../icons/SuperBall";
import CashPowerBalance from "../../components/CashPowerBalance";
import { redirectTo, getDaysFromToday } from "../../utility/shared";
import CustomDropDown from "../../components/CustomDropDown";
import MyGameCenterCard from "../../components/MyGameCenterCard";
import { URLS } from "../../config/urls";
import http from "../../config/http";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import * as MLbActions from "../../actions/MLBActions";
import _ from "underscore";
import moment from "moment";

// TODO: GET GAMES OF USER FOR WHICH THEY HAVE PAID AND THEN MAKE IT DYNAMIC

const myGameCenterCardData1 = [
  {
    id: 1,
    title: "MLB",
    prize: "5,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/mlb-powerdfs",
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
    url: "/nfl-powerdfs",
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
    dispatch(MLbActions.getUserGames(user.user_id));
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

  const onEdit = (item) => {
    switch (item?.game?.league) {
      case "MLB":
        dispatch(
          MLbActions.getAndSetEditPlayers({
            game_id: item?.game_id,
            sport_id: item?.sport_id,
            user_id: item?.user_id,
          })
        );

        return redirectTo(props, {
          path: `/mlb-powerdfs`,
          state: {
            game_id: item?.game_id,
          },
        });
    }
  };

  const onEnter = async (item) => {
    const { game = {}, sport_id, team_id, user_id, game_id } = item || {};
    const { league = "" } = game || {};
    switch (league) {
      case "MLB":
        await dispatch(MLbActions.setSelectedTeam(item));
        return redirectTo(props, { path: "/mlb-live-powerdfs" });
    }
  };

  const myGameCenterCard = (item, redirectUri) => {
    return (
      <div
        className={`${classes.__interactive_contests_power_center_card} col-auto my-2`}
      >
        <MyGameCenterCard
          isMobile={isMobile}
          id={item?.team_id}
          title={item?.game?.league}
          prize={_.reduce(
            item?.game?.PrizePayouts,
            function (memo, num) {
              return memo + parseInt(num.amount) * parseInt(num.prize);
            },
            0
          )}
          outOf={item?.enrolled_users}
          total={item?.game?.target}
          percent={item?.game?.percent}
          game_type={item?.game?.game_type}
          game_set_start={item?.game?.game_set_start}
          start_time={item?.game?.start_time}
          PointsSystem={item?.game?.PointsSystems}
          Power={item?.game?.Powers}
          PrizePayout={_.sortBy(item?.game?.PrizePayouts, "from")}
          inProgress={moment(moment().format("YYYY-MM-DD hh:mm A")).isBetween(
            item?.game?.game_set_start + " " + item?.game?.start_time,
            moment(item?.game?.game_set_end)
              .add(1, "day")
              .format("YYYY-MM-DD") + " 02:00 AM"
          )}
          completed={moment(moment().format("YYYY-MM-DD")).isAfter(
            moment(item?.game?.game_set_end)
              .add(1, "day")
              .format("YYYY-MM-DD") + " 02:00 AM"
          )}
          editPicks={
            // item?.players?.length > 0 &&
            // !moment(moment().format("YYYY-MM-DD")).isAfter(
            //   moment(item?.game?.game_set_end)
            //     .add(1, "day")
            //     .format("YYYY-MM-DD") + " 02:00 AM"
            // ) &&
            // !moment(moment().format("YYYY-MM-DD hh:mm A")).isBetween(
            //   item?.game?.game_set_start + " " + item?.game?.start_time,
            //   moment(item?.game?.game_set_end)
            //     .add(1, "day")
            //     .format("YYYY-MM-DD") + " 02:00 AM"
            // )
            true
          }
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
          onViewResults={(cardId) => setViewResults(cardId)}
          onViewResultsBack={() => setViewResults(-1)}
          onFinalStandings={(cardId) => setFinalStandingsModal(cardId)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="__table-wrapper __mb-6">
        <div className={`__flex ${classes.__ic_scroll}`}>
          <div style={{ flex: 1 }}>
            <div className="__badges-wrapper __text-in-one-line __mediam">
              {myGameCenterCardData &&
                filters.map((item, index) => {
                  return (
                    <div
                      className={
                        "__outline-badge __f1 " +
                        (selectedFilter == item.id && "__active")
                      }
                      onClick={() => {
                        setSelectedFilter(item.id);
                        const filteredData =
                          item.id === 1
                            ? myGameCenterCardData
                            : myGameCenterCardData?.length > 0 &&
                            myGameCenterCardData.filter(
                              (cardItem) =>
                                cardItem?.game?.league === item.title
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
              123
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
              value={selectedDate}
              options={days}
              onChange={(selectedOption) => {
                setSelectedDate(selectedOption);
              }}
            />
          </div>
        </div>

        {myGameCenterCardData &&
          (() => {
            const itemsInaRow = 4;
            const numberOfRows = Math.ceil(
              myGameCenterCardData.length / itemsInaRow
            );
            var subFiltered = [];
            if (filteredData.length > 0) {
              filteredData.map(function (power) {
                if (selectedDate === "Today") {
                  var m = moment().format("YYYY-MM-DD");
                } else {
                  var m = moment(
                    selectedDate + " " + moment().format("YYYY")
                  ).format("YYYY-MM-DD");
                }
                var sDate = m + " 00:00";
                var eDate = m + " 23:59";
                var s = power?.game?.start_time;
                s = "0" + s;
                s = s.slice(-8);
                s = s.split(/(?=[A-Z]{2})/).join(" ");
                var startDate = moment(
                  power?.game?.start_date + " " + s
                ).format("YYYY-MM-DD hh:mm A");
                var endDate = moment(
                  power?.game?.end_date + " 11:59 PM"
                ).format("YYYY-MM-DD hh:mm A");
                var isBetween1 = moment(startDate).isBetween(sDate, eDate);
                if (contentType === "Completed" || selectedDate === "All") {
                  isBetween1 = 1;
                }
                if (isBetween1) {
                  var a = false;
                  if (contentType === "In Progress") {
                    var a = moment(
                      moment().format("YYYY-MM-DD hh:mm A")
                    ).isBetween(
                      power?.game?.game_set_start +
                      " " +
                      power?.game?.start_time,
                      power?.game?.game_set_end + " 11:59 PM"
                    );
                  } else if (contentType === "Completed") {
                    var a = moment(moment().format("YYYY-MM-DD")).isAfter(
                      power?.game?.game_set_end
                    );
                  } else if (contentType === "Not Started") {
                    var s = power?.game?.start_time;
                    s = "0" + s;
                    s = s.slice(-8);
                    var a = moment(
                      moment().format("YYYY-MM-DD hh:mm A")
                    ).isBefore(power?.game?.game_set_start + " " + s);
                  } else if (contentType === "All Active") {
                    var a1 = moment(
                      moment().format("YYYY-MM-DD hh:mm A")
                    ).isBetween(
                      power?.game?.game_set_start +
                      " " +
                      power?.game?.start_time,
                      power?.game?.game_set_end + " 11:59 PM"
                    );
                    var a2 = power?.game?.status === "Activated";
                    var a3 = moment(moment().format("YYYY-MM-DD")).isAfter(
                      power?.game?.game_set_end
                    );
                    if (a3 === true) {
                      a = false;
                    } else {
                      var a = a1 === true || a2 === true;
                    }
                  }
                  if (a) {
                    subFiltered.push(power);
                  }
                }
              });
            }
            const myGameCenterCardView = Array(numberOfRows)
              .fill(undefined)
              .map((item, i) => {
                const start = (i + 1) * itemsInaRow - 4;
                const end = (i + 1) * itemsInaRow;
                var items = subFiltered.slice(start, end);

                // console.log("power1", moment(moment().format("YYYY-MM-DD hh:mm A")).isBetween(
                //   item?.game?.game_set_start + ' ' + item?.game?.start_time,
                //   item?.game?.game_set_end + ' 11:59 AM'
                // ));
                return (
                  <>
                    {isMobile ? (
                      <div>
                        {items?.length > 0 ? (
                          items.map((power) => {
                            return myGameCenterCard(power, power.url);
                          })
                        ) : i == 0 ? (
                          <h1 className="nogamesmessage">No games</h1>
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
                            items.map((power) => {
                              return myGameCenterCard(power, power.url);
                            })
                          ) : i == 0 ? (
                            <h1 className="nogamesmessage">No games</h1>
                          ) : (
                            ""
                          )}
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
