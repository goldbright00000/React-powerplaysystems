import React, { Fragment } from 'react';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Info from '../../icons/Info';

const PowerPlayGridRow = ({ type, Icon, date, contest, entries, totalEntries, prize, entryFee }) => {
    const percentage = `${((entries / totalEntries) * 100).toFixed()}%`;
    const addCommas = entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <Fragment>
            <div className='__flex'>
                <Icon className="__mr-1" />
                <div>
                    <div className='__h6'>{type}</div>
                    <div className='__subtitle'>{date}</div>
                </div>
                <Info className='__subtitle __ml-1' />
            </div>
            <div className='__h5 __primary-color __flex'>{contest}</div>
            <div className='__entries'>
                <span className='__h6'>{addCommas(entries)}</span> of {addCommas(totalEntries)}
                <div className='__flex'>
                    <span className='__subtitle'>{percentage} FULL</span>
                    <div className='__bar __relative'>
                        <div className='__primary __absolute' style={{ width: percentage }}></div>
                    </div>
                </div>
            </div>
            <div className='__column __flex-center'>
                <div className='__mediam'>{prize}</div>
                <div className='__subtitle'>PRIZES</div>
            </div>
            <div className='__flex __h5'>
                {entryFee ? <div className='__flex'>{entryFee} <img src={PowerPlayIcon} className='__ml-s' alt='' /></div>:
                    <div className='__chevron __-right'>Free Entry</div>
                }
            </div>
        </Fragment>
    )
}

export default PowerPlayGridRow;