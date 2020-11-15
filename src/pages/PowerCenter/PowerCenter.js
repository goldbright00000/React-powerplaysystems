import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LivePowerPlay from './LivePowerPlay';
import './PowerCenter.scss';
import './table.scss';
import Footer from '../../components/Footer/Footer'

const PowerCenter = props => {
    const { url } = props.match;
    return (
        <div className='__PowerCenter'>
            <Header />
            <div className='__viewport __column __ai __center'>
                <div className='__viewport-large-title __mt-a'>Power Center</div>
                <Link to='/' className='__btn __h4 __mt-3 __mb-3 __chevron __-right __shadow __power-play-viewport-btn'>Play Now</Link>
                <div className='__h5 __mb-6 __paragraph'>
                    Explore our exciting interactive games and contests. <br className='__hide-on-small' />
                    No purchase or deposit necessary for Promotional Contests!
                </div>
            </div>
            <div className='__background-2 __background __center'>
                <div className='__black-background'>
                    <div className='__flex __container __mb-6'>
                        <NavLink exact to={`${url}`} className='__mt-a __f1 __block'>
                            <div className='__h2 __bolder __primary-color __mt-5'>Live-Play <br /> Fantasy Sports</div>
                            <div className='__btn __mt-4 __h5 __shadow __hide-on-large'>Explore</div>
                        </NavLink>
                        <NavLink to={`${url}/contests`} className='__f1 __block'>
                            <div className='__h2 __bolder __primary-color __mt-5'>Interactive <br /> Promotional Contests</div>
                            <div className='__btn __mt-4 __h5 __hide-on-large'>Explore</div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='__container'>
                <Route path={url} component={LivePowerPlay} />
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default PowerCenter;