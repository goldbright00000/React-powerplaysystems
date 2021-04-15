import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LivePowerPlay from './LivePowerPlay';
import './PowerCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import PowerCenterBannerTitleIcon from '../../assets/power-center-banner-title-icon.png';
import PowerBalanceGrey from '../../assets/power-balance-grey.png';
import CashBalanceGrey from '../../assets/cash-balance-grey.png';
import BitcoinGrey from '../../assets/bitcoin-grey.png';
import EthereumGrey from '../../assets/ethereum-grey.png';
import { getLocalStorage, redirectTo, setLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';

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

const PowerCenter = props => {
    const { url } = props.match;
    const { auth: { user: { token = '' } }, user: {userBalance = {}} = {} } = useSelector((state) => state);
    const currencyMenuRef = useRef(null);
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
        <Fragment>
            <Header isStick={true} />
            <div className='__power_center'>
                <div className='__power_center_banner'>
                    <div className='__power_center_banner_left __container'>
                        <div className='__power_center_banner_left_icon'>
                            <img src={PowerCenterBannerTitleIcon} />
                        </div>
                        <div className='__power_center_banner_left_title'>
                            <div className='__power_center_banner_left_title_main'>
                                Power Center
                            </div>
                            <div className='__power_center_banner_left_title_sub'>
                                Welcome to the worlds first Live-Play Fantasy Sports platform
                            </div>
                        </div>
                    </div>
                    {
                        token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER)
                        ?
                        <div className='__power_center_banner_footer'>
                            <div className='__power_center_banner_footer_deposit' onClick={() => redirectTo(props, { path: "/my-account" })}>
                                Deposit
                            </div>
                            <div className={`${'__power_center_banner_footer_cash_and_balance_outer'} ${displayCurrency.length > 0 && 'border_right'}`}>
                                <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                    <img src={PowerBalanceGrey} />
                                </div>
                                <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                    <div className='__power_center_banner_footer_power_and_cash_balance'>
                                        {userBalance.tokenBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
                                    </div>
                                    <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                        Power Balance
                                    </div>
                                </div>
                            </div>
                            {
                                (displayCurrency.includes('cash'))
                                &&
                                <div className={`${'__power_center_banner_footer_cash_and_balance_outer'} ${(displayCurrency.includes('bitcoin') || displayCurrency.includes('ethereum')) && 'border_right'}`}>
                                    <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                        <img src={CashBalanceGrey} />
                                    </div>
                                    <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__power_center_banner_footer_power_and_cash_balance'>
                                            ${userBalance.cashBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE)}
                                        </div>
                                        <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                            Cash Balance
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (displayCurrency.includes('bitcoin'))
                                &&
                                <div className={`${'__power_center_banner_footer_cash_and_balance_outer'} ${(displayCurrency.includes('cash') || displayCurrency.includes('ethereum')) && 'border_right'}`}>
                                    <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                        <img src={BitcoinGrey} />
                                    </div>
                                    <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__power_center_banner_footer_power_and_cash_balance'>
                                            .00241
                                        </div>
                                        <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                            Bitcoin 
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (displayCurrency.includes('ethereum'))
                                &&
                                    <div className='__power_center_banner_footer_cash_and_balance_outer'>
                                    <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                        <img src={EthereumGrey} />
                                    </div>
                                    <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__power_center_banner_footer_power_and_cash_balance'>
                                            .007
                                        </div>
                                        <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                            Ethereum
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                currencyMenu
                                &&
                                <div className='__currency_menu' ref={currencyMenuRef}>
                                    <div>
                                        Display:
                                    </div>
                                    {
                                        CURRENCY_DATA.map((item, index) => {
                                            return (
                                                <div 
                                                    className={
                                                        `${'__currency_menu_item'} 
                                                        ${displayCurrency.includes(item.value) && '__currency_menu_selected'}`
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
                            <div className='__three_dots_div'>
                                <button className='__three_dots' onClick={() => setCurrencyMenu(!currencyMenu)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    :
                    <div style={{ height: 50}}></div>
                    }
                </div>
                {/* <div className='__flex __power-center-links __mb-5'>
                    <NavLink exact to={`${url}`} className='__f1 __block __right __relative'>
                        <span className='__block'>Live-Play Fantasy Sports</span>
                    </NavLink>
                    <NavLink to={`${url}/contests`} className='__f1 __block __relative'>
                        <span className='__block'>Interactive Promo<span className='__hide-on-small'>tional</span> Contests</span>
                    </NavLink>
                </div> */}
                <div className='__container'>
                    <Route exact path={url} component={InteractiveContests} />
                    <Route path={`${url}/contests`} component={LivePowerPlay} />
                </div>
            </div>
            {/* <div className='__container'>
                <div className='__h3 __center __h5-on-large'>Your Cash Balance: <span className='__primary-color __h3'> $3,000</span></div>
                <div className='__h3 __center __mt-s __mb-3 __h5-on-large'>Your Powerplay Token Balance: <span className='__primary-color __h3 __inline-flex'> 5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
            </div> */}
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default PowerCenter;