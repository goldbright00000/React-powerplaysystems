import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ClockIcon from '../../icons/Clock2';
import CalenderIcon from '../../icons/Calendar2';
import StadiumIcon from '../../icons/Stadium2';
import Tick2 from '../../icons/Tick2';
import DeleteIcon from '../../assets/delete.png';
import PowerPlayIcon from '../../assets/token.png';

function SportsSelectionCard (props) {
    const { title = '', avgVal = 0, teamA = '', teamB = '', time = '', date = '', stadium = '', id = '', isSelected = false, isStartPower = false, onSelectDeselect = () => { } } = props || {};
    return (
        <div className={ classes.container_body_card }>
            {
                isStartPower &&
                <span className={classes.container_body_card_start_power}> <img src={ PowerPlayIcon } /> Star Power </span>
            }
            <div className={classes.container_body_card_header}>
                <h2 className={isSelected ? classes.active : ''}>{title}</h2>
                {
                    !isSelected ?
                    <button onClick={() => onSelectDeselect(id)}> + Select</button>
                    :
                    <div className={classes.container_selected}>
                        <p> <Tick2 /> Selected <img src={DeleteIcon} onClick={() => onSelectDeselect(id)} /></p>
                    </div>
                }
            </div>

            <p className={`${classes.container_body_card_p} ${isSelected ? classes.active : ''}`}>Avg. Pts/Game <span>{avgVal}</span></p>

            <p><span className={classes.teamA}>{teamA}</span> VS {teamB}</p>

            <div className={classes.divider}></div>
            <p className={classes.container_body_footer}> 
                <span><ClockIcon /> {time}</span>
                <span><CalenderIcon /> {date}</span>
                <span><StadiumIcon /> {stadium}</span>
            </p>
        </div>
    )
}

SportsSelectionCard.propTypes = {
    title: PropTypes.string,
    avgVal: PropTypes.number,
    teamA: PropTypes.string,
    teamB: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    stadium: PropTypes.string,
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    isStartPower: PropTypes.bool,
    onSelectDeselect: PropTypes.func,
}

export default SportsSelectionCard

