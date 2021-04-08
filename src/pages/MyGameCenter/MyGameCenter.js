import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './MyGameCenter.module.scss';
import Scoreboard from '../../assets/scoreboard.png';
import Emblem from '../../assets/emblem.png';
import Header from '../../components/Header/Header';
import './MyGameCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import Button from '../../components/Button';
import Card from '../../components/Card';
import PIcon from '../../icons/PIcon';
import MyGameCenterTable from './MyGameCenterTable';
import PointsIcon from '../../icons/PointsIcon';
import PowerBalanceGrey from '../../assets/power-balance-grey.png';
import CashBalanceGrey from '../../assets/cash-balance-grey.png';
import BitcoinGrey from '../../assets/bitcoin-grey.png';
import EthereumGrey from '../../assets/ethereum-grey.png';
import { getLocalStorage, redirectTo, setLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';
// import Scoreboard from '../../icons/Scoreboard';

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

const MyGameCenter = props => {
    const { url } = props.match;
    const { auth: { user: { token = '' } }, user: {userBalance = {}} = {} } = useSelector((state) => state);
    const [currencyMenu, setCurrencyMenu] = useState(false);
    const [displayCurrency, setDisplayCurrency] = useState(['cash', 'bitcoin', 'ethereum']);

    useEffect(() => {
        const displayBalance = JSON.parse(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE));
        if (displayBalance) {
            setDisplayCurrency(displayBalance);
        }
    }, []);

    return (
        <Fragment>
            <Header isStick={true} />
            <div className='__my_game_center'>
                <div className='__my_game_center_banner'>
                    <div className='__my_game_center_banner_left __container'>
                        <div className='__my_game_center_banner_left_title_main'>
                            My Game Center
                        </div>
                    </div>
                    {
                        token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER)
                        ?
                        <div className='__my_game_center_banner_footer'>
                            <div className='__my_game_center_banner_footer_deposit' onClick={() => redirectTo(props, { path: "/my-account" })}>
                                Deposit
                            </div>
                            <div className={`${'__my_game_center_banner_footer_cash_and_balance_outer'} ${displayCurrency.length > 0 && 'border_right'}`}>
                                <div className='__my_game_center_banner_footer_cash_and_balance_icon'>
                                    <img src={PowerBalanceGrey} />
                                </div>
                                <div className='__my_game_center_banner_footer_cash_and_balance_inner'>
                                    <div className='__my_game_center_banner_footer_power_and_cash_balance'>
                                        {userBalance.tokenBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
                                    </div>
                                    <div className='__my_game_center_banner_footer_power_and_cash_balance_title'>
                                        Power Balance
                                    </div>
                                </div>
                            </div>
                            {
                                (displayCurrency.includes('cash'))
                                &&
                                <div className={`${'__my_game_center_banner_footer_cash_and_balance_outer'} ${(displayCurrency.includes('bitcoin') || displayCurrency.includes('ethereum')) && 'border_right'}`}>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_icon'>
                                        <img src={CashBalanceGrey} />
                                    </div>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance'>
                                            ${userBalance.cashBalance || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE)}
                                        </div>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance_title'>
                                            Cash Balance
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (displayCurrency.includes('bitcoin'))
                                &&
                                <div className={`${'__my_game_center_banner_footer_cash_and_balance_outer'} ${(displayCurrency.includes('cash') || displayCurrency.includes('ethereum')) && 'border_right'}`}>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_icon'>
                                        <img src={BitcoinGrey} />
                                    </div>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance'>
                                            .00241
                                        </div>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance_title'>
                                            Bitcoin 
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (displayCurrency.includes('ethereum'))
                                &&
                                    <div className='__my_game_center_banner_footer_cash_and_balance_outer'>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_icon'>
                                        <img src={EthereumGrey} />
                                    </div>
                                    <div className='__my_game_center_banner_footer_cash_and_balance_inner'>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance'>
                                            .007
                                        </div>
                                        <div className='__my_game_center_banner_footer_power_and_cash_balance_title'>
                                            Ethereum
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                currencyMenu
                                &&
                                <div className='__currency_menu'>
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
                                                        // Check if currency exist in array
                                                        const i = displayCurrency.indexOf(item.value);
                                                        if (i > -1) {
                                                            displayCurrency.splice(i, 1);
                                                        } else {
                                                            displayCurrency.push(item.value);
                                                        }
                                                        setDisplayCurrency(displayCurrency);
                                                        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE, JSON.stringify(displayCurrency));
                                                        setCurrencyMenu(false);
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
                {/* <div className={classes.header2_container}>
                    <div className={classes.header2_card}>
                        <Card>
                            <div className={classes.header2_card_1}>
                                <div className={classes.header2_card_1_1}>
                                    <PointsIcon />
                                    <div>
                                        <h3>$36</h3>
                                        <span>USD Balance</span>
                                    </div>
                                </div>

                                <div className={classes.header2_card_1_1}>
                                    <PIcon />
                                    <div>
                                        <h3>15,000</h3>
                                        <span>Power Balance</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className={classes.header2_card}>
                        <Card>
                            <div className={classes.header2_card_2}>
                                <p>My next contest starts in</p>
                                <h3>46:21:21</h3>
                            </div>
                        </Card>
                    </div>
                </div> */}
                {/* <div className='__flex __power-center-links __mb-5'>
                    <NavLink exact to={`${url}`} className='__f1 __block __right __relative'>
                        <span className='__block'>Live-Play Fantasy Sports</span>
                    </NavLink>
                    <NavLink to={`${url}/contests`} className='__f1 __block __relative'>
                        <span className='__block'>Interactive Promo<span className='__hide-on-small'>tional</span> Contests</span>
                    </NavLink>
                </div> */}
                <div className={classes.container}>
                    <Route exact path={url} component={InteractiveContests} />
                    <Route path={`${url}/contests`} component={MyGameCenterTable} />
                </div>
            </div>
            {/* <div className={classes.body_footer}>
                <div>
                    <Card>
                        <div className={classes.body_footer_card_wrapper}>
                            <div className={classes.body_footer_card}>
                                <img src={Scoreboard} width={100} height={100} />
                                <p>Want to explore more live Sports Games ?</p>
                            </div>
                            <Button isRounded block transparent title="More Live Sports Games" />
                        </div>
                    </Card>
                </div>
                
                <div>
                    <Card>
                        <div className={classes.body_footer_card_wrapper}>
                            <div className={classes.body_footer_card}>
                                <img src={Emblem} width={100} height={100} />
                                <p>Want to explore more Promotional Contests ?</p>
                            </div>
                            <Button isRounded block transparent title="More Promo Contests" />
                        </div>
                    </Card>
                </div>
            </div> */}
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default MyGameCenter;