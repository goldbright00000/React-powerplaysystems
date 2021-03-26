import { USER_BALANCE } from '../../actions/userActions';

const INITIAL_STATE = {
    userBalance: {}
};

const userReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case USER_BALANCE:
            return {
                ...state,
                userBalance: actions.payload
            };
        default:
            return state;
    }
};

export default userReducer;