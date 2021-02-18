
import { getEmptyStringArray } from "../utility/shared";

export const BINGO_GAME_IN_PROGRESS = '[BINGO GAME] BINGO_GAME_IN_PROGRESS';
export const BINGO_GAME_RESET = '[BINGO GAME] BINGO_GAME_RESET';
export const BINGO_MATCHED_NUMBERS = '[BINGO GAME] BINGO_MATCHED_NUMBERS';
export const BINGO_GAME_INVENTORY = '[BINGO GAME] BINGO_GAME_INVENTORY';
export const BINGO_GAME_POWER_MATCH = '[BINGO GAME] BINGO_GAME_POWER_MATCH';
export const BINGO_GAME_REPLACE = '[BINGO GAME] BINGO_GAME_REPLACE';
export const BINGO_GAME_REPLACEALL = '[BINGO GAME] BINGO_GAME_REPLACEALL';
export const BINGO_GAME_INCREASE_DECREASE = '[BINGO GAME] BINGO_GAME_INCREASE_DECREASE';

export const DEFAULT_STATE = {
    bingo_game: {
        b: getEmptyStringArray(12), i: getEmptyStringArray(12), n: getEmptyStringArray(12), g: getEmptyStringArray(12), o: getEmptyStringArray(12)
    },
    matchedNumbers: [],
    inventory: {
        replace: 10,
        replaceAll: 255,
        powerMatch: 255,
        increaseDecrease: 255,
    }
}


export function resetBingo() {
    return (dispatch, getState) => {
        console.log('Dispatch: ',getState());
        return dispatch({
            type: BINGO_GAME_RESET,
            payload: DEFAULT_STATE
        })
    }
}

export function bingoInProgress(payload) {
    return dispatch => {
        dispatch({
            type: BINGO_GAME_IN_PROGRESS,
            payload
        })
    }
}

export function setMatchedNumbers(payload) {
    return dispatch => dispatch({
        type: BINGO_MATCHED_NUMBERS,
        payload,
    })
}

export function updateInventory(payload) {
    return dispatch => dispatch({
        type: BINGO_GAME_INVENTORY,
        payload,
    })
}

export function onPowerMatch(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { powerMatch = 0 } = inventory || {};
        if (powerMatch > 0) {
            let _powerMatch = powerMatch;
            _powerMatch -= 1;
            inventory.powerMatch = _powerMatch;

            callback();
        }
        //update the power values
        return dispatch({
            type: BINGO_GAME_POWER_MATCH,
            payload: inventory
        })
    }
}