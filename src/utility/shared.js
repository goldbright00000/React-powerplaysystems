import { isEmpty, isEqual } from "lodash";
import { CONSTANTS } from "./constants";
import moment from "moment";

export function redirectTo(props, { path = "/", state = {} }) {
  const { history: { push = () => {} } = {} } = props || {};
  if (!isEmpty(state)) return push(path, state);

  return push(path);
}

export function IsAceCard(card) {
  return CONSTANTS.CARD_RANKS[card?.rank] === "A";
}

export function GetAceCardIndex() {
  return CONSTANTS.CARD_RANKS.indexOf("A");
}

export function getRandomCard() {
  let card = {};
  let _cardSuit = Math.floor(Math.random() * (5 - 2) + 2);
  let _cardRankIndex = Math.floor(Math.random() * (13 - 2) + 2);

  card.suit = _cardSuit;
  card.rank = _cardRankIndex;

  card.suit = _cardSuit;
  card.rank = _cardRankIndex;

  return card;
}

export function getRandomNumberBetween(minRange, maxRange) {
  let number = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);

  return number;
}

export function checkRange(number, minRange, maxRange) {
  if (number >= minRange && number <= maxRange) {
    return number;
  }

  return 0;
}

export function getEmptyStringArray(arrayLength = 0, defautlValue) {
  return new Array(arrayLength).fill(defautlValue || "-", 0, arrayLength);
}

export function isExistsInList(list = [], value) {
  return list.includes(value);
}

export function hasMaxAceCards(aceCards) {
  return aceCards === CONSTANTS.MAX_ACE_PER_CARD;
}

export function getIndexOfArrayElement(value, list) {
  return list?.findIndex((val) => isEqual(val, value));
}

export function isPowerRoyalCard(suit, rank, powerCardsList) {
  return powerCardsList?.filter((c) => c?.rank === rank && c?.suit === suit);
}

export function hasPowerRoyalsCard(card, selectedSuit) {
  const { rank = 0, suit = 0 } = card || {};
  if (
    suit === selectedSuit &&
    (CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.TENS ||
      CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.JACK ||
      CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.QUEEN ||
      CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.KING ||
      CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.ACE)
  ) {
    return card;
  }

  return;
}

export function flushList(list = []) {
  while (list?.length > 0) {
    list?.pop();
  }
}

export function royalFlush(suit) {
  return [
    {
      suit: suit,
      rank: CONSTANTS.CARD_RANKS_INDEXES.TENS,
    },
    {
      suit: suit,
      rank: CONSTANTS.CARD_RANKS_INDEXES.JACK,
    },
    {
      suit: suit,
      rank: CONSTANTS.CARD_RANKS_INDEXES.QUEEN,
    },
    {
      suit: suit,
      rank: CONSTANTS.CARD_RANKS_INDEXES.KING,
    },
    {
      suit: suit,
      rank: CONSTANTS.CARD_RANKS_INDEXES.ACE,
    },
  ];
}

export function getCardsRankPairs(cardsArr) {
  const counts = {};

  const pairs = cardsArr?.map((card) => {
    return card?.rank;
  });

  pairs.forEach((val) => {
    counts[val] = (counts[val] || 0) + 1;
  });

  pairs.forEach((val) => {
    counts[val] = (counts[val] || 0) + 1;
  });

  return counts;
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function removeToken() {}

export function validateEmail(email) {
  const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(String(email).toLocaleLowerCase());
}

export function setNumberComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getYearsList() {
  let year = new Date().getFullYear();
  const years = [];

  for (let i = year; i > 1920; i--) {
    years.push({ name: i, value: i });
  }

  return years;
}

export function getDays() {
  let weekDays = moment.weekdays();
  const days = [];
  for (let i = 0; i < weekDays.length; i++) {
    days.push({ name: weekDays[i], value: weekDays[i] });
  }

  return days;
}

export function getMonthDays() {
  const month = [];
  for (let i = 1; i <= 31; i++) {
    month.push({ name: i, value: i });
  }

  return month;
}

export function getDaysFromToday() {
  let daysFromToday = [];
  for (let i = 0; i < 7; i++) {
      if (i == 0) {
          daysFromToday.push({value: 'Today', label: 'Today'});
      } else {
          let day = moment().add(i, 'd').format('ddd, MMM DD');
          daysFromToday.push({value: day, label: day});
      }
  }
  return daysFromToday;
}

export function getCountries() {
  return ["USA", "Canada"];
}
export function getStates() {
  return [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
}
export function getProvinces() {
  return [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon Territory",
  ];
}
export function getMonths() {
  return moment.monthsShort();
}
export function getYears() {
  const years = [];
  let year = new Date().getFullYear();
  for (let i = year; i > 1920; i--) {
    years.push(i);
  }
  return year;
}

/**
 * @param {Text} text
 * @param {*} value find in Text
 */
export function hasText(text, value) {
  let txt = `${text}`.toLocaleLowerCase();
  let targetValue = `${value}`?.toLocaleLowerCase();
  if (txt?.includes(targetValue)) {
    return {
      targetValue: targetValue,
      text: text,
    };
  }

  return false;
}
