import { CONSTANTS } from "../utility/constants";
import { setLocalStorage } from "../utility/shared";

export const USER_BALANCE = 'USER_BALANCE';

export function setUserBalance(payload) {
    setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER_BALANCE, JSON.stringify(payload));
    return {
        type: USER_BALANCE,
        payload
    };
};