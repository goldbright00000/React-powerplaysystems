import React, {useState, useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import classes from './index.module.scss';
import { CONSTANTS } from '../../utility/constants';
import { getLocalStorage, setLocalStorage } from '../../utility/shared';
import PowerBalanceGrey from '../../assets/power-balance-grey.png';
import CashBalanceGrey from '../../assets/cash-balance-grey.png';
import BitcoinGrey from '../../assets/bitcoin-grey.png';
import EthereumGrey from '../../assets/ethereum-grey.png';

const CURRENCY_DATA = [
    {
        label: 'Cash Balance',
        value: 'cash'
    },
    {
        label: 'Bitcoin Balance',
        value: 'bitcoin'
    },
    {
        label: 'Ethereum Balance',
        value: 'ethereum'
    },
];

const MobileBalance = (props) => {
    const { auth: { user: { userBalance = {} } } = {} } = useSelector((state) => state);
    const history = useHistory();

    useEffect(() => {
        const displayBalance = JSON.parse(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE));
        if (displayBalance) {
        }
    }, []);

    return (
        <div className={classes.__balance}>
            <div className={classes.__balance_cash_and_balance_outer}>
                <div className={classes.__balance_cash_and_balance_icon}>
                    <img src={PowerBalanceGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                    <div className={classes.__balance_power_and_cash_balance}>
                        {userBalance.tokenBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
                    </div>
                    <div className={classes.__balance_power_and_cash_balance_title}>
                        Powers
                    </div>
                </div>
            </div>
            <div className={classes.__balance_cash_and_balance_outer}>
                <div className={classes.__balance_cash_and_balance_icon}>
                    <img src={CashBalanceGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                    <div className={classes.__balance_power_and_cash_balance}>
                        ${userBalance.cashBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE)}
                    </div>
                    <div className={classes.__balance_power_and_cash_balance_title}>
                        USD
                    </div>
                </div>
            </div>
            <div className={classes.__balance_deposit} onClick={() => history.push("/my-account")}>
                Deposit
            </div>
        </div>
    );
};

export default MobileBalance;