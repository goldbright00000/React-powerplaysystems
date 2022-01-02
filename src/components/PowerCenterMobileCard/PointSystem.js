import React from 'react';
import classes from './pointSystem.module.scss';
import _ from 'underscore';

const data1 = [
    {
        heading: 'Hitters',
        hitters: [
            {
                title: 'Single',
                value: '+ 3 Pts'
            },
            {
                title: 'Double',
                value: '+ 5 Pts'
            },
            {
                title: 'Tripple',
                value: '+ 8 Pts'
            },
            {
                title: 'Home Run',
                value: '+ 10 Pts'
            },
            {
                title: 'Run Batted in',
                value: '+ 2 Pts'
            },
        ]
    }
];

const data2 = [
    {
        heading: '',
        hitters: [
            {
                title: 'Run',
                value: '+ 2 Pts'
            },
            {
                title: 'Base on Balls',
                value: '+ 2 Pts'
            },
            {
                title: 'Hit by Pitch',
                value: '+ 2 Pts'
            },
            {
                title: 'Stolen Base',
                value: '+ 5 Pts'
            },
        ]
    }
];

const PointSystem = (props) => {
    const {
        title = '',
        PointsSystem = [],
        game_set_start = '',
        start_time = '',
    } = props || {};

    const groupedPoints = _.groupBy(PointsSystem, 'type');
    console.log("groupedPoints",  groupedPoints);
    const typeOne = Object.keys(groupedPoints)[0];
    const typeTwo = Object.keys(groupedPoints)[1];

    return (
        <div className={classes.__point_system}>
            <div className={classes.__point_system_date_time}>
                {game_set_start} | {start_time} ET
            </div>
            <div className={classes.__my_game_center_card_powerdfs}>
                <p className={`text-left`} >
                    <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                        {title}
                    </span>
                    <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> PowerdFS </span>
                    <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px', opacity: 0.6 }}>
                        Point System
                    </span>
                </p>
            </div>
            <div className={classes.__point_system_data_container} style={{
                display: "block"
            }}>
                <div className={classes.__point_system_data_content}>
                    <>
                        <div className={classes.__point_system_heading} style={{
                            paddingLeft: 15
                        }}>{groupedPoints["Skater"] ? "Skater" : ""}</div>
                        {groupedPoints["Skater"]?.map((item, index) => {
                            console.log('item', item);
                            
                                return (
                                    <div className={classes.__point_system_data} key={index}>
                                        <div className={classes.__point_system_data_title_div}>
                                            <p className={classes.__point_system_data_title}>{item?.plays}</p>
                                        </div>
                                        <div className={classes.__point_system_data_value_div}>
                                            <p className={classes.__point_system_data_value}>{item?.action} {item?.points} Pts</p>
                                        </div>
                                    </div>
                                );
                            
                        })}
                    </>
                </div>
                <div className={classes.__point_system_data_content}>
                    <>
                        <div className={classes.__point_system_heading}></div>
                        {groupedPoints[typeOne]?.map((item, index) => {
                            if (index >= 5) {
                                return (
                                    <div className={classes.__point_system_data} key={index}>
                                        <div className={classes.__point_system_data_title_div}>
                                            <p className={classes.__point_system_data_title}>{item?.plays}</p>
                                        </div>
                                        <div className={classes.__point_system_data_value_div}>
                                            <p className={classes.__point_system_data_value}>{item?.action} {item?.points} Pts</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </>
                </div>
            </div>
        </div>
    );
};

export default PointSystem;