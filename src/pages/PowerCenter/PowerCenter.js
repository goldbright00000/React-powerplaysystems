import React, { Fragment } from 'react';
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

const PowerCenter = props => {
    const { url } = props.match;
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
                    <div className='__power_center_banner_footer'>
                        <div className='__power_center_banner_footer_deposit'>
                            Deposit
                        </div>
                        <div className='__power_center_banner_footer_cash_and_balance_outer border_right'>
                            <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                <img src={PowerBalanceGrey} />
                            </div>
                            <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                <div className='__power_center_banner_footer_power_and_cash_balance'>
                                    15,000
                                </div>
                                <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                    Power Balance
                                </div>
                            </div>
                        </div>
                        <div className='__power_center_banner_footer_cash_and_balance_outer'>
                            <div className='__power_center_banner_footer_cash_and_balance_icon'>
                                <img src={CashBalanceGrey} />
                            </div>
                            <div className='__power_center_banner_footer_cash_and_balance_inner'>
                                <div className='__power_center_banner_footer_power_and_cash_balance'>
                                    $36
                                </div>
                                <div className='__power_center_banner_footer_power_and_cash_balance_title'>
                                    Cash Balance
                                </div>
                            </div>
                        </div>
                        <div style={{width: 80}} />
                    </div>
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