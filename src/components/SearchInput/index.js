import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import SearchIcon from '../../icons/SearchIcon';

/**
 * 
 * @param {*} props 
 * @param {*} dropDown - if array of objects then it must have key name title or array of strings
 */
function SearchInput(props) {
    const [search, setSearch] = useState('');
    const [showTeamSelection, setTeamSelectionState] = useState(false);

    const { onSearch = (event) => { }, onSelect = (item) => { }, dropDown = [], selected = '' } = props || {};

    const onChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        onSearch(e);
    }

    const isObject = (item) => {
        return typeof item === 'object';
    }

    return (
        <form className={classes.search_form}>
            <span>
                <SearchIcon />
                <input
                    value={search}
                    onChange={onChange}
                    placeholder="Search by Player name ..."
                    name="playerSearch" required
                />
            </span>

            {
                dropDown && dropDown?.length ?
                    <div
                        className={classes.search_dropdown}
                        onClick={() => setTeamSelectionState(!showTeamSelection)}
                    >
                        {
                            selected && isObject(selected)
                                ?
                                selected?.title
                                :
                                selected ? selected : `All Teams`}
                        <span
                            className={`${classes.arrow} 
                            ${showTeamSelection ? classes.up : classes.down}`}
                        />
                        {
                            showTeamSelection &&
                            <div
                                className={classes.search_dropdown_menu}
                                onMouseLeave={() => setTeamSelectionState(false)}
                            >
                                {
                                    dropDown?.map((item, ind) =>
                                        <span
                                            key={ind + '' + item}
                                            className={
                                                isObject(item)
                                                    ?
                                                    item?.title === selected?.title && classes.active
                                                    :
                                                    item === selected && classes.active}
                                            onClick={() => onSelect(item)}
                                        >
                                            {
                                                isObject(item)
                                                    ?
                                                    item?.title
                                                    :
                                                    item
                                            }
                                        </span>
                                    )
                                }
                            </div>
                        }
                    </div>
                    :
                    <></>
            }
        </form>
    )
}

SearchInput.propTypes = {
    dropDown: PropTypes.array,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
}

export default SearchInput

