import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './interactiveContests.module.scss';
import Ball from '../../icons/Ball';
import BasketBall from '../../icons/BasketBall';
import Hockeys from '../../icons/Hockeys';
import SuperBall from '../../icons/SuperBall';
import PowerPlayGridRow from './PowerPlayGridRow';
import Scrollbar from '../../utility/Scrollbar';
import CashPowerBalance from '../../components/CashPowerBalance';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import PowerCenterCard from '../../components/PowerCenterCard';
import PowerCenterCardDetails from '../../components/PowerCenterCardDetails';

const powerCenterCardData = [
    {
        id: 1,
        title: "MLB",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 2,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 3,
        title: "NBA",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 4,
        title: "NHL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
    },
    {
        id: 5,
        title: "NFL",
        prize: "10,000",
        outOf: "58,589",
        total: "200,000",
        percent: "29",
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

const InteractiveContests = props => {
    const [isMobileDevice, setMobileDevice] = useState(false);
    const responsiveHandler = maxWidth =>  setMobileDevice(maxWidth.matches);

    const options = [
        { value: 'FRI, Mar 12', label: 'FRI, Mar 12' },
        { value: 'SAT, Mar 13', label: 'SAT, Mar 13' },
        { value: 'SUN, Mar 14', label: 'SUN, Mar 14' },
        { value: 'MON, Mar 15', label: 'MON, Mar 15' },
        { value: 'TUE, Mar 16', label: 'TUE, Mar 16' },
        { value: 'WED, Mar 17', label: 'WED, Mar 17' },
        { value: 'THU, Mar 18', label: 'THU, Mar 18' },
    ];
    const [selectedDate, setSelectedDate] = useState(options[0]);
    const [showDetails, setShowDetails] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(-1);

    const customStyles = {
        control: (base, state) => ({ 
            ...base, 
            width: 150,
            backgroundColor: '#303133',
            borderWidth: 0,
            borderRadius: 0,
            boxShadow: 'none'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#688fbd' : '#303133',
            opacity: state.isSelected ? 0.5 : 1.0,
            borderBottom: '1px solid #111111',
            color: state.isSelected ? '#ffffff' : '#f2f2f2',
            padding: 10,
            width: 150,
            height: 48,
            fontSize: 16
        }),
        indicatorSeparator: (base) => ({
            ...base,
            width: 0
        }),
        dropdownIndicator: base => ({
            ...base,
            color: '#f2f2f2',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#f2f2f2',
            fontSize: 16
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#303133'
        })
    };

    useEffect(() => {
        const maxWidth = window.matchMedia("(max-width: 1200px)");
        responsiveHandler(maxWidth);
        maxWidth.addEventListener('change', responsiveHandler);
        return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, [])

    const powerCard = (item) => {
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
					onDetailsClick={(cardId) => setShowCardDetails(cardId)}
				/>
			</div>
		);
	}

		// const itemsInaRow = 4;

		// const numberOfRows = Math.ceil(powerCenterCardData.length / itemsInaRow);
		// const powerCenterCardView = Array(numberOfRows).fill(undefined).map((item, i) => {

		// 	const start = ((i + 1) * itemsInaRow) - 4;
		// 	const end = ((i + 1) * itemsInaRow);
		// 	const items = powerCenterCardData.slice(start, end);

		// 	return (
		// 		<div className={classes.__interactive_contests_power_center_card_row}>
		// 			{
		// 				items.map(power => {
		// 					return powerCard(power);
		// 				})
		// 			}
		// 		</div>
		// 	);
		// })

    return (
        <>
        <div className='__table-wrapper __mb-6'>
            <div className='__flex'>
                <div style={{ flex: 1 }}>
                    <div className='__badges-wrapper __text-in-one-line __mediam'>
                        <NavLink to='/' className='__outline-badge __f1 __active'><SuperBall />NFL</NavLink>
                        <NavLink to='/' className='__outline-badge __f1'><BasketBall />NBA</NavLink>
                        <NavLink to='/' className='__outline-badge __f1'><Ball />MLB</NavLink>
                        <NavLink to='/' className='__outline-badge __f1'><Hockeys />NHL</NavLink>
                        <NavLink to='/' className='__outline-badge __f1'>Show All</NavLink>
                    </div>
                </div>
                <div  style={{ flex: 1, marginLeft: 380 }}>
                    <CashPowerBalance styles={{margin: 0, backgroundColor: '#202124'}} />
                </div>
            </div>
            <div className={classes.__interactive_contests_filter}>
                <div className={classes.__interactive_contests_most_popular}>
                    <p>Most Popular</p>
                </div>
                <div className={classes.__interactive_contests_prize_total}>
                    <p>Prize Total 
                        <i className={classes.__interactive_contests_arrow + ' ' + classes.__interactive_contests_down}></i>
                    </p>
                </div>
                <div className={classes.__interactive_contests_top_prize}>
                    <p>Top Prize
                        <i className={classes.__interactive_contests_arrow + ' ' + classes.__interactive_contests_down}></i>
                    </p>
                </div>
                <div className={classes.__interactive_contests_min_entry}>
                    <p>Min Entry</p>
                </div>
                <div className={classes.__interactive_contests_date}>
                    <DropDownMenu
                        defaultValue={options[0]}
                        value={selectedDate}
                        options={options} 
                        onChange={selectedOption => setSelectedDate(selectedOption)}
                        styles={customStyles}
                    />
                </div>
            </div>

                {
					(() => {
                                const itemsInaRow = 4;
                                const numberOfRows = Math.ceil(powerCenterCardData.length / itemsInaRow);
                                const powerCenterCardView = Array(numberOfRows).fill(undefined).map((item, i) => {
                                    const start = ((i + 1) * itemsInaRow) - 4;
                                    const end = ((i + 1) * itemsInaRow);
                                    const items = powerCenterCardData.slice(start, end);

                                        return (
                                            <div className={classes.__interactive_contests_power_center_card_row}>
                                                {
                                                    items.map(power => {
                                                        return powerCard(power);
                                                    })
                                                }
                                            </div>
                                        );
                                    })
							    return powerCenterCardView;
						}
					)()
				}
            
            
            {/* <Scrollbar className='__power-center-scrollbar'>
                <div className='__table __block-on-large'>
                    {!isMobileDevice && (
                        <Fragment>
                            <div className='__h6'>Sport</div>
                            <div className='__h6'>Contest</div>
                            <div className='__h6'>Entries (min)</div>
                            <div className='__h6'>Total Prize</div>
                            <div className='__h6'></div>
                        </Fragment>
                    )}
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='MLB PowerdFS'
                        entries='58589'
                        totalEntries='200000'
                        prize='800'
                        pointsRequired='1000'
                        isMobileDevice={isMobileDevice}
                        link="/mlb-powerdfs"
                    />
                    <PowerPlayGridRow
                        contest='NHL'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='NHL PowerdFS'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                        link="/nhl-powerdfs"
                    />
                    <PowerPlayGridRow
                        contest='NHL Live'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='NHL Live PowerdFS'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                        link="/nhl-live-powerdfs"
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='NBA PowerdFS'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                        link="/nba-powerdfs"
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='15385'
                        totalEntries='19161'
                        prize='$1K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='21’s'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='21’s'
                        entries='1497'
                        totalEntries='150000'
                        prize='3000'
                        pointsRequired='10000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='MLB'
                        Icon={Ball}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='PowerLine'
                        entries='27433'
                        totalEntries='71856'
                        prize='$3K in Bonus Cash'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NFL'
                        Icon={SuperBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power DFS'
                        entries='32975'
                        totalEntries='250000'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                    <PowerPlayGridRow
                        contest='NBA'
                        Icon={BasketBall}
                        date='Oct 24, 2020'
                        time='8:00PM ET'
                        type='Power Draft'
                        entries='18699'
                        totalEntries='247904'
                        prize='3000'
                        isMobileDevice={isMobileDevice}
                    />
                </div>
            </Scrollbar> */}
        </div>
        </>
    )
}

export default InteractiveContests;