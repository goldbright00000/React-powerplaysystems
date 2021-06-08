import React from 'react';
import classes from './hitters.module.scss';

const data = [
    {
        heading: 'Hitters',
        hitters: [
            {
                title: 'Single', // play
                value: '+ 3 Pts' // points
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

const Hitters = ({ PointsSystem }) => {
    return (
        <div className={classes.__hitters}>
            <p className={classes.__hitters_main_title}>Point System</p>
            {
                data.map((d, i) => {
                    return (
                        <>
                            <div className={classes.__hitters_heading}>{d.heading}</div>
                            {
                                PointsSystem.map((item, index) => {
                                    return (
                                        <div className={classes.__hitters_data}>
                                            <div className={classes.__hitters_data_title_div}>
                                                <p className={classes.__hitters_data_title}>{item?.plays}</p>
                                            </div>
                                            <div className={classes.__hitters_data_value_div}>
                                                <p className={classes.__hitters_data_value}>+{item?.points} Pts</p>
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

export default Hitters;