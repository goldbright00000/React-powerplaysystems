import * as Actions from '../../actions/authActions';

const INITIAL_STATE = {
    loading: false,
    user: []
}

const authReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.AUTH_LOADING:
            return {
                ...state,
                loading: true,
            };
        
        case Actions.GET_AUTH:
            return {
                ...state,
                loading: false,
                user: actions.payload
            };
        
        case Actions.RESET_AUTH:
            return {
                ...state,
                loading: false,
                success: false,
                failed: false,
                user: {}
            }
        
        default:
            return state;
    }
}

export default authReducer;