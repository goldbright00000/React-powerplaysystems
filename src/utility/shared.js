import { isEmpty } from 'lodash'
import { CONSTANTS } from './constants'

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

export function hasMaxAceCards(aceCards) {
    return aceCards === CONSTANTS.MAX_ACE_PER_CARD
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

export function powerRoyalCards(suit) {
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