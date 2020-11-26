import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import PowerPlayGridRow from './PowerPlayGridRow';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Scrollbar from '../../utility/Scrollbar';

const InteractiveContests = props => {
    const [isMobileDevice, setMobileDevice] = useState(false);
    const responsiveHandler = maxWidth =>  setMobileDevice(maxWidth.matches);
    useEffect(() => {
        const maxWidth = window.matchMedia("(max-width: 1200px)");
        responsiveHandler(maxWidth);
        maxWidth.addEventListener('change', responsiveHandler);
        return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, [])
    return (
        <div className='__table-wrapper __mb-6'>
            <div className='__flex'>
                <div className='__badges-wrapper __ml-a __text-in-one-line __mediam'>
                    <NavLink to='/' className='__outline-badge __f1 __active'><SuperBall />NFL</NavLink>
                    <NavLink to='/' className='__outline-badge __f1'><BasketBall />NBA</NavLink>
                    <NavLink to='/' className='__outline-badge __f1'><Ball />MLB</NavLink>
                    <NavLink to='/' className='__outline-badge __f1'><Hockeys />NHL</NavLink>
                    <NavLink to='/' className='__outline-badge __f1'>Show All</NavLink>
                </div>
            </div>
            <div className='__h6 __mt-2 __mb-1'>Most Popular</div>
            <Scrollbar className='__power-center-scrollbar'>
                <div className='__table __block-on-large'>
                    {!isMobileDevice && (
                        <Fragment>
                            <div>Sport</div>
                            <div>Contest</div>
                            <div>Entries (min)</div>
                            <div>Total Prize</div>
                            <div></div>
                        </Fragment>
                    )}
                    <PowerPlayGridRow
                        type='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        contest='Chase The Ace'
                        entries='58589'
                        totalEntries='200000'
                        prize='800'
                        entryFee='1000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        type='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        contest='PowerLine'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                </div>
            </Scrollbar>
        </div>
    )
}

export default InteractiveContests;