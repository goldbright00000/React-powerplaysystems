import * as Actions from '../../actions/NHLActions';

const INITIAL_STATE = {
    live_data: [],
    data: [],
    starPlayerCount: 0,
};

const nhlReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.NHL_LIVE_DATA:
            return {
                ...state,
                live_data: [...actions.payload]
            };

        case Actions.NHL_DATA:
            return {
                ...state,
                data: [...actions.payload],
            };

        case Actions.STAR_PLAYER_COUNT:
            return {
                ...state,
                starPlayerCount: actions.payload
            }

        default:
            return state;
    }
}

export default nhlReducer;