export const AUTH_ACTION = {
    LOADING: '/actions/user/auth/LOADING',
    SUCCESS: '/actions/user/auth/SUCCESS',
    FAILED: '/actions/user/auth/FAILED',
    RESET_AUTH: '/actions/user/auth/RESET',
};

export function userAuthLoading() {
    return {
        type: AUTH_ACTION.LOADING
    }
}

export function userAuthSuccess(payload) {
    return {
        type: AUTH_ACTION.SUCCESS,
        payload
    }
}

export function userAuthFailed() {
    return {
        type: AUTH_ACTION.FAILED
    }
}

export function resetAuth() {
    return {
        type: AUTH_ACTION.RESET_AUTH
    }
}