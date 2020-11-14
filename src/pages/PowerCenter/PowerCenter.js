import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './PowerCenter.scss'

const PowerCenter = props => (
    <div className='__PowerCenter'>
        <Header />
        <div className='__viewport __column __ai __center'>
            <div className='__viewport-large-title __mt-a'>Power Center</div>
            <Link to='/' className='__btn __h4 __mt-3 __mb-3 __chevron __-right __shadow __power-play-viewport-btn'>Play Now</Link>
            <div className='__h5 __mb-6 __paragraph'>
                Explore our exciting interactive games and contests. <br className='__hide-on-large' />
                No purchase or deposit necessary for Promotional Contests!
            </div>
        </div>
    </div>
)

export default PowerCenter;