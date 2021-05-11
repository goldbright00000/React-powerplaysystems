import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/Header/Header';
import LivePowerPlay from './LivePowerPlay';
import './PowerCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import PowerCenterBannerTitleIcon from '../../assets/power-center-banner-title-icon.png';
import { getLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';
import Balance from '../../components/Balance';
import MobileBalance from '../../components/MobileBalance';

const PowerCenter = props => {
    const { url } = props.match;
    const { auth: { user: { token = '' } } = {} } = useSelector((state) => state);
    const isMobile = useMediaQuery({ query: '(max-width: 414px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isBigScreenTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <Fragment>
            <Header isStick={true} />
            <div className='__power_center'>
                <div className='__power_center_banner'>
                    <div className='__power_center_banner_left __container'>
                        <div className='__power_center_banner_left_icon'>
                            <img src={PowerCenterBannerTitleIcon} className="__banner_title_icon" />
                        </div>
                        <div className='__power_center_banner_left_title'>
                            <div className='__power_center_banner_left_title_main'>
                                Power Center
                            </div>
                            <div className='__power_center_banner_left_title_sub'>
                                {
                                    isMobile
                                    ?
                                    "Worlds first Live-Play Fantasy Sports platform"
                                    :
                                    "Welcome to the worlds first Live-Play Fantasy Sports platform"
                                }
                            </div>
                        </div>
                    </div>
                    {
                        token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER)
                        ?
                        <div className="__balance">
                            {
                                isMobile
                                ?
                                <MobileBalance />
                                :
                                <Balance />
                            }
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