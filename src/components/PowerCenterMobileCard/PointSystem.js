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
    const typeOne = Object.keys(groupedPoints)[0];
    const typeTwo = Object.keys(groupedPoints)[1];

    return (
        <div className={classes.__point_system}>
            <div className={classes.__point_system_date_time}>
                {game_set_start} | {start_time} ET
            </div>
            <div className={classes.__point_system_powerdfs}>
                <div>
                    <p className={classes.__point_system_powerdfs_title}>
                        <span className={classes.__point_system_powerdfs_title_first}>{title}</span> PowerdFS
                    </p>
                </div>
                <div className={classes.__point_system_title}>
                    Powers Available
                </div>
            </div>
            <div className={classes.__point_system_data_container}>
                <div className={classes.__point_system_data_content}>
                    <>
                        <div className={classes.__point_system_heading}>{typeOne}</div>
                        {groupedPoints[typeOne]?.map((item, index) => {
                            return (
                                <div className={classes.__point_system_data} key={index}>
                                    <div className={classes.__point_system_data_title_div}>
                                        <p className={classes.__point_system_data_title}>{item?.plays}</p>
                                    </div>
                                    <div className={classes.__point_system_data_value_div}>
                                        <p className={classes.__point_system_data_value}>+ {item?.points} Pts</p>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                </div>
                <div className={classes.__point_system_data_content}>
                    <>
                        <div className={classes.__point_system_heading} >{typeTwo}</div>
                        {groupedPoints[typeTwo]?.map((item, index) => {
                            return (
                                <div className={classes.__point_system_data} key={index}>
                                    <div className={classes.__point_system_data_title_div}>
                                        <p className={classes.__point_system_data_title}>{item?.plays}</p>
                                    </div>
                                    <div className={classes.__point_system_data_value_div}>
                                        <p className={classes.__point_system_data_value}>+{item?.points} Pts</p>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                </div>
            </div>
        </div>
    );
};

export default PointSystem;