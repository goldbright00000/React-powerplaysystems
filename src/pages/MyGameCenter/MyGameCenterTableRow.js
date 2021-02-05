import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './MyGameCenter.module.scss';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import SuperBall from '../../icons/SuperBall';
import Info from '../../icons/Info';

function MyGameCenterTableRow(props) {
    const [isActionActive, setActionState] = useState(false);

    return (
        <div className={classes.table_row}>
            <div>
                <div className={classes.td_icon}>
                    <SuperBall size={21} />
                </div>
                <div>
                    <p>MLB Chase The Ace</p>
                    <span>
                        Oct 24, 2020 | 8:00PM ET <Info />
                    </span>
                </div>
            </div>
            <div><strong>CTA $15k WTA </strong></div>
            <div className={classes.row_column}>
                <p>58,589 <span>of 200,000</span></p>
                <div className={classes.progress}>
                    <span>29% FULL</span>
                    <div className={classes.progress_bar_bg}>
                        <div className={classes.progress_bar} style={{width: '40px'}}></div>
                    </div>
                </div>
            </div>
            <div className={classes.row_column}>
                <p>58,589</p>
                <span>1st place: $500</span>
            </div>
            <div className={classes.row_small}>
                <img src={PowerPlayIcon} alt='' />
                <p className={classes.m_l_4}>1,000</p>
            </div>
            <div className={`${classes.row_small} ${classes.row_column}`}>
                <p>Starts in:</p>
                <span>3:00:04</span>
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

