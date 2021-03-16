import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './index.module.scss';
import BackArrow from '../../icons/BackArrow';

function NHLLiveSportsHeader(props) {
    return (
        <div className={classes.container_header}>
            <button>
                <BackArrow /> Go to My Game center
            </button>

            <div className={classes.container_nav}>
                <ul>
                    <li><Link to="#" className={classes.active}>Team Manager</Link></li>
                    <li><Link to="#">My Score Details</Link></li>
                </ul>
            </div>
        </div>
    )
}

NHLLiveSportsHeader.propTypes = {

}

export default NHLLiveSportsHeader

