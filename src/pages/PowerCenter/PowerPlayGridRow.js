import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Info from '../../icons/Info';
import './PowerPlayGridRow.scss';

const PowerPlayGridRow = props => props.isMobileDevice ? <div className='__power-grid-row-card'><TableRow {...props} /></div> : <TableRow {...props} />


const TableRow = ({ type, Icon, date, time, contest, entries, totalEntries, prize, entryFee }) => {
    const percentage = `${((entries / totalEntries) * 100).toFixed()}%`;
    const addCommas = entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    <Fragment>
        <div className='__support'>
            <Icon className='__icon' />
            <Info className='__info-icon' />
            <span className='__title __h6'>{contest}</span>
            <span className='__date __light-grey'>{date} <span>|</span> {time}</span>
        </div>
        <div className='__flex __h6 __primary-color __bold'> {type} </div>
        <div className='__entries'>
            <div>
                <span className='__filled-entries __h6'>{addCommas(entries)} </span>
                <span className='__dark-white-color'> of {addCommas(totalEntries)}</span>
            </div>
            <div className='__flex'>
                <span className='__light-grey __mr-s __percentage-representation'>{percentage} FULL </span>
                <span className='__bar'><span className='__block __primary' style={{ width: percentage }}></span></span>
            </div>
        </div>
        <div className='__flex'>
            <div>
                <div className='__h6'>{prize}</div>
                <div>PRIZES</div>
            </div>
        </div>
        <Link to='/' className='__flex __chevron __h5 __-right'>{entryFee}</Link>
    </Fragment>
}

export default PowerPlayGridRow;