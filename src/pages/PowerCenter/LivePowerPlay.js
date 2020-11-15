import React from 'react';
import Billards from '../../icons/Billards';
import CasinoChips from '../../icons/CasinoChips';
import Stadium from '../../icons/Stadium';
import PowerPlayGridRow from './PowerPlayGridRow';
import './table.scss';
import PowerPlayIcon from '../../assets/powerplay-icon.png';

const LivePowerPlay = props => (
    <div className='__table-wrapper __mt-6 __mb-6'>
        <div className='__center __badges-wrapper __h6'>
            <div className='__inline-block'>
                <div className='__grid'>
                    <div className='__outline-badge __active'><Stadium />Live sports</div>
                    <div className='__outline-badge'><Billards />Power Match</div>
                    <div className='__outline-badge'><CasinoChips />Parlay Games</div>
                    <div className='__outline-badge'>Show All</div>
                </div>
            </div>
        </div>

        <div className='__h6 __mt-2 __mb-1'>Most Popular</div>
        <div className='__grid-wrapper __hide-scrollbar __mb-5'>
            <div className='__main-grid'>
                <div className='__hide-on-large'>
                    <div>Type</div>
                    <div>Contest</div>
                    <div>Entries (min)</div>
                    <div>Total Prizes</div>
                    <div></div>
                </div>
                <PowerPlayGridRow
                    type='Chase The Ace'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='58589'
                    totalEntries='200000'
                    prize='$800'
                    entryFee='$1000'
                />
                <PowerPlayGridRow
                    type='Power Poker'
                    Icon={Billards}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='15395'
                    totalEntries='19161'
                    prize='$1K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='Bingo'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='1497'
                    totalEntries='150000'
                    prize='$3000'
                    entryFee='$10,000'
                />
                <PowerPlayGridRow
                    type='21’s'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='27433'
                    totalEntries='71856'
                    prize='$3K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='747'
                    Icon={Billards}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='32795'
                    totalEntries='250000'
                    prize='$3000'
                />
                <PowerPlayGridRow
                    type='Elite 8'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='18699'
                    totalEntries='247904'
                    prize='$10,0000'
                />
                <PowerPlayGridRow
                    type='Elite 8'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='21183'
                    totalEntries='59523'
                    prize='$300,000'
                />
                <PowerPlayGridRow
                    type='21’s'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='27433'
                    totalEntries='71856'
                    prize='$3K in Bonus Cash'
                />
                <PowerPlayGridRow
                    type='747'
                    Icon={Billards}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='32795'
                    totalEntries='250000'
                    prize='$3000'
                />
                <PowerPlayGridRow
                    type='Elite 8'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='18699'
                    totalEntries='247904'
                    prize='$10,0000'
                />
                <PowerPlayGridRow
                    type='Elite 8'
                    Icon={CasinoChips}
                    date='Oct 24, 2020'
                    time='8:00PM ET'
                    contest='TDB'
                    entries='21183'
                    totalEntries='59523'
                    prize='$300,000'
                />
            </div>
        </div>
        <div className='__h2 __center'>Your Cash Balance: <span className='__primary-color'>$3,000</span></div>
        <div className='__h2 __center __mt-1'>Your Powerplay Token Balance: <span className='__primary-color'>5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
    </div>
)

export default LivePowerPlay;