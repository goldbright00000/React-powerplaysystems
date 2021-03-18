import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import classes from './index.module.scss';
import BackArrow from '../../icons/BackArrow';

function NHLLiveSportsHeader(props) {
    return (
        <div className={classes.container_header}>
            <button className={classes.bg_transparent}>
                <BackArrow /> Go to My Game center
            </button>

            <div className={classes.container_nav}>
                <ul>
                    <li>
                        <NavLink
                            exact
                            to="/nhl-live-powerdfs"
                            activeClassName={classes.active}
                        >
                            Team Manager
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/nhl-live-powerdfs/my-score-details"
                            activeClassName={classes.active}
                        >
                            My Score Details
                        </NavLink>
                    </li>
                </ul>
                <button onClick={props?.onPress}>
                    {props?.buttonIcon} {props?.buttonTitle || 'Detailed Team View'}
                </button>
            </div>
        </div>
    )
}

NHLLiveSportsHeader.propTypes = {
    buttonTitle: PropTypes.string,
    buttonIcon: PropTypes.any,
    onPress: PropTypes.func,
}

export default NHLLiveSportsHeader

