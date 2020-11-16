import React from 'react';
import { NavLink } from 'react-router-dom';
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import PowerPlayGridRow from './PowerPlayGridRow';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Scrollbar from '../../utility/Scrollbar';

const InteractiveContests = props => (
    <div className='__table-wrapper __mt-6 __mb-6'>
        <div className='__center __badges-wrapper __h6'>
            <div className='__inline-block'>
                <div className='__grid __interactive-grid'>
                    <NavLink to='/' className='__outline-badge __active'><SuperBall />NFL</NavLink>
                    <NavLink to='/' className='__outline-badge'><BasketBall />NBA</NavLink>
                    <NavLink to='/' className='__outline-badge'><Ball />MLB</NavLink>
                    <NavLink to='/' className='__outline-badge'><Hockeys />NHL</NavLink>
                    <NavLink to='/' className='__outline-badge'>Show All</NavLink>
                </div>
            </div>
        </div>
        <div className='__h6 __mt-2 __mb-1'>Most Popular</div>
        <Scrollbar className='__grid-wrapper __mb-5'>
            <div className='__main-grid'>
                <div className='__hide-on-large'>
                    <div>Sport</div>
                    <div>Contest</div>
                    <div>Entries (min)</div>
                    <div>Total Prize</div>
                    <div></div>
                </div>
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Chase The Ace'
                    entries='58589'
                    totalEntries='200000'
                    prize='$800'
                    entryFee='$1000'
                />
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='PowerLine'
                    entries='15395'
                    totalEntries='19161'
                    prize='$1K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='NBA'
                    Icon={BasketBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='21’s'
                    entries='1497'
                    totalEntries='150000'
                    prize='$3000'
                    entryFee='$10,000'
                />
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Chase The Ace'
                    entries='27433'
                    totalEntries='71856'
                    prize='$3K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='NFL'
                    Icon={SuperBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power DFS'
                    entries='32795'
                    totalEntries='250000'
                    prize='$3000'
                />
                <PowerPlayGridRow
                    type='NBA'
                    Icon={BasketBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power Draft'
                    entries='18699'
                    totalEntries='247904'
                    prize='$10,0000'
                />
                <PowerPlayGridRow
                    type='NFL'
                    Icon={SuperBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power DFS'
                    entries='21183'
                    totalEntries='59523'
                    prize='$300,000'
                />
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Chase The Ace'
                    entries='58589'
                    totalEntries='200000'
                    prize='$800'
                    entryFee='$1000'
                />
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='PowerLine'
                    entries='15395'
                    totalEntries='19161'
                    prize='$1K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='NBA'
                    Icon={BasketBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='21’s'
                    entries='1497'
                    totalEntries='150000'
                    prize='$3000'
                    entryFee='$10,000'
                />
                <PowerPlayGridRow
                    type='MLB'
                    Icon={Ball}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Chase The Ace'
                    entries='27433'
                    totalEntries='71856'
                    prize='$3K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='NFL'
                    Icon={SuperBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power DFS'
                    entries='32795'
                    totalEntries='250000'
                    prize='$3000'
                />
                <PowerPlayGridRow
                    type='NBA'
                    Icon={BasketBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power Draft'
                    entries='18699'
                    totalEntries='247904'
                    prize='$10,0000'
                />
                <PowerPlayGridRow
                    type='NFL'
                    Icon={SuperBall}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='Power DFS'
                    entries='21183'
                    totalEntries='59523'
                    prize='$300,000'
                />
            </div>
        </Scrollbar>
        <div className='__container'>
            <div className='__h2 __center __resize'>Your Cash Balance: <span className='__primary-color'> $3,000</span></div>
            <div className='__h2 __center __mt-1 __mb-2 __resize'>Your Powerplay Token Balance: <span className='__primary-color'> 5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
        </div>
    </div>
)

export default InteractiveContests;