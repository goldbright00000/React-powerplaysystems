import React from 'react';
import classes from './hitters.module.scss';

const Hitters = () => {
    const data = [
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
    ];

    return (
        <div className={classes.__hitters}>
            <p className={classes.__hitters_title}>Hitters</p>
            {
                data.map((item, index) => {
                    return (
                        <div className={classes.__hitters_data}>
                            <div className={classes.__hitters_data_title_div}>
                                <p className={classes.__hitters_data_title}>{item.title}</p>
                            </div>
                            <div className={classes.__hitters_data_value_div}>
                                <p className={classes.__hitters_data_value}>{item.value}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Hitters;