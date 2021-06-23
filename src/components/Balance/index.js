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

const Balance = (props) => {
    const {entries = '', totalEntries = ''} = props || {};
    const { auth: { user: { userBalance = {} } } = {} } = useSelector((state) => state);
    const currencyMenuRef = useRef(null);
    const history = useHistory();
    const [currencyMenu, setCurrencyMenu] = useState(false);
    const [displayCurrency, setDisplayCurrency] = useState(['cash', 'bitcoin', 'ethereum']);

    useEffect(() => {
        const displayBalance = JSON.parse(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE));
        if (displayBalance) {
            setDisplayCurrency(displayBalance);
        }
    }, []);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = e => {
        if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
            setCurrencyMenu(false);
        }
    };

    return (
        <div className={classes.__balance}>
            {
                (entries || totalEntries)
                &&
                <div className={classes.__entries}>
                    Entries  {entries} <span>{" "} / {totalEntries}</span>
                </div>
            }
            <div className={classes.__balance_deposit} onClick={() => history.push("/my-account")}>
                Deposit
            </div>
            <div className={`${classes.__balance_cash_and_balance_outer} ${displayCurrency.length > 0 && classes.__border_right}`}>
                <div className={classes.__balance_cash_and_balance_icon}>
                    <img src={PowerBalanceGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                    <div className={classes.__balance_power_and_cash_balance}>
                        {userBalance.tokenBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
                    </div>
                    <div className={classes.__balance_power_and_cash_balance_title}>
                        Power Balance
                    </div>
                </div>
            </div>
            {
                (displayCurrency.includes('cash'))
                &&
                <div className={`${classes.__balance_cash_and_balance_outer} ${(displayCurrency.includes('bitcoin') || displayCurrency.includes('ethereum')) && classes.__border_right}`}>
                    <div className={classes.__balance_cash_and_balance_icon}>
                        <img src={CashBalanceGrey} />
                    </div>
                    <div className={classes.__balance_cash_and_balance_inner}>
                        <div className={classes.__balance_power_and_cash_balance}>
                            ${userBalance.cashBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE)}
                        </div>
                        <div className={classes.__balance_power_and_cash_balance_title}>
                            Cash Balance
                        </div>
                    </div>
                </div>
            }
            {
                (displayCurrency.includes('bitcoin'))
                &&
                <div className={`${classes.__balance_cash_and_balance_outer} ${(displayCurrency.includes('cash') || displayCurrency.includes('ethereum')) && classes.__border_right}`}>
                    <div className={classes.__balance_cash_and_balance_icon}>
                        <img src={BitcoinGrey} />
                    </div>
                    <div className={classes.__balance_cash_and_balance_inner}>
                        <div className={classes.__balance_power_and_cash_balance}>
                            {userBalance.btcBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE)}
                        </div>
                        <div className={classes.__balance_power_and_cash_balance_title}>
                            Bitcoin 
                        </div>
                    </div>
                </div>
            }
            {
                (displayCurrency.includes('ethereum'))
                &&
                    <div className={classes.__balance_cash_and_balance_outer}>
                    <div className={classes.__balance_cash_and_balance_icon}>
                        <img src={EthereumGrey} />
                    </div>
                    <div className={classes.__balance_cash_and_balance_inner}>
                        <div className={classes.__balance_power_and_cash_balance}>
                            {userBalance.ethBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE)}
                        </div>
                        <div className={classes.__balance_power_and_cash_balance_title}>
                            Ethereum
                        </div>
                    </div>
                </div>
            }
            {
                currencyMenu
                &&
                <div className={classes.__currency_menu} ref={currencyMenuRef}>
                    <div>
                        Display:
                    </div>
                    {
                        CURRENCY_DATA.map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={
                                        `${classes.__currency_menu_item} 
                                        ${displayCurrency.includes(item.value) && classes.__currency_menu_selected}`
                                    }
                                    onClick={() => {
                                        const newDisplayCurreny = [...displayCurrency];
                                        // Check if currency exist in array
                                        const i = newDisplayCurreny.indexOf(item.value);
                                        if (i > -1) {
                                            newDisplayCurreny.splice(i, 1);
                                        } else {
                                            newDisplayCurreny.push(item.value);
                                        }
                                        setDisplayCurrency(newDisplayCurreny);
                                        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE, JSON.stringify(newDisplayCurreny));
                                    }}>
                                    {item.label}
                                </div>
                            );
                        })
                    }
                </div>
            }
            <div className={classes.__three_dots_div}>
                <button className={classes.__three_dots} onClick={() => setCurrencyMenu(!currencyMenu)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    );
};

export default Balance;