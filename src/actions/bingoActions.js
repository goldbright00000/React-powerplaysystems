
export const BING_GAME_IN_PROGRESS = '[BINGO GAME] BING_GAME_IN_PROGRESS';


export function bingoInProgress(payload) {
    return dispatch => {
        dispatch({
            type: BING_GAME_IN_PROGRESS,
            payload
        })
    }
}