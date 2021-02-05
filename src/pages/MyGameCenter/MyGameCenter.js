import React, { Fragment } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import classes from './MyGameCenter.module.scss';
import Header from '../../components/Header/Header';
import './MyGameCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Card from '../../components/Card';
import PIcon from '../../icons/PIcon';
import MyGameCenterTable from './MyGameCenterTable';
import PointsIcon from '../../icons/PointsIcon';

const MyGameCenter = props => {
    const { url } = props.match;
    return (
        <Fragment>
            <Header isStick={true} />
            <div className='__PowerCenter'>
                <div className='__viewport-large-title __center __pt-1'>My Game Center</div>
                <div className={classes.header2_container}>
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
                </div>
                <div className='__flex __power-center-links __mb-5'>
                    <NavLink exact to={`${url}`} className='__f1 __block __right __relative'>
                        <span className='__block'>Live-Play Fantasy Sports</span>
                    </NavLink>
                    <NavLink to={`${url}/contests`} className='__f1 __block __relative'>
                        <span className='__block'>Interactive Promo<span className='__hide-on-small'>tional</span> Contests</span>
                    </NavLink>
                </div>
                <div className={classes.container}>
                    <Route exact path={url} component={InteractiveContests} />
                    <Route path={`${url}/contests`} component={MyGameCenterTable} />
                </div>
            </div>
            <div className='__container'>
                <div className='__h3 __center __h5-on-large'>Your Cash Balance: <span className='__primary-color __h3'> $3,000</span></div>
                <div className='__h3 __center __mt-s __mb-3 __h5-on-large'>Your Powerplay Token Balance: <span className='__primary-color __h3 __inline-flex'> 5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
            </div>
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default MyGameCenter;