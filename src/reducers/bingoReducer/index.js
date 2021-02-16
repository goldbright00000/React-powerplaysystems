import * as Actions from '../../actions/bingoActions';

const INITIAL_STATE = {
    bingo_game: {
        b: [],
        i: [],
        n: [],
        g: [],
        o: []
    }
}

const bingo = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.BING_GAME_IN_PROGRESS:
            return {
                ...state,
                bingo_game: {...state.bingo_game, ...actions.payload}
            }
        default:
            return state;
    }
}

export default bingo;