import React, { Fragment } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

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
// import Scoreboard from '../../icons/Scoreboard';

const MyGameCenter = props => {
    const { url } = props.match;
    return (
        <Fragment>
            <Header isStick={true} />
            <div className='__PowerCenter'>
                <div className='__viewport-large-title __center __pt-1'>My Game Center</div>
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