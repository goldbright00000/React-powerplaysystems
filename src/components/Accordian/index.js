import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ResultCard from './ResultCard';

function Accordian(props) {
    const { title = '', visible = true, cash = '', cashTitle = '', Icon = '', isSvg = false } = props || {}

    const [isVisible, setVisibleState] = useState(visible);
    useEffect(() => { }, [visible])
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.accoridan_bar}>
                <span>{title}</span>
                <span className={classes.accoridan_bar_right}>
                    <span>
                        <span>{cashTitle}</span>
                        <span className={classes.amount}>{cash}</span>
                    </span>
                    {
                        Icon && isSvg ?
                            <Icon />
                            :
                            Icon &&
                            <img src={Icon} />
                    }
                    <i className={`${classes.arrow} ${classes.down}`} />
                </span>
            </div>

            {
                visible &&
                <ResultCard />
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
}

export default Accordian

