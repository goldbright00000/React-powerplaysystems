import React, { useState, useCallback, useEffect } from 'react';
import { isEmpty, isEqual } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import classes from './index.module.scss';
import * as NHLActions from '../../actions/NHLActions';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import NHLBg from '../../assets/NHLBG.jpg';
import MLBFooterImage from '../../assets/NHL.png';
import PowerPlayIcon from '../../assets/token.png';
import Card from '../../components/PowerpickCard';
import Sidebar from '../../components/Sidebar';
import CashPowerBalance from '../../components/CashPowerBalance';
import Circle from '../../icons/CircleEmpty';
import SportsSidebarContent from '../../components/SportsSidebarContent';
import SelectionCard from '../../components/SportsSelectionCard';
import SelectionCard2 from '../../components/SportsSelectionCard2';
import EmployeeIcon from '../../icons/Employee';
import SportsFilters from '../../components/SportsFilters';
import CheckIcon from '../../icons/Check';
import { CONSTANTS } from '../../utility/constants';
import SportsContestRules from '../../components/SportsContestRules';
import { redirectTo } from '../../utility/shared';

import { dummyData } from './dummyData';
import SearchInput from '../../components/SearchInput';

const INITIAL_PLAYER_LIST = [
    {
        title: 'C1',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.CENTER,
        playerId: '',
    },
    {
        title: 'C2',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.CENTER,
        playerId: '',
    },
    {
        title: 'LW',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.LW,
        playerId: '',
    },
    {
        title: 'RW',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.RW,
        playerId: '',
    },
    {
        title: 'D1',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.D,
        playerId: '',
    },
    {
        title: 'D2',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.D,
        playerId: '',
    },
    {
        title: 'G',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.G,
        playerId: '',
    },
    {
        title: 'TD',
        value: '',
        icon: EmployeeIcon,
        filter: CONSTANTS.FILTERS.NHL.TD,
        playerId: '',
    },
]

const FILTERS_INITIAL_VALUES = [
    {
        id: 1,
        title: CONSTANTS.FILTERS.NHL.CENTER,
        remaining: 2,
    },
    {
        id: 2,
        title: CONSTANTS.FILTERS.NHL.LW,
        remaining: 1,
    },
    {
        id: 3,
        title: CONSTANTS.FILTERS.NHL.RW,
        remaining: 1,
    },
    {
        id: 4,
        title: CONSTANTS.FILTERS.NHL.D,
        remaining: 2,
    },
    {
        id: 5,
        title: CONSTANTS.FILTERS.NHL.G,
        remaining: 1,
    },
    {
        id: 6,
        title: CONSTANTS.FILTERS.NHL.TD,
        remaining: 1,
    },
]

const basicRules = [
    'No purchase necessary.',
    'Open to residents of United States who are over the age of majority.',
    'Contest closes at 11:59pm ET - April 22, 2020.'
];

const detailRules = [
    'Five (5) prizes to be won. See full rules for complete details of all prizes.',
    'One entry per person.',
    'Odds of winning depend on player knowledge.',
    'Mathematical skill testing question must be correctly answered to win.',
]

let starPlayerCount = 0;
const dropDown = [
    { title: 'Team A' },
    { title: 'Team B' },
    { title: 'Team C' },
    { title: 'Team D' },
]

function NHLPowerdFs(props) {
    const [selected, setSelected] = useState(new Map());
    const [selectedFilter, setSelectedFilter] = useState(FILTERS_INITIAL_VALUES[0]);
    const [selectedStarPowers, setStarPowers] = useState([false, false, false]);
    const [playerList, setPlayerList] = useState(INITIAL_PLAYER_LIST)
    const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
    const [selectedData, setSelectedData] = useState();
    const [filterdData, setFilterdData] = useState();
    const [selectedDropDown, setSelectedDropDown] = useState();

    const { data = [] } = useSelector(state => state.nhl);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NHLActions.setNhlData(dummyData));
    }, [])

    useEffect(() => {
        if (data?.length) {
            setFilterdData(data[0]);
            setSelectedData(data[0]);
        }
    }, [data]);

    const onSelectDeselect = useCallback((id) => {
        const _data = dummyData?.filter(d => d?.data?.find(c => c?.id === id));
        const { cat = '', data: _selectedData = [] } = _data?.[0] || [];

        const [data] = _selectedData?.filter(d => d?.id === id);
        const _selected = new Map(selected);

        //selected players
        const _playersList = [...playerList];
        const _selectedStarPowers = [...selectedStarPowers]; //starPower players

        if (!_selected.get(id)) {
            const [_player] = _playersList?.filter(
                player => player?.filter === selectedData?.cat && isEmpty(player.value)
            );
            if (!isEmpty(_player) && isEmpty(_player.value)) {
                const playerListIndex = _playersList?.findIndex(
                    player => player?.filter === selectedData?.cat && isEmpty(player)
                );
                let player = _player;
                player.value = data?.title;
                player.playerId = data?.id;
                player.isStarPlayer = data?.isStarPlayer;
                _playersList[playerListIndex] = player;

                _selected.set(id, !selected.get(id));
                //Star Power Player selection (sidebar)
                if (starPlayerCount < 3 && data?.isStarPlayer) {
                    _selectedStarPowers[starPlayerCount] = true;
                    starPlayerCount++;

                    dispatch(NHLActions.starPlayerCount(starPlayerCount));
                }
            }
        } else {
            let existingPlayerIndex = _playersList?.findIndex(
                player => isEqual(player?.playerId, data?.id)
            );

            if (existingPlayerIndex !== -1) {
                _selected.set(id, !selected.get(id));
                if (starPlayerCount > 0 && _playersList[existingPlayerIndex].isStarPlayer) {
                    starPlayerCount--;
                    _selectedStarPowers[starPlayerCount] = false;
                }

                _playersList[existingPlayerIndex].value = '';
                _playersList[existingPlayerIndex].playerId = '';
                _playersList[existingPlayerIndex].isStarPlayer = false;
            }
        }

        setSelected(_selected);
        setStarPowers(_selectedStarPowers);
        setPlayerList(_playersList);
        activateFilter(data, cat);
    }, [selected, selectedFilter, selectedData]);

    const onSelectFilter = useCallback(id => {
        const [_selectedFilter] = filters?.filter(filter => filter.id === id);
        const [_selectedData] = dummyData?.filter((data) => data?.cat === _selectedFilter?.title);

        setSelectedData(_selectedData);
        setSelectedFilter(_selectedFilter);
        setFilterdData(_selectedData);
    }, [selectedFilter]);

    const activateFilter = (player, category) => {
        const [_selectedFilter] = filters?.filter(filter => filter?.title === category);
        const filter = _selectedFilter;
        let _remaining = filter?.remaining;
        if (_remaining > 0) {
            if (!!!selected.get(player?.id))
                _remaining -= 1;
            else if (_remaining < 2)
                _remaining += 1;
            if (_remaining <= 0) {
                _remaining = 0;
                setSelectedFilter(filter);
            }
        } else if (!!selected.get(player?.id) && _remaining < 2) {
            _remaining++;
        } else {
            setSelectedFilter(_selectedFilter);
        }

        filter.remaining = _remaining;
        const filterIndex = filters?.findIndex((filter) => filter?.id === _selectedFilter?.id);
        const _filters = [...filters];
        _filters[filterIndex] = filter;
        setFilters(_filters);
    }

    const onDelete = (playerId) => {
        onSelectDeselect(playerId);
    }

    const onSearch = (e) => {
        const { value } = e.target;
        if (!isEmpty(value)) {
            const _filterdData = selectedData?.data?.filter(data =>
                data?.title?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
            );
            const _filterdDataObj = {
                cat: selectedData?.cat,
                data: _filterdData
            }
            setFilterdData(_filterdDataObj);
        } else {
            setFilterdData(selectedData);
        }
    }

    const onSelectSearchDropDown = (item) => {
        if (item === selectedDropDown) return setSelectedDropDown(null);

        setSelectedDropDown(item);
    }

    return (
        <>
            <Header />
            <div className={classes.wrapper}>
                <Header3
                    titleMain1="NHL 2021"
                    titleMain2="PowerdFS"
                    subHeader1="Introducing Live-Play Fantasy Baseball"
                    subHeader2="Play for your chance to win $1000!"
                    contestBtnTitle="Contest Rules"
                    prizeBtnTitle="Prize Grid"
                    bgImageUri={NHLBg}
                />

                <div className={classes.container}>
                    <div className={classes.container_left}>
                        <h2>Select your team</h2>
                        <div className={classes.container_left_header_2}>
                            <p>7 starters + 1 team D</p> <span className={classes.line} />
                        </div>

                        <div className={classes.container_top}>
                            <p>Select Position</p>
                            <div className={classes.container_top_1}>
                                <SportsFilters
                                    data={filters}
                                    onSelect={onSelectFilter}
                                    // activeFilter={selectedFilter}
                                    selectedFilter={selectedFilter}
                                />

                                <SearchInput
                                    onSearch={onSearch}
                                    onSelect={onSelectSearchDropDown}
                                    dropDown={dropDown}
                                    selected={selectedDropDown}
                                />
                            </div>
                        </div>

                        <div className={classes.container_body}>
                            <Card>
                                {
                                    (filterdData && filterdData?.data?.length) ? filterdData?.data?.map(
                                        (item, index) => (
                                            selectedFilter?.title === CONSTANTS.FILTERS.NHL.TD
                                                ?
                                                <SelectionCard2
                                                    title={item.title}
                                                    avgVal={item.avgVal}
                                                    teamA={item.teamA}
                                                    teamB={item.teamB}
                                                    time={item.time}
                                                    date={item.date}
                                                    stadium={item.stadium}
                                                    isSelected={!!selected.get(item.id)}
                                                    key={item.id}
                                                    onSelectDeselect={onSelectDeselect}
                                                    id={item.id}
                                                    steps={item?.steps && item?.steps}
                                                    isStarPlayer={item.isStarPlayer && item.isStarPlayer}
                                                    disabled={(item.isStarPlayer && item.isStarPlayer) && starPlayerCount >= 3}
                                                />
                                                :
                                                <SelectionCard
                                                    item={item}
                                                    isSelected={!!selected.get(item.id)}
                                                    key={item.id}
                                                    onSelectDeselect={onSelectDeselect}
                                                    disabled={(item.isStarPlayer && item.isStarPlayer) && starPlayerCount >= 3}
                                                />
                                        )
                                    )
                                        :
                                        <>No Data</>
                                }
                            </Card>
                        </div>

                        <SportsContestRules
                            img={MLBFooterImage}
                            basicRules={basicRules}
                            detailRules={detailRules}
                        />
                    </div>
                    <div className={classes.sidebar_container}>
                        <Sidebar>
                            <CashPowerBalance />
                            <div className={classes.sidebar_header}>
                                <h2>My Selections</h2>
                                <div className={classes.sidebar_header_1}>
                                    <img src={PowerPlayIcon} />
                                    <p>0/3 Star Power Players Selected</p>
                                </div>
                                <div className={classes.sidebar_circles}>
                                    {
                                        selectedStarPowers?.map(
                                            (isSelected, index) =>
                                                isSelected ?
                                                    <CheckIcon />
                                                    :
                                                    <Circle key={index.toString()} />)
                                    }
                                </div>
                            </div>
                            <SportsSidebarContent
                                data={playerList}
                                onDelete={(playerId) => onDelete(playerId)}
                            />
                            <button onClick={() => redirectTo(props, { path: '/nhl-live-powerdfs' })} className={classes.sidebar_button}>Submit!</button>
                        </Sidebar>
                    </div>
                </div>
            </div>
            <Footer isBlack={true} />
        </>
    )
}

export default NHLPowerdFs
