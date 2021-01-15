import { CARD_GAME_ACTION_TYPES } from '../../actions/cardGameAction'

const INITIAL_STATE = {
    collectedAceCards: [],
    inventory: {
        replace: 2,
        replaceAll: 2,
        powerMatch: 255,
        increaseOrDecrease: 4
    },
}

const cardGameReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case CARD_GAME_ACTION_TYPES.CARD_LOAD:
            return {
                ...state,
                collectedAceCards: actions.payload
            };
        
        case CARD_GAME_ACTION_TYPES.CARD_INVENTORY:
            return {
                ...state,
                inventory: actions.payload
            };
        
        case CARD_GAME_ACTION_TYPES.RESET_CARD:
            return {
                ...state,
            };
        
        default:
            return state;
    }
}

export default cardGameReducer