import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import Tick2 from '../../icons/Tick2';

function SportsFilters (props) {
    const { data = [], onSelect = () => { }, activeFilter = {} } = props || {};
    
    return (
        <div className={classes.container_top_2}>
            {
                data?.length ?
                    data?.map((item) => <button
                        className={ activeFilter?.id === item?.id ? classes.active : '' }
                        onClick={ () => onSelect(item.id) }
                        key={item?.id.toString()}
                    >
                        { item.title } <span>{ item.remaining } Left</span>
                        <div className={ classes.tick }><Tick2 /></div>
                    </button>)
                    :
                    <p>No data</p>
            }
        </div>
    )
}

SportsFilters.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    activeFilter: PropTypes.object,
}

export default SportsFilters

