
import { getEmptyStringArray } from "../utility/shared";

export const BINGO_GAME_IN_PROGRESS = '[BINGO GAME] BINGO_GAME_IN_PROGRESS';
export const BINGO_GAME_RESET = '[BINGO GAME] BINGO_GAME_RESET';
export const BINGO_MATCHED_NUMBERS = '[BINGO GAME] BINGO_MATCHED_NUMBERS';
export const BINGO_GAME_INVENTORY = '[BINGO GAME] BINGO_GAME_INVENTORY';
export const BINGO_GAME_POWER_MATCH = '[BINGO GAME] BINGO_GAME_POWER_MATCH';
export const BINGO_GAME_REPLACE = '[BINGO GAME] BINGO_GAME_REPLACE';
export const BINGO_GAME_REPLACEALL = '[BINGO GAME] BINGO_GAME_REPLACEALL';
export const BINGO_GAME_INCREASE_DECREASE = '[BINGO GAME] BINGO_GAME_INCREASE_DECREASE';
export const BINGO_GAME_UPDATE_TARGET_NUMBERS = '[BINGO GAME] BINGO_GAME_UPDATE_TARGET_NUMBERS';
export const BINGO_UPDATED = '[BINGO GAME] BINGO_UPDATED';

export const DEFAULT_STATE = {
    bingo_game: [ getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12)],
    target_numbers: [ [1, 2, 3, 4, 5], [16, 17, 18, 19, 20], [31, 32, 33, 34, 35], [46, 47, 48, 49, 50], [61, 62, 63, 64, 65] ],
    matchedNumbers: [],
    inventory: {
        replace: 255,
        replaceAll: 255,
        powerMatch: 255,
        increaseDecrease: 255,
    },
    hasBingoUpdated: false
}

export function resetBingo() {
    return (dispatch, getState) => {
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

export function onReplacePower(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { replace = 0 } = inventory || {};
        
        if (replace > 0) {
           //power can be used
            let _replace = replace;
            _replace -= 1;
            inventory.replace = _replace;

            callback();
        }

        return dispatch({
            type: BINGO_GAME_REPLACE,
            payload: inventory
        })
    }
}

export function onIncreaseDecrease(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { increaseDecrease = 0 } = inventory || {};
        if (increaseDecrease > 0) {
            let _increaseDecrease = increaseDecrease;
            _increaseDecrease -= 1;
            inventory.increaseDecrease = _increaseDecrease;

            callback();
        }

        return dispatch({
            type: BINGO_GAME_INCREASE_DECREASE,
            payload: inventory,
        })
    }
}

export function updateTargetNumbers (payload) {
    return dispatch => {
        return dispatch({
            type: BINGO_GAME_UPDATE_TARGET_NUMBERS,
            payload
        })
    }
}
