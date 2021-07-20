import React, { useState, useEffect, useRef } from "react";
import classes from "./interactiveContests.module.scss";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { getLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";

import Ball from "../../icons/Ball";
import BasketBall from "../../icons/BasketBall";
import Hockeys from "../../icons/Hockeys";
import SuperBall from "../../icons/SuperBall";
import PowerCenterCard from "../../components/PowerCenterCard";
import { getDaysFromToday, redirectTo } from "../../utility/shared";
import CustomDropDown from "../../components/CustomDropDown";
import FilledArrow from "../../components/FilledArrow";
import PowerCenterMobileCard from "../../components/PowerCenterMobileCard";
import { getAllGames } from "../../actions/powerCenterActions";
import { hideDepositForm, showDepositForm } from "../../actions/uiActions";
import { fetchUserBalance } from "../../actions/userActions";
import DepositAmountPopUp from "../../components/DepositAmountPopUp/DepositAmountPopUp";
import Header from "../../components/Header/Header";
import moment from "moment";
const powerCenterCardData1 = [
  {
    id: 1,
    title: "MLB",
    prize: "10,000",
    outOf: "60,589",
    total: "200,000",
    percent: "29",
    url: "/mlb-powerdfs",
  },
  {
    id: 2,
    title: "NFL",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/nfl-powerdfs",
  },
  {
    id: 3,
    title: "NBA",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/nba-powerdfs",
  },
  {
    id: 4,
    title: "NHL",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/nhl-powerdfs",
  },
  {
    id: 5,
    title: "NFL",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/nfl-powerdfs",
  },
  {
    id: 6,
    title: "Levels",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
    url: "/mlb-power-levels",
  },
  {
    id: 7,
    title: "NHL",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
  },
  {
    id: 8,
    title: "NBA",
    prize: "10,000",
    outOf: "58,589",
    total: "200,000",
    percent: "29",
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

const ALL_CURRENCIES = [
  {
    label: "US Dollar",
    value: "usd",
  },
  {
    label: "Bitcoin",
    value: "bitcoin",
  },
  {
    label: "Ethereum",
    value: "ethereum",
  },
];

let mlbData = [];
let nflData = [];
let nbaData = [];
let nhlData = [];

const InteractiveContests = (props) => {
  const dispatch = useDispatch();
  const powerCenterCardData = useSelector(
    (state) => state.powerCenter.allGames
  );
  const { user } = useSelector((state) => state?.auth);
  const [isMobileDevice, setMobileDevice] = useState(false);
  const responsiveHandler = (maxWidth) => setMobileDevice(maxWidth.matches);
  const currencyMenuRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isBigScreenTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const [selectedDate, setSelectedDate] = useState(getDaysFromToday()[0].label);
  const [showCardDetails, setShowCardDetails] = useState(-1);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currencyMenu, setCurrencyMenu] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "usd",
    "bitcoin",
    "ethereum",
  ]);
  const [days, setDays] = useState([{}]);
  const [cashBalance, setCashBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const [haveBalance, setHaveBalance] = useState(true);

  const [sortedBy, setSortedBy] = useState("Most Popular");
  const [sortedByMPAction, setsortedByMPAction] = useState("des");
  const [sortedByTPAction, setsortedByTPAction] = useState("des");
  const [sortedByMEAction, setsortedByMEAction] = useState("des");
  const [sortedByPPAction, setsortedByPPAction] = useState("des");
  const [subFilter, setSubFilter] = useState("");

  const setShowDepositModal = () => dispatch(showDepositForm());

  useEffect(() => {
    const maxWidth = window.matchMedia("(max-width: 1200px)");
    responsiveHandler(maxWidth);
    maxWidth.addEventListener("change", responsiveHandler);
    return () => maxWidth.removeEventListener("change", responsiveHandler);
  }, []);

  useEffect(() => {
    // get user balance
    dispatch(fetchUserBalance());
    setCashBalance(
      parseFloat(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE))
    );
    setTokenBalance(
      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)
    );
    setBtcBalance(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE));
    setEthBalance(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE));
  }, [dispatch]);

  useEffect(() => {
    setDays(getDaysFromToday());
  }, [powerCenterCardData]);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      filteredData &&
        filteredData.map((item, index) => {
          if (item?.league === "MLB") {
            mlbData.push(item);
          } else if (item?.league === "NFL") {
            nflData.push(item);
          } else if (item?.league === "NBA") {
            nbaData.push(item);
          } else {
            nhlData.push(item);
          }
        });
    }
  }, []);

  useEffect(() => {
    const user_id = getLocalStorage("PERSONA_USER_ID");
    async function getData() {
      return await dispatch(getAllGames(user_id));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getFilteredData() {
      setFilteredData(powerCenterCardData);
    }
    getFilteredData();
  }, [powerCenterCardData]);

  const handleClick = (e) => {
    if (
      currencyMenuRef.current &&
      !currencyMenuRef.current.contains(e.target)
    ) {
      setCurrencyMenu(false);
    }
  };

  const checkBalace = (item, entry_fee) => {
    switch (item?.currency) {
      case "USD":
        if (cashBalance >= entry_fee) return true;
        else return false;

      case "BTC":
        if (btcBalance >= entry_fee) return true;
        else return false;

      case "ETH":
        if (ethBalance >= entry_fee) return true;
        else return false;

      case "PWRS":
        if (tokenBalance >= entry_fee) return true;
        else return false;

      default:
        return redirectTo(props, { path: "/" });
    }
  };

  const onEnter = async (item) => {
    const enoughBalance = await checkBalace(item, parseFloat(item?.entry_fee));

    if (enoughBalance) {
      switch (item?.league) {
        case "MLB":
          return redirectTo(props, {
            path: `/mlb-powerdfs`,
            state: {
              game_id: item?.game_id,
              sport_id: item?.sports_id,
              start_date: item?.start_date,
              end_date: item?.end_date,
              start_time: item?.start_time,
              outOf: item?.target,
              enrolledUsers: item?.enrolled_users,
              prizePool: _.reduce(
                item?.PrizePayouts,
                function (memo, num) {
                  return memo + parseInt(num.amount) * parseInt(num.prize);
                },
                0
              ),
              topPrize: parseFloat(
                _.max(item?.PrizePayouts, function (ele) {
                  return ele.amount;
                }).amount
              ),
              game_set_start: item?.game_set_start,
              PointsSystem: item?.PointsSystems,
              Power: item?.Powers,
              prizes: item?.PrizePayouts,
            },
          });
        default:
          return redirectTo(props, { path: "/" });
      }
    } else {
      setHaveBalance(false);
      setShowDepositModal();
    }
  };
  const Sorter = (type) => {
    setSortedBy(type);
    if (type === "Most Popular") {
      if (sortedByMPAction == "asc") {
        setsortedByMPAction("des");
      }
      if (sortedByMPAction == "des") {
        setsortedByMPAction("asc");
      }
    }
    if (type === "Prize Total") {
      if (sortedByPPAction == "asc") {
        setsortedByPPAction("des");
      }
      if (sortedByPPAction == "des") {
        setsortedByPPAction("asc");
      }
    }
    if (type === "Top Prize") {
      if (sortedByTPAction == "asc") {
        setsortedByTPAction("des");
      }
      if (sortedByTPAction == "des") {
        setsortedByTPAction("asc");
      }
    }
    if (type === "Min Entry") {
      if (sortedByMEAction == "asc") {
        setsortedByMEAction("des");
      }
      if (sortedByMEAction == "des") {
        setsortedByMEAction("asc");
      }
    }
  };
  function getPriceTotal(rec) {
    var prize = 0;
    if (rec.PrizePayouts.length > 0) {
      for (var i = 0; i < rec.PrizePayouts.length; i++) {
        prize = prize + parseFloat(rec.PrizePayouts[i].amount);
      }
    }
    return prize;
  }
  function getTopPrize(rec) {
    var topPrize = 0;
    if (rec.PrizePayouts.length > 0) {
      for (var i = 0; i < rec.PrizePayouts.length; i++) {
        if (topPrize < parseFloat(rec.PrizePayouts[i].amount)) {
          topPrize = parseFloat(rec.PrizePayouts[i].amount);
        }
      }
    }
    return topPrize;
  }
  function sortArray(arr) {
    var type = sortedBy;
    if (type === "Most Popular") {
      if (sortedByMPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(a.enrolled_users) > parseFloat(b.enrolled_users)
            ? -1
            : parseFloat(b.enrolled_users) > parseFloat(a.enrolled_users)
            ? 1
            : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(a.enrolled_users) > parseFloat(b.enrolled_users)
            ? 1
            : parseFloat(b.enrolled_users) > parseFloat(a.enrolled_users)
            ? -1
            : 0
        );
      }
    }

    if (type === "Min Entry") {
      if (sortedByMEAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(a.target) > parseFloat(b.target)
            ? -1
            : parseFloat(b.target) > parseFloat(a.target)
            ? 1
            : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(a.target) > parseFloat(b.target)
            ? 1
            : parseFloat(b.target) > parseFloat(a.target)
            ? -1
            : 0
        );
      }
    }

    if (type === "Prize Total") {
      if (sortedByPPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(getPriceTotal(a)) > parseFloat(getPriceTotal(b))
            ? -1
            : parseFloat(getPriceTotal(b)) > parseFloat(getPriceTotal(a))
            ? 1
            : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(getPriceTotal(a)) > parseFloat(getPriceTotal(b))
            ? 1
            : parseFloat(getPriceTotal(b)) > parseFloat(getPriceTotal(a))
            ? -1
            : 0
        );
      }
    }

    if (type === "Top Prize") {
      if (sortedByTPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(getTopPrize(a)) > parseFloat(getTopPrize(b))
            ? -1
            : parseFloat(getTopPrize(b)) > parseFloat(getTopPrize(a))
            ? 1
            : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(getTopPrize(a)) > parseFloat(getTopPrize(b))
            ? 1
            : parseFloat(getTopPrize(b)) > parseFloat(getTopPrize(a))
            ? -1
            : 0
        );
      }
    }
  }
  function filterCurrency(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var power = arr[i];
      if (selectedDate === "Today") {
        var m = moment().format("YYYY-MM-DD");
      } else {
        var m = moment(selectedDate + " " + moment().format("YYYY")).format(
          "YYYY-MM-DD"
        );
      }
      var sDate = m + " 00:00";
      var eDate = m + " 23:59";
      var s = power?.start_time;
      s = "0" + s;
      s = s.slice(-8);
      s = s.split(/(?=[A-Z]{2})/).join(" ");
      var startDate = moment(power?.start_date + " " + s).format(
        "YYYY-MM-DD hh:mm A"
      );
      var endDate = moment(power?.end_date + " 11:59 PM").format(
        "YYYY-MM-DD hh:mm A"
      );
      var isBetween1 = moment(startDate).isBetween(sDate, eDate);

      //const isBefore = m.isBefore(endDate); // Fixed game not showing issue by this.
      if (
        selectedCurrencies.indexOf(arr[i].currency.toLowerCase()) > -1 &&
        isBetween1
      ) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  const powerCenterCard = (item, redirectUri) => {
    return (
      <div className={classes.__interactive_contests_power_center_card}>
        <PowerCenterCard
          id={item?.game_id}
          title={item?.league}
          prize={_.reduce(
            item?.PrizePayouts,
            function (memo, num) {
              return memo + parseInt(num.amount) * parseInt(num.prize);
            },
            0
          )}
          outOf={item?.enrolled_users}
          total={item?.target}
          percent={item?.percent}
          game_type={item?.game_type}
          game_set_start={item?.game_set_start}
          start_time={item?.start_time}
          entry_fee={item?.entry_fee}
          PointsSystem={item?.PointsSystems}
          Power={item?.Powers}
          PrizePayout={item?.PrizePayouts.sort(function (a, b) {
            return parseInt(a.from) - parseInt(b.from);
          })}
          userHasEntered={item?.userHasEntered}
          showDetails={showCardDetails === item?.game_id}
          onEnter={() => {
            onEnter(item);
          }}
          onDetailsClick={(cardId) => setShowCardDetails(cardId)}
          onBackClick={() => setShowCardDetails(-1)}
          onNextClick={() => setShowCardDetails(-1)}
        />
      </div>
    );
  };

  const powerCenterMobileCard = (item, redirectUri) => {
    return (
      <div className={classes.__interactive_contests_power_center_card}>
        <PowerCenterMobileCard
          id={item?.game_id}
          title={item?.league}
          prize={_.reduce(
            item?.PrizePayouts,
            function (memo, num) {
              return memo + parseInt(num.amount) * parseInt(num.prize);
            },
            0
          )}
          outOf={item?.enrolled_users}
          total={item?.target}
          percent={item?.percent}
          game_type={item?.game_type}
          game_set_start={item?.game_set_start}
          start_time={item?.start_time}
          entry_fee={item?.entry_fee}
          PointsSystem={item?.PointsSystems}
          Power={item?.Powers}
          PrizePayout={item?.PrizePayouts.sort(function (a, b) {
            return parseInt(a.from) - parseInt(b.from);
          })}
          userHasEntered={item?.userHasEntered}
          showDetails={showCardDetails === item?.game_id}
          onEnter={() => onEnter(item)}
          onDetailsClick={(cardId) => setShowCardDetails(cardId)}
          onBackClick={() => setShowCardDetails(-1)}
          onNextClick={() => setShowCardDetails(-1)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="__table-wrapper __mb-6">
        <div className={isMobile || isTablet ? "" : "__flex"}>
          <div style={{ flex: 1 }}>
            <div className="__badges-wrapper __text-in-one-line __mediam">
              {filters.map((item, index) => {
                return (
                  <div
                    className={
                      "__outline-badge __f1 " +
                      (selectedFilter === item.id && "__active")
                    }
                    onClick={() => {
                      setSelectedFilter(item?.id);
                      const filteredData =
                        item?.id === 1
                          ? powerCenterCardData
                          : powerCenterCardData?.length > 0 &&
                            powerCenterCardData.filter(
                              (cardItem) => cardItem.league === item.title
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
          <div
            style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
          ></div>
        </div>
        {!haveBalance && <Header />}
        {isMobile || isTablet ? (
          <div className={classes.__interactive_contests_filter}>
            <div className={classes.__interactive_contests_most_popular}>
              <p>
                Most Popular
                <FilledArrow down={true} />
              </p>
            </div>
            <div className={classes.__interactive_contests_date}>
              <CustomDropDown
                value={selectedDate}
                options={days}
                onChange={(selectedOption) => setSelectedDate(selectedOption)}
              />
            </div>
          </div>
        ) : (
          <div className={classes.__interactive_contests_filter}>
            <div
              className={
                sortedBy === "Most Popular"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Most Popular");
                }}
              >
                Most Popular{" "}
                <FilledArrow
                  down={sortedByMPAction === "asc" ? false : true}
                  up={sortedByMPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Prize Total"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Prize Total");
                }}
              >
                Prize Total
                <FilledArrow
                  down={sortedByPPAction === "asc" ? false : true}
                  up={sortedByPPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Top Prize"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Top Prize");
                }}
              >
                Top Prize
                <FilledArrow
                  down={sortedByTPAction === "asc" ? false : true}
                  up={sortedByTPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Min Entry"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Min Entry");
                }}
              >
                Min Entry
                <FilledArrow
                  down={sortedByMEAction === "asc" ? false : true}
                  up={sortedByMEAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={`${classes.__interactive_contests_top_prize} ${classes.__drop_down_menu}`}
              ref={currencyMenuRef}
            >
              <p onClick={() => setCurrencyMenu(!currencyMenu)}>
                Currency
                {currencyMenu ? (
                  <FilledArrow up={true} />
                ) : (
                  <FilledArrow down={true} />
                )}
              </p>
              {currencyMenu && (
                <div className={classes.__currency_menu}>
                  {ALL_CURRENCIES.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${classes.__currency_menu_item}
                                                ${
                                                  selectedCurrencies?.includes(
                                                    item.value
                                                  ) &&
                                                  classes.__currency_menu_selected
                                                }`}
                        onClick={() => {
                          const newCurrencyData = [...selectedCurrencies];
                          // Check if currency exist in array
                          const i = newCurrencyData.indexOf(item.value);
                          if (i > -1) {
                            newCurrencyData.splice(i, 1);
                          } else {
                            newCurrencyData.push(item.value);
                          }
                          setSelectedCurrencies(newCurrencyData);
                        }}
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={classes.__interactive_contests_date}>
              <CustomDropDown
                value={selectedDate}
                options={days}
                onChange={(selectedOption) => setSelectedDate(selectedOption)}
              />
            </div>
          </div>
        )}
        {filteredData && filterCurrency(filteredData)?.length > 0 ? (
          isMobile ? (
            (() => {
              const itemsInaRow = 1;
              const numberOfRows = Math.ceil(
                powerCenterCardData.length / itemsInaRow
              );
              const powerCenterMobileCardView = Array(numberOfRows)
                .fill(undefined)
                .map((item, i) => {
                  const start = (i + 1) * itemsInaRow - 1;
                  const end = (i + 1) * itemsInaRow;
                  const items = filteredData.slice(start, end);
                  return (
                    <div
                      className={
                        classes.__interactive_contests_power_center_card_row
                      }
                    >
                      {items.map((power) => {
                        return powerCenterMobileCard(power, power.url);
                      })}
                    </div>
                  );
                });
              return powerCenterMobileCardView;
            })()
          ) : isTablet || isBigScreenTablet ? (
            (() => {
              const itemsInaRow = 2;
              const numberOfRows = Math.ceil(
                powerCenterCardData.length / itemsInaRow
              );
              const powerCenterCardView = Array(numberOfRows)
                .fill(undefined)
                .map((item, i) => {
                  const start = (i + 1) * itemsInaRow - 2;
                  const end = (i + 1) * itemsInaRow;
                  const items = filteredData.slice(start, end);
                  return (
                    <div
                      className={
                        classes.__interactive_contests_power_center_card_row
                      }
                    >
                      {items.map((power) => {
                        return powerCenterCard(power, power.url);
                      })}
                    </div>
                  );
                });
              return powerCenterCardView;
            })()
          ) : (
            (() => {
              const itemsInaRow = 4;
              const numberOfRows = Math.ceil(
                powerCenterCardData.length / itemsInaRow
              );
              var filterByCurrency = filterCurrency(filteredData);
              var a1 = sortArray(filterByCurrency);
              const powerCenterCardView = Array(numberOfRows)
                .fill(undefined)
                .map((item, i) => {
                  const start = (i + 1) * itemsInaRow - 4;
                  const end = (i + 1) * itemsInaRow;
                  const items = a1.slice(start, end);
                  return (
                    <div
                      className={
                        classes.__interactive_contests_power_center_card_row
                      }
                    >
                      {items.map((power) => {
                        return powerCenterCard(power, power.url);
                      })}
                    </div>
                  );
                });
              return powerCenterCardView;
            })()
          )
        ) : (
          <h1>No games</h1>
        )}
        {isMobile && (
          <>
            <div className={`${classes.__power_up_text} w-100 mx-0`}>
              Power-Up to experience our ground-breaking live-play games where
              you have the Power to control your team’s destiny. *
            </div>
            <button className={`${classes.__power_up_btn} w-100 mx-0`}>
              Power Up!
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default InteractiveContests;
