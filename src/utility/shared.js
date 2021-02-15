import { isEmpty, isEqual } from 'lodash'
import { CONSTANTS } from './constants'
import moment from 'moment';


export function redirectTo(props ,{path = '/', state = {} }) {
    const { history: { push = () => { } } = {} } = props || {}
    if(!isEmpty(state))
        return push(path, state)
    
    return push(path)
}

export function IsAceCard(card) {
    return CONSTANTS.CARD_RANKS[card?.rank] === "A"
}

export function GetAceCardIndex() {
    return CONSTANTS.CARD_RANKS.indexOf("A")
}

export function getRandomCard () {
    let card = {};
    let _cardSuit = Math.floor(Math.random() * (5 - 2) + 2)
    let _cardRankIndex = Math.floor(Math.random() * (13 - 2) + 2)
    
    card.suit = _cardSuit;
    card.rank = _cardRankIndex;

    return card
}

export function getRandomNumberBetween(minRange, maxRange) {
    let number = Math.floor(Math.random() * maxRange) + minRange;

    return number;
}

export function checkRange (number, minRange, maxRange) {
    if (number >= minRange && number <= maxRange) {
        return number;
    }

    return 0;
}

export function hasMaxAceCards(aceCards) {
    return aceCards === CONSTANTS.MAX_ACE_PER_CARD
}

export function getIndexOfArrayElement(value, list) {
    return list?.findIndex(val => isEqual(val, value))
}

export function isPowerRoyalCard(suit, rank, powerCardsList) {
    return powerCardsList?.filter(c => c?.rank === rank && c?.suit === suit)
}

export function hasPowerRoyalsCard(card, selectedSuit) {
    const { rank = 0, suit = 0 } = card || {}
    if (suit === selectedSuit &&
        (
            CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.TENS
            ||
            CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.JACK
            ||
            CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.QUEEN
            ||
            CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.KING
            ||
            CONSTANTS.CARD_RANKS[rank] === CONSTANTS.POWER_ROYALS.ACE
        )
    ) {
        return card;
    }

    return
}

export function flushList(list = []) {
    while (list?.length > 0) {
        list?.pop()
    }
}

export function royalFlush(suit) {
    return [
        {
            suit: suit,
            rank: CONSTANTS.CARD_RANKS_INDEXES.TENS
        },
        {
            suit: suit,
            rank: CONSTANTS.CARD_RANKS_INDEXES.JACK
        },
        {
            suit: suit,
            rank: CONSTANTS.CARD_RANKS_INDEXES.QUEEN
        },
        {
            suit: suit,
            rank: CONSTANTS.CARD_RANKS_INDEXES.KING
        },
        {
            suit: suit,
            rank: CONSTANTS.CARD_RANKS_INDEXES.ACE
        },
    ]
}

export function getCardsRankPairs(cardsArr) {
    const counts = {}

    const pairs = cardsArr?.map((card) => {
        return card?.rank
    })

    pairs.forEach((val) => {
        counts[val] = (counts[val] || 0) + 1
    })
    
    return counts;
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, data)
}

export function getLocalStorage(key) {
    return localStorage.getItem(key)
}

export function removeLocalStorage(key) {
    return localStorage.removeItem(key)
}

export function removeToken() {
    
}

export function validateEmail(email) {
    const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(String(email).toLocaleLowerCase())
}

export function setNumberComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function getYearsList() {
    let year = new Date().getFullYear();
    const years = [];
    
    for (let i = year; i > 1920; i--) {
        years.push({name: i, value: i})
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