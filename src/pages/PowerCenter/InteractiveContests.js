import React, { useState, useEffect, useRef } from 'react';
import classes from './interactiveContests.module.scss';
import { useMediaQuery } from 'react-responsive';
import moment from "moment";
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import PowerCenterCard from '../../components/PowerCenterCard';
import { getDaysFromToday, redirectTo } from '../../utility/shared';
import CustomDropDown from '../../components/CustomDropDown';
import FilledArrow from '../../components/FilledArrow';
import PowerCenterMobileCard from '../../components/PowerCenterMobileCard';

const powerCenterCardData = [
    {
        id: 1,
        title: "MLB",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/mlb-powerdfs'
    },
    {
        id: 2,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nfl-powerdfs'
    },
    {
        id: 3,
        title: "NBA",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nba-powerdfs'
    },
    {
        id: 4,
        title: "NHL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nhl-powerdfs'
    },
    {
        id: 5,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
        url: '/nfl-powerdfs'
    },
    {
        id: 6,
        title: "MLB",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 7,
        title: "NHL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 8,
        title: "NBA",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    }
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

const ALL_CURRENCIES = [
    {
        label: 'US Dollar',
        value: 'usd'
    },
    {
        label: 'Bitcoin',
        value: 'bitcoin'
    },
    {
        label: 'Ethereum',
        value: 'ethereum'
    }
];

let mlbData = [];
let nflData = [];
let nbaData = [];
let nhlData = [];

const InteractiveContests = props => {
    const [isMobileDevice, setMobileDevice] = useState(false);
    const responsiveHandler = maxWidth => setMobileDevice(maxWidth.matches);
    const currencyMenuRef = useRef(null);
    const isMobile = useMediaQuery({ query: '(max-width: 414px)' });

    const [selectedDate, setSelectedDate] = useState(getDaysFromToday()[0].label);
    const [showCardDetails, setShowCardDetails] = useState(-1);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [currencyMenu, setCurrencyMenu] = useState(false);
    const [selectedCurrencies, setSelectedCurrencies] = useState(['usd', 'bitcoin', 'ethereum']);
    const [days, setDays] = useState([{}]);

    useEffect(() => {
        const maxWidth = window.matchMedia("(max-width: 1200px)");
        responsiveHandler(maxWidth);
        maxWidth.addEventListener('change', responsiveHandler);
        return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, []);

    useEffect(() => {
        setFilteredData(powerCenterCardData);
        setDays(getDaysFromToday());
    }, []);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    useEffect(() => {
        if (isMobile) {
            powerCenterCardData.map((item, index) => {
                if (item.title == 'MLB') {
                    mlbData.push(item);
                } else if (item.title == 'NFL') {
                    nflData.push(item);
                }  else if (item.title == 'NBA') {
                    nbaData.push(item);
                } else {
                    nhlData.push(item);
                }
            });
        }
    }, []);

    const handleClick = e => {
        if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
            setCurrencyMenu(false);
        }
    };

    const powerCenterCard = (item, redirectUri) => {
        return (
            <div className={classes.__interactive_contests_power_center_card}>
                <PowerCenterCard
                    id={item.id}
                    title={item.title}
                    prize={item.prize}
                    outOf={item.outOf}
                    total={item.total}
                    percent={item.percent}
                    showDetails={showCardDetails == item.id}
                    onEnter={() => redirectTo(props, { path: redirectUri || '/' })}
                    onDetailsClick={(cardId) => setShowCardDetails(cardId)}
                    onBackClick={() => setShowCardDetails(-1)}
                    onNextClick={() => setShowCardDetails(-1)}
                />
            </div>
        );
    }

    const powerCenterMobileCard = (item, redirectUri) => {
        return (
            <div className={classes.__interactive_contests_power_center_card}>
                <PowerCenterMobileCard
                    id={item.id}
                    title={item.title}
                    prize={item.prize}
                    outOf={item.outOf}
                    total={item.total}
                    percent={item.percent}
                    showDetails={showCardDetails == item.id}
                    onEnter={() => redirectTo(props, { path: redirectUri || '/' })}
                    onDetailsClick={(cardId) => setShowCardDetails(cardId)}
                    onBackClick={() => setShowCardDetails(-1)}
                    onNextClick={() => setShowCardDetails(-1)}
                />
            </div>
        );
    }

    return (
        <>
            <div className='__table-wrapper __mb-6'>
                <div className={isMobile ? '' : '__flex'}>
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
                                                powerCenterCardData 
                                                : 
                                                powerCenterCardData.filter(cardItem => cardItem.title === item.title);
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
                        
                    </div>
                </div>
                {
                    isMobile
                    ?
                    <div className={classes.__interactive_contests_filter}>
                        <div className={classes.__interactive_contests_most_popular}>
                            <p>
                                Most Popular
                                <FilledArrow down={true} />
                            </p>
                        </div>
                        <div className={classes.__interactive_contests_date}>
                            <CustomDropDown 
                                value={selectedDate}
                                options={days}
                                onChange={selectedOption => setSelectedDate(selectedOption)}
                            />
                        </div>
                    </div>
                    :
                <div className={classes.__interactive_contests_filter}>
                    <div className={classes.__interactive_contests_most_popular}>
                        <p>Most Popular</p>
                    </div>
                    <div className={classes.__interactive_contests_prize_total}>
                        <p>Prize Total
                        <FilledArrow down={true} />
                        </p>
                    </div>
                    <div className={classes.__interactive_contests_top_prize}>
                        <p>Top Prize
                        <FilledArrow down={true} />
                        </p>
                    </div>
                    <div className={classes.__interactive_contests_min_entry}>
                        <p>Min Entry</p>
                    </div>
                    <div className={`${classes.__interactive_contests_top_prize} ${classes.__drop_down_menu}`} ref={currencyMenuRef}>
                        <p onClick={() => setCurrencyMenu(!currencyMenu)}>Currency
                        {
                            currencyMenu
                            ?
                            <FilledArrow up={true} />
                            :
                            <FilledArrow down={true} />
                        }
                        </p>
                        {
                            currencyMenu
                            &&
                            <div className={classes.__currency_menu}>
                            {
                                ALL_CURRENCIES.map((item, index) => {
                                    return (
                                        <div 
                                            key={index}
                                            className={
                                                `${classes.__currency_menu_item} 
                                                ${selectedCurrencies.includes(item.value) && classes.__currency_menu_selected}`
                                            }
                                            onClick={() => {
                                                const newCurrencyData = [...selectedCurrencies];
                                                // Check if currency exist in array
                                                const i = newCurrencyData.indexOf(item.value);
                                                if (i > -1) {
                                                    newCurrencyData.splice(i, 1);
                                                } else {
                                                    newCurrencyData.push(item.value);
                                                }
                                                setSelectedCurrencies(newCurrencyData);
                                            }}>
                                            {item.label}
                                        </div>
                                    );
                                })
                            }
                        </div>
                        }
                    </div>
                    <div className={classes.__interactive_contests_date}>
                        <CustomDropDown 
                            value={selectedDate}
                            options={days}
                            onChange={selectedOption => setSelectedDate(selectedOption)}
                        />
                    </div>
                </div>
                }

                {
                    isMobile
                    ?
                    (() => {
                        const itemsInaRow = 1;
                        const numberOfRows = Math.ceil(powerCenterCardData.length / itemsInaRow);
                        const powerCenterMobileCardView = Array(numberOfRows).fill(undefined).map((item, i) => {
                            const start = ((i + 1) * itemsInaRow) - 1;
                            const end = ((i + 1) * itemsInaRow);
                            const items = filteredData.slice(start, end);

                            return (
                                <div className={classes.__interactive_contests_power_center_card_row}>
                                    {
                                        items.map(power => {
                                            return powerCenterMobileCard(power, power.url);
                                        })
                                    }
                                </div>
                            );
                        })
                        return powerCenterMobileCardView;
                    }
                    )()
                    :
                    (() => {
                        const itemsInaRow = 4;
                        const numberOfRows = Math.ceil(powerCenterCardData.length / itemsInaRow);
                        const powerCenterCardView = Array(numberOfRows).fill(undefined).map((item, i) => {
                            const start = ((i + 1) * itemsInaRow) - 4;
                            const end = ((i + 1) * itemsInaRow);
                            const items = filteredData.slice(start, end);

                            return (
                                <div className={classes.__interactive_contests_power_center_card_row}>
                                    {
                                        items.map(power => {
                                            return powerCenterCard(power, power.url);
                                        })
                                    }
                                </div>
                            );
                        })
                        return powerCenterCardView;
                    }
                    )()
                }
                <div className={classes.__power_up_text}>
                    Power-Up to experience our ground-breaking live-play games where you have the Power to control your team’s destiny. *
                </div>
                <button className={classes.__power_up_btn}>
                    Power Up!
                </button>
            </div>
        </>
    )
}

export default InteractiveContests;