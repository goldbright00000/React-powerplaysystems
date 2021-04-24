import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from './MyGameCenter.module.scss';
import Header from '../../components/Header/Header';
import './MyGameCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import MyGameCenterTable from './MyGameCenterTable';
import { getLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';
import Balance from '../../components/Balance';

const MyGameCenter = props => {
    const { url } = props.match;
    const { auth: { user: { token = '' } } = {} } = useSelector((state) => state);

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
                        <Balance />
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