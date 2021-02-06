import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './MyGameCenter.module.scss';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import SuperBall from '../../icons/SuperBall';
import Info from '../../icons/Info';
import { setNumberComma } from '../../utility/shared';

const MAX_FILL_BAR_VALUE = 60;

function MyGameCenterTableRow(props) {
    const [isActionActive, setActionState] = useState(false);

    const {
        type: { Icon = <></>, typeTitle = '', typeDateTime = '' } = {}, contest = '', entries: { entriesTitle = '', entiresValue = 0 } = {},
        totalPrizes: { totalPrize = 0, firstPlacePrize = 0 } = {}, freePaid = 0, status: { statusTitle = '', statusTime = '' } = {}
    } = props || {};

    const _entiresValue = () => {
        let val = entiresValue || 0;

        val = Math.round(val * 60 / 100);

        return val;
    }

    return (
        <div className={classes.table_row}>
            <div>
                <div className={classes.td_icon}>
                    {Icon}
                </div>
                <div>
                    <p>{ typeTitle }</p>
                    <span>
                        { typeDateTime } <Info />
                    </span>
                </div>
            </div>
            <div><strong>{ contest }</strong></div>
            <div className={classes.row_column}>
                {entriesTitle}
                <div className={classes.progress}>
                    <span>{entiresValue}% FULL</span>
                    <div className={classes.progress_bar_bg}>
                        <div className={classes.progress_bar} style={{width: `${_entiresValue()}px`}}></div>
                    </div>
                </div>
            </div>
            <div className={classes.row_column}>
                <p>${ setNumberComma(totalPrize) }</p>
                <span>1st place: ${firstPlacePrize}</span>
            </div>
            <div className={classes.row_small}>
                <img src={PowerPlayIcon} alt='' />
                <p className={classes.m_l_4}>{ setNumberComma(freePaid) }</p>
            </div>
            <div className={`${classes.row_small} ${classes.row_column}`}>
                <p>{ statusTitle }</p>
                <span>{ statusTime }</span>
            </div>
            <div className={classes.row_small}>
                <button className={isActionActive && classes.active} onClick={() => setActionState(true)}><p>...</p></button>
                {
                    isActionActive &&
                    <div className={classes.action} onMouseLeave={() => setActionState(false)}>
                        <Link to="#">Make picks</Link>
                        <Link to="#">Live-Play</Link>
                        <Link to="#">Exit Game</Link>
                    </div>
                }
            </div>
        </div>
    )
}

MyGameCenterTableRow.propTypes = {
    type: PropTypes.object,
    contest: PropTypes.string,
    entries: PropTypes.object,
    totalPrizes: PropTypes.object,
    freePaid: PropTypes.number,
    status: PropTypes.object,
}

export default MyGameCenterTableRow

