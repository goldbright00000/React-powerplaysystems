import React, { useState, useCallback } from 'react';
import { isEmpty, isEqual } from 'lodash';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import NHLBg from '../../assets/NHLBG.jpg';
import SearchIcon from '../../icons/SearchIcon';
import Tick2 from '../../icons/Tick2';
import ContestRulesIcon from '../../icons/ContestRules';
import RightArrow from '../../assets/right-arrow.png';
import MLBFooterImage from '../../assets/NHL.png';
import PowerPlayIcon from '../../assets/token.png';
import Card from '../../components/PowerpickCard';
import Sidebar from '../../components/Sidebar';
import CashPowerBalance from '../../components/CashPowerBalance';
import Circle from '../../icons/CircleEmpty';
import SportsSidebarContent from '../../components/SportsSidebarContent';
import SelectionCard from '../../components/SportsSelectionCard';
import EmployeeIcon from '../../icons/Employee';
import SportsFilters from '../../components/SportsFilters';
import CheckIcon from '../../icons/Check';
import { dummyData } from './dummyData';
import { CONSTANTS } from '../../utility/constants';

const INITIAL_PLAYER_LIST = [
    {
        title: 'C1',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.CENTER
    },
    {
        title: 'C2',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.CENTER
    },
    {
        title: 'W1',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.LW
    },
    {
        title: 'W2',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.RW
    },
    {
        title: 'D1',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.D
    },
    {
        title: 'D2',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.D
    },
    {
        title: 'G',
        value: '',
        filter: CONSTANTS.FILTERS.NHL.G
    },
    {
        title: 'TD',
        value: '',
        icon: EmployeeIcon,
        filter: CONSTANTS.FILTERS.NHL.TD
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
        remaining: 2,
    },
    {
        id: 3,
        title: CONSTANTS.FILTERS.NHL.RW,
        remaining: 2,
    },
    {
        id: 4,
        title: CONSTANTS.FILTERS.NHL.D,
        remaining: 2,
    },
    {
        id: 5,
        title: CONSTANTS.FILTERS.NHL.G,
        remaining: 2,
    },
    {
        id: 6,
        title: CONSTANTS.FILTERS.NHL.TD,
        remaining: 2,
    },
]

let starPowerIndex = 0;

function NHLPowerdFs() {
    const [showTeamSelection, setTeamSelectionState] = useState(false);
    const [selected, setSelected] = useState(new Map());
    const [selectedFilter, setSelectedFilter] = useState({});
    const [selectedStarPowers, setStartPowers] = useState([false, false, false]);
    const [playerList, setPlayerList] = useState(INITIAL_PLAYER_LIST)
    const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
    const [selectedData, setSelectedData] = useState(dummyData[0]);

    const onSelectDeselect = useCallback((id) => {
        const _selected = new Map(selected);
        _selected.set(id, !selected.get(id));

        const _data = selectedData?.data?.filter(d => d?.id === id);
        const [_selectedFilter] = filters?.filter(filter => filter?.title === selectedData?.cat);
        activateFilter(_selectedFilter, _selectedFilter?.id);

        //star powers
        const [starPower] = _data?.filter(filter => filter?.isStartPower);
        const _selectedStarPowers = [...selectedStarPowers];
        if (starPower) {
            if (!!_selected.get(id)) {
                _selectedStarPowers[starPowerIndex] = true;
                if (starPowerIndex < 3) {
                    starPowerIndex++;
                }
            } else {
                if (starPowerIndex > 0) {
                    starPowerIndex--;
                }
                _selectedStarPowers[starPowerIndex] = false;
            }
        }

        //selected players
        const _playersList = [...playerList];
        if (!!_selected.get(id)) {
            const [_player] = _playersList?.filter(
                player => player?.filter === selectedData?.cat && isEmpty(player.value)
            );
            if (!isEmpty(_player) && isEmpty(_player.value)) {
                const playerListIndex = _playersList?.findIndex(
                    player => player?.filter === selectedData?.cat && isEmpty(player)
                );
                let player = _player;
                player.value = _data[0]?.title;
                _playersList[playerListIndex] = player;
                setSelected(_selected);
                setStartPowers(_selectedStarPowers);
            }
        } else {
            let existingPlayerIndex = _playersList?.findIndex(
                player => isEqual(player?.value, _data[0]?.title)
            );
            _playersList[existingPlayerIndex].value = '';
            setSelected(_selected);
            setStartPowers(_selectedStarPowers);
        }

        setPlayerList(_playersList);
    }, [selected, selectedFilter, selectedData]);

    const onSelectFilter = useCallback(id => {
        const [_selectedFilter] = filters?.filter(filter => filter.id === id);
        const [_selectedData] = dummyData?.filter((data) => data?.cat === _selectedFilter?.title);

        setSelectedData(_selectedData);
    }, [selectedFilter]);

    const activateFilter = (selectedFilter, id) => {
        if (selectedFilter?.remaining > 0) {
            const filter = selectedFilter;
            let _remaining = filter?.remaining;
            _remaining -= 1;
            if (_remaining <= 0) {
                _remaining = 0;
                setSelectedFilter(filter);
            }
            filter.remaining = _remaining;
            const filterIndex = filters?.findIndex((filter) => filter?.id === id);
            const _filters = [...filters];
            _filters[filterIndex] = filter;
            setFilters(_filters);
        } else {
            setSelectedFilter(selectedFilter);
        }
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
                                <SportsFilters data={filters} onSelect={onSelectFilter} activeFilter={selectedFilter} />

                                <form className={classes.search_form}>
                                    <span>
                                        <SearchIcon />
                                        <input placeholder="Search by Player name ..." name="playerSearch" required />
                                    </span>

                                    <div className={classes.search_dropdown} onClick={() => setTeamSelectionState(!showTeamSelection)}>
                                        All Team <span className={`${classes.arrow} ${showTeamSelection ? classes.up : classes.down}`} />
                                        {
                                            showTeamSelection &&
                                            <div className={classes.search_dropdown_menu} onMouseLeave={() => setTeamSelectionState(false)}>
                                                <span>Team A</span>
                                                <span className={classes.active}>Team A</span>
                                                <span>Team A</span>
                                                <span>Team A</span>
                                            </div>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={classes.container_body}>
                            <Card>
                                {
                                    selectedData && selectedData?.data?.length && selectedData?.data?.map((item, index) => <SelectionCard
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
                                        isStartPower={item.isStartPower && item.isStartPower}
                                    />)
                                }
                            </Card>
                        </div>

                        <div className={classes.container_footer}>
                            <div className={classes.container_footer_header}>
                                <ContestRulesIcon />
                                <div className={classes.container_footer_title}>
                                    <h2>
                                        Contest Rules
                                    </h2>
                                    <span className={classes.separator} />
                                </div>
                            </div>
                            <div className={classes.container_footer_1}>
                                <div className={classes.container_footer_header_1}>
                                    <p><Tick2 size={25} /> No purchase necessary.</p>
                                    <p><Tick2 size={25} /> Open to residents of United States who are over the age of majority.</p>
                                    <p><Tick2 size={25} /> Contest closes at 11:59pm ET - April 22, 2020.</p>
                                </div>
                                <div className={classes.container_footer_body}>
                                    <p><span /> Five (5) prizes to be won. See full rules for complete details of all prizes.</p>
                                    <p><span /> One entry per person.</p>
                                    <p><span /> Odds of winning depend on player knowledge.</p>
                                    <p><span /> Mathematical skill testing question must be correctly answered to win.</p>

                                    <button>See Full Rules <img src={RightArrow} /></button>

                                    <img src={MLBFooterImage} className={classes.container_body_img} />
                                </div>
                            </div>
                        </div>
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
                                        selectedStarPowers?.map((isSelected, index) => isSelected ? <CheckIcon /> : <Circle key={index.toString()} />)
                                    }
                                </div>
                            </div>
                            <SportsSidebarContent data={playerList} />
                            <button className={classes.sidebar_button}>Submit!</button>
                        </Sidebar>
                    </div>
                </div>
            </div>
            <Footer isBlack={true} />
        </>
    )
}

export default NHLPowerdFs
