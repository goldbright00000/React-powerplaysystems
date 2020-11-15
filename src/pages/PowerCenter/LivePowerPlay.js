import React from 'react';
import Billards from '../../icons/Billards';
import CasinoChips from '../../icons/CasinoChips';
import Stadium from '../../icons/Stadium';
import PowerPlayGridRow from './PowerPlayGridRow';
import './table.scss';

const LivePowerPlay = props => (
    <div className='__table-wrapper __mt-6 __mb-6'>
        <table className='__badges-wrapper __h6'>
            <tbody>
                <tr>
                    <td><div className='__outline-badge __active'><Stadium />Live sports</div></td>
                    <td><div className='__outline-badge'><Billards />Power Match</div></td>
                    <td><div className='__outline-badge'><CasinoChips />Parlay Games</div></td>
                    <td><div className='__outline-badge'>Show All</div></td>
                </tr>
            </tbody>
        </table>
        <div className='__h6 __mt-2 __mb-1'>Most Popular</div>
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
        </div>
    </div>
)

export default LivePowerPlay;