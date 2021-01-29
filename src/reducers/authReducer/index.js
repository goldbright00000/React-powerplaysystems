import { AUTH_ACTION } from '../../actions/authActions';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failed: false,
    user: []
}

const authReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case AUTH_ACTION.LOADING:
            return {
                ...state,
                loading: true,
                success: false,
                failed: false,
            };
        
        case AUTH_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                failed: false,
                user: actions.payload
            };
        
        case AUTH_ACTION.FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                failed: true
            };
        
        default:
            return state;
    }
}

export default authReducer;