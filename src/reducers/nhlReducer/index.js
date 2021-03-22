import * as Actions from '../../actions/NHLActions';

const INITIAL_STATE = {
    data: [],
};

const nhlReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.SET_DATA:
            return {
                ...state,
                data: [...actions.payload]
            }

        default:
            return state;
    }
}

export default nhlReducer;