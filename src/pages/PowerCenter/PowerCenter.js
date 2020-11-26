import React, { Fragment } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LivePowerPlay from './LivePowerPlay';
import './PowerCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'
import InteractiveContests from './InteractiveContests';
import PowerPlayIcon from '../../assets/powerplay-icon.png';

const PowerCenter = props => {
    const { url } = props.match;
    return (
        <Fragment>
            <Header />
            <div className='__PowerCenter'>
                <div className='__viewport-large-title __center'>Power Center</div>
                <div className='__flex __power-center-links __mb-5'>
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
            <div className='__container'>
                <div className='__h3 __center __h5-on-large'>Your Cash Balance: <span className='__primary-color __h3'> $3,000</span></div>
                <div className='__h3 __center __mt-s __mb-3 __h5-on-large'>Your Powerplay Token Balance: <span className='__primary-color __h3 __inline-flex'> 5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
            </div>
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default PowerCenter;