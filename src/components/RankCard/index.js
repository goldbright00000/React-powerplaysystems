import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import SidebarBtnIcon from '../../assets/nhl-sidebar-icon.png';
import RankIcon from '../../icons/Rank';

function RankCard(props) {
    const { showButton = true } = props || {};

    return (
        <div className={classes.sidebar_header}>
            <div className={classes.header_rank}>
                <p>
                    <div className={classes.live_dot} /> Live Rank
                    <div className={classes.separater} />
                    <strong>23</strong>
                </p>
            </div>

            <div className={classes.sidebar_header_content}>
                <div>
                    <div className={classes.sidebar_header_left}>
                        <p>My Score:</p>
                        <p className={classes.sidebar_header_p1}>Leader:</p>
                    </div>
                    <div className={classes.sidebar_header_right}>
                        <p className={classes.sidebar_header_p2}>30</p>
                        <p className={classes.sidebar_header_p1}>66</p>
                    </div>
                </div>
                <RankIcon />
            </div>

            {
                showButton &&
                <button>
                    <img
                        src={SidebarBtnIcon} width={19}
                        style={{ marginRight: '10px' }}
                    /> See Full Standings
                </button>
            }
        </div>
    )
}

RankCard.propTypes = {
    showButton: PropTypes.bool
}

export default RankCard

