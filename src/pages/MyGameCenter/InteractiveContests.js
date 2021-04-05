import React, { useState, useEffect } from 'react';
import classes from './interactiveContests.module.scss';
import {useDispatch} from 'react-redux';
import {setUserBalance} from '../../actions/userActions';
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import CashPowerBalance from '../../components/CashPowerBalance';
import { redirectTo } from '../../utility/shared';
import CustomDropDown from '../../components/CustomDropDown';
import MyGameCenterCard from '../../components/MyGameCenterCard';
import { URLS } from '../../config/urls';
import http from '../../config/http';

const myGameCenterCardData = [
    {
        id: 1,
        title: "MLB",
        prize: "5,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/mlb-powerdfs',
        inProgress: true,
        completed: false,
        teamManager: true,
        editPicks: false,
        makePicks: false,
        timeToStart: ''
    },
    {
        id: 2,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        inProgress: false,
        completed: false,
        teamManager: false,
        editPicks: false,
        makePicks: true,
        timeToStart: ''
    },
    {
        id: 3,
        title: "NBA",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nba-powerdfs',
        inProgress: false,
        completed: false,
        teamManager: true,
        editPicks: true,
        makePicks: false,
        timeToStart: ''
    },
    {
        id: 4,
        title: "NHL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nhl-powerdfs',
        inProgress: false,
        completed: false,
        teamManager: true,
        editPicks: true,
        makePicks: false,
        timeToStart: ''
    },
    {
        id: 5,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        inProgress: false,
        completed: false,
        teamManager: true,
        editPicks: true,
        makePicks: false,
        timeToStart: ''
    },
    {
        id: 6,
        title: "MLB",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        inProgress: false,
        completed: true,
        teamManager: false,
        editPicks: false,
        makePicks: false,
        timeToStart: ''
    },
    {
        id: 7,
        title: "NHL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        inProgress: false,
        completed: false,
        teamManager: true,
        editPicks: true,
        makePicks: false,
        timeToStart: '58 mins to start'
    },
    {
        id: 8,
        title: "NBA",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        inProgress: false,
        completed: false,
        teamManager: true,
        editPicks: true,
        makePicks: false,
        timeToStart: ''
    }
];

const options = [
    { value: 'FRI, Mar 12', label: 'FRI, Mar 12' },
    { value: 'SAT, Mar 13', label: 'SAT, Mar 13' },
    { value: 'SUN, Mar 14', label: 'SUN, Mar 14' },
    { value: 'MON, Mar 15', label: 'MON, Mar 15' },
    { value: 'TUE, Mar 16', label: 'TUE, Mar 16' },
    { value: 'WED, Mar 17', label: 'WED, Mar 17' },
    { value: 'THU, Mar 18', label: 'THU, Mar 18' },
];

const filters = [
    {
        id: 1,
        title: 'SHOW ALL',
        icon: ''
    },
    {
        id: 2,
        title: 'NFL',
        icon: <SuperBall />
    },
    {
        id: 3,
        title: 'NBA',
        icon: <BasketBall />
    },
    {
        id: 4,
        title: 'MLB',
        icon: <Ball />
    },
    {
        id: 5,
        title: 'NHL',
        icon: <Hockeys />
    },
];

const InteractiveContests = props => {
    const dispatch = useDispatch();
    const [isMobileDevice, setMobileDevice] = useState(false);
    const responsiveHandler = maxWidth => setMobileDevice(maxWidth.matches);

    const [selectedDate, setSelectedDate] = useState(options[0].value);
    const [showCardDetails, setShowCardDetails] = useState(-1);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [viewResults, setViewResults] = useState(-1);
    const [balance, setBalance] = useState({});
    const [finalStandingsModal, setFinalStandingsModal] = useState(-1);

    useEffect(() => {
        const maxWidth = window.matchMedia("(max-width: 1200px)");
        responsiveHandler(maxWidth);
        maxWidth.addEventListener('change', responsiveHandler);
        return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, []);

    useEffect(() => {
        setFilteredData(myGameCenterCardData);
        getUserBalance();
    }, []);

    const getUserBalance = async () => {
        const response = await http.get(URLS.USER.BALANCE);
        dispatch(setUserBalance(response.data));
        setBalance(response.data);
    };

    const myGameCenterCard = (item, redirectUri) => {
        return (
            <div className={classes.__interactive_contests_power_center_card}>
                <MyGameCenterCard
                    id={item.id}
                    title={item.title}
                    prize={item.prize}
                    outOf={item.outOf}
                    total={item.total}
                    percent={item.percent}
                    inProgress={item.inProgress}
                    completed={item.completed}
                    teamManager={item.teamManager}
                    editPicks={item.editPicks}
                    makePicks={item.makePicks}
                    timeToStart={item.timeToStart}
                    showDetails={showCardDetails == item.id}
                    viewResults={viewResults == item.id}
                    finalStandingsModal={finalStandingsModal == item.id}
                    onEnter={() => redirectTo(props, { path: redirectUri || '/' })}
                    onDetailsClick={(cardId) => setShowCardDetails(cardId)}
                    onBackClick={() => setShowCardDetails(-1)}
                    onNextClick={() => setShowCardDetails(-1)}
                    onViewResults={(cardId) => setViewResults(cardId)}
                    onViewResultsBack={() => setViewResults(-1)}
                    onFinalStandings={(cardId) => setFinalStandingsModal(cardId)}
                />
            </div>
        );
    }

    return (
        <>
            <div className='__table-wrapper __mb-6'>
                <div className='__flex'>
                    <div style={{ flex: 1 }}>
                        <div className='__badges-wrapper __text-in-one-line __mediam'>
                            {
                                filters.map((item, index) => {
                                    return (
                                        <div 
                                        className={'__outline-badge __f1 ' + (selectedFilter == item.id && '__active')}
                                        onClick={() => {
                                            setSelectedFilter(item.id);
                                            const filteredData = item.id === 1 
                                                ? 
                                                myGameCenterCardData 
                                                : 
                                                myGameCenterCardData.filter(cardItem => cardItem.title === item.title);
                                            setFilteredData(filteredData);
                                                
                                        }}>
                                            {item.icon}{item.title}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                        <CashPowerBalance 
                            cashBalance={balance.cashBalance}
                            powerBalance={balance.tokenBalance}
                            styles={{ margin: 0, backgroundColor: '#202124', boxShadow: 'none' }} 
                            onDepositClick={() => redirectTo(props, {path: '/my-account'})}
                        />
                    </div>
                </div>
                <div className={classes.__interactive_contests_filter}>
                    <div className={classes.__interactive_contests_most_popular}>
                        <p>All Active</p>
                    </div>
                    <div className={classes.__interactive_contests_prize_total}>
                        <p>Not Started</p>
                    </div>
                    <div className={classes.__interactive_contests_top_prize}>
                        <p>In Progress</p>
                    </div>
                    <div className={classes.__interactive_contests_min_entry}>
                        <p>Completed</p>
                    </div>
                    <div className={classes.__interactive_contests_date}>
                        <CustomDropDown 
                            value={selectedDate}
                            options={options}
                            onChange={selectedOption => setSelectedDate(selectedOption)}
                        />
                    </div>
                </div>

                {
                    (() => {
                        const itemsInaRow = 4;
                        const numberOfRows = Math.ceil(myGameCenterCardData.length / itemsInaRow);
                        const myGameCenterCardView = Array(numberOfRows).fill(undefined).map((item, i) => {
                            const start = ((i + 1) * itemsInaRow) - 4;
                            const end = ((i + 1) * itemsInaRow);
                            const items = filteredData.slice(start, end);

                            return (
                                <div className={classes.__interactive_contests_power_center_card_row}>
                                    {
                                        items.map(power => {
                                            return myGameCenterCard(power, power.url);
                                        })
                                    }
                                </div>
                            );
                        })
                        return myGameCenterCardView;
                    }
                    )()
                }
            </div>
        </>
    )
}

export default InteractiveContests;