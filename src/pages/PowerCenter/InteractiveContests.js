import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import PowerPlayGridRow from './PowerPlayGridRow';
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
                            <div className='__h6'>Sport</div>
                            <div className='__h6'>Contest</div>
                            <div className='__h6'>Entries (min)</div>
                            <div className='__h6'>Total Prize</div>
                            <div className='__h6'></div>
                        </Fragment>
                    )}
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Chase The Ace'
                        entries='58589'
                        totalEntries='200000'
                        prize='800'
                        pointsRequired='1000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='21’s'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='21’s'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='21’s'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                </div>
            </Scrollbar>
        </div>
    )
}

export default InteractiveContests;