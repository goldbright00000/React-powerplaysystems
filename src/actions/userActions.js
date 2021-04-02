import { CONSTANTS } from "../utility/constants";
import { setLocalStorage } from "../utility/shared";

export const USER_BALANCE = 'USER_BALANCE';

export function setUserBalance(payload) {
    setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE, payload.cashBalance);
    setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE, payload.tokenBalance);
    return {
        type: USER_BALANCE,
        payload
    };
};