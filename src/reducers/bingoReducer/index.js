import * as Actions from '../../actions/bingoActions';

const INITIAL_STATE = {
    bingo_game: Actions.DEFAULT_STATE.gameInitialValues,
    matchedNumbers: Actions.DEFAULT_STATE.matchedNumbers
}

const bingo = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.BINGO_GAME_IN_PROGRESS:
            return {
                ...state,
                bingo_game: {...state.bingo_game, ...actions.payload}
            }
        
        case Actions.BINGO_GAME_RESET:
            return {
                ...state,
                bingo_game: actions.payload
            }
        
        case Actions.BINGO_MATCHED_NUMBERS:
            return {
                ...state,
                matchedNumbers: actions.payload,
            }
        
        default:
            return state;
    }
}

export default bingo;