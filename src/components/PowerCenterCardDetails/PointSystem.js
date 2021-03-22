import React from 'react';
import classes from './pointSystem.module.scss';

const data = [
    {
        heading: 'Skaters',
        points: [
            {
                title: 'Goal',
                value: '10 Pts'
            },
            {
                title: 'Short handed Goal',
                value: '12 Pts'
            },
            {
                title: 'Assist',
                value: '5 Pts'
            },
            {
                title: 'Short-handed Assist',
                value: '7 Pts'
            },
            {
                title: 'Shot on Goal',
                value: '1 Pts'
            },
            {
                title: 'Blocked Shot',
                value: '1 Pts'
            },
            {
                title: 'Shootout Goal',
                value: '12 Pts'
            },
        ]
    },
    {
        heading: 'Goalies',
        points: [
            {
                title: 'Save',
                value: '1 Pts'
            }
        ]
    }
];

const PointSystem = () => {
    return (
        <div className={classes.__point_system}>
            <p className={classes.__point_system_title}>Point System</p>
            {
                data.map((d, i) => {
                    return (
                        <>
                            <div className={classes.__point_system_heading}>{d.heading}</div>
                            {
                                d.points.map((item, index) => {
                                    return (
                                        <div className={classes.__point_system_data}>
                                            <div className={classes.__point_system_data_title_div}>
                                                <p className={classes.__point_system_data_title}>{item.title}</p>
                                            </div>
                                            <div className={classes.__point_system_data_value_div}>
                                                <p className={classes.__point_system_data_value}>{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </>
                    );
                })
            }
        </div>
    );
};

export default PointSystem;