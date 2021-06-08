import { GET_ALL_GAMES } from "../../actions/powerCenterActions";

const INITIAL_STATE = {

};

const powerCenterReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: actions.payload,
            };

        default:
            return state;
    }
};

export default powerCenterReducer;
