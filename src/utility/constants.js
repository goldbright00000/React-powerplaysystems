export const CONSTANTS = {
    CARD_SUITS: {
        DIAMOND: 1, CLUB: 2, HEART: 3, SPADE: 4
    },
    //9 = J, 10 = Queen, 11 = King, 12 = Ace
    CARD_RANKS: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    CARD_POP_ACTIONS: {
        INCREASE: 'INCREASE',
        DECREASE: 'DECREASE',
        REPLACE: 'REPLACE',
        POWER_MATCH: 'POWER_MATCH',
        REPLACE_ALL: 'REPLACE_ALL',
        NEW_HAND: 'NEW_HAND'
    },
    MAX_ACE_PER_CARD: 2,
    MAX_ACE_CARDS: 5,
    POWER_ROYALS: {
        TENS: '10',
        JACK: 'J',
        QUEEN: 'Q',
        KING: 'K',
        ACE: 'A'
    },
    CARD_RANKS_INDEXES: {
        TENS: 8,
        JACK: 9,
        QUEEN: 10,
        KING: 11,
        ACE: 12
    }
}