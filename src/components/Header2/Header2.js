import React from 'react';
import './Header2.scss';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header2 = props => (
    <header className='__Header2 __mediam'>
        <div className='__container-3 __flex __sb __f1'>
            <Link to='/' className='__brand-logo'><img src={logo} alt='' /></Link>
            <ul className='__navlinks __flex'>
                <li><NavLink to='/contest-central'>Contest Central</NavLink></li>
                <li><NavLink to='/power-play-sponsors'>Sponsor a Contest</NavLink></li>
                <li><NavLink to='/login'>Log In</NavLink></li>
                <li><NavLink to='/get-started' className='__btn __style-3 __small'>Get Started</NavLink></li>
            </ul>
        </div>
    </header>
)

export default Header2;