import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ResultCard from './ResultCard';

function Accordian(props) {
    const { title = '', visible = false, cash = '', cashTitle = '', icon = '', onClick = () => { }, isMobile = false } = props || {}
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.accoridan_bar} onClick={onClick}>
                <span className={classes.accoridan_bar_icon}>
                    {
                        icon
                        &&
                            <img src={icon} width="23" height="23" style={{paddingRight: 2}} />
                    }
                    {title}
                </span>
                <span className={classes.accoridan_bar_right}>
                    <span>
                        <span>{cashTitle}</span>
                        <span className={classes.amount}>{cash}</span>
                    </span>
                    <i className={`${classes.arrow} ${visible ? classes.up : classes.down}`} />
                </span>
            </div>

            {
                visible &&
                <ResultCard isMobile={isMobile} />
            }
        </div>
    )
}

Accordian.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    cash: PropTypes.any,
    cashTitle: PropTypes.string,
    Icon: PropTypes.any,
    isSvg: PropTypes.bool,
    onClick: PropTypes.func,
    isMobile: PropTypes.bool
}

export default Accordian

