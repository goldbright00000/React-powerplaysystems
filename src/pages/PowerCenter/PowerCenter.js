import React, { Fragment } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LivePowerPlay from './LivePowerPlay';
import './PowerCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';

const PowerCenter = props => {
    const { url } = props.match;
    return (
        <Fragment>
            <Header />
            <div className='__PowerCenter'>
                <div className='__viewport-large-title __center'>Power Center</div>
                <div className='__flex __power-center-links __mb-6'>
                    <NavLink exact to={`${url}`} className='__f1 __block __right __relative'>
                        <span className='__block'>Live-Play Fantasy Sports</span>
                    </NavLink>
                    <NavLink to={`${url}/contests`} className='__f1 __block __relative'>
                        <span className='__block'>Interactive Promo<span className='__hide-on-small'>tional</span> Contests</span>
                    </NavLink>
                </div>
                <div className='__container'>
                    <Route exact path={url} component={InteractiveContests} />
                    <Route path={`${url}/contests`} component={LivePowerPlay} />
                </div>
            </div>
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default PowerCenter;