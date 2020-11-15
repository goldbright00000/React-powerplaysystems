import React, { Fragment } from 'react';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Info from '../../icons/Info';

const PowerPlayGridRow = ({ type, Icon, date, time, contest, entries, totalEntries, prize, entryFee }) => {
    const percentage = `${((entries / totalEntries) * 100).toFixed()}%`;
    const addCommas = entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <div className='__power-play-grid-row __relative'>
            <div className='__flex __type'>
                <div className='__game-image __mr-1'><Icon /></div>
                <div className='__main'>
                    <div className='__h6'>{type}</div>
                    <div className='__subtitle'>
                        {date} <span className='__hide-on-large'> | </span> <br className='__hide-only-on-large' /> {time}
                        <Info className='__ml-1 __info-icon __relative' />
                    </div>
                </div>
            </div>
            <div className='__h5 __primary-color __flex __contest'>{contest}</div>
            <div className='__entries'>
                <span className='__h6'>{addCommas(entries)}</span> of {addCommas(totalEntries)}
                <div className='__flex'>
                    <span className='__subtitle'>{percentage} FULL</span>
                    <div className='__bar __relative'>
                        <div className='__primary __absolute' style={{ width: percentage }}></div>
                    </div>
                </div>
            </div>
            <div className='__column __flex-center __prizes'>
                <div className='__subtitle __hide-only-on-large'>TOTAL PRIZES</div>
                <div className='__mediam'>{prize}</div>
                <div className='__subtitle __hide-on-large'>PRIZES</div>
            </div>
            <div className='__h5 __fee-charges'>
                {entryFee ? <div className='__flex __ml-a'>
                    {entryFee} 
                    <img src={PowerPlayIcon} className='__ml-s' alt='' /> <div className='__chevron __-right __hide-only-on-large'></div></div> :
                    <div className='__chevron __-right __ml-a'>Free Entry</div>
                }
            </div>
        </div>
    )
}

export default PowerPlayGridRow;