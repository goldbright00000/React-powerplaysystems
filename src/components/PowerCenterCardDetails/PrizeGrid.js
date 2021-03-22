import React from 'react';
import classes from './prizeGrid.module.scss';

const PrizeGrid = () => {
    const data = [
        {
            title: '1st',
            value: '$2,000.00'
        },
        {
            title: '2nd',
            value: '$750.00'
        },
        {
            title: '3rd',
            value: '$350.00'
        },
        {
            title: '4th',
            value: '$200.00'
        },
        {
            title: '5th',
            value: '$150.00'
        },
        {
            title: '6th - 7th',
            value: '$100.00'
        },
        {
            title: '8th - 10th',
            value: '$80.00'
        },
        {
            title: '11th - 15th',
            value: '$60.00'
        },
        {
            title: '16th - 20th',
            value: '$50.00'
        },
        {
            title: '21st - 30th',
            value: '$40.00'
        },
    ];

    return (
        <div className={classes.__prize_grid}>
            <p className={classes.__prize_grid_title}>Prize Grid</p>
            {
                data.map((item, index) => {
                    return (
                        <div className={classes.__prize_grid_data}>
                            <div className={classes.__prize_grid_data_title_div}>
                                <p className={classes.__prize_grid_data_title}>{item.title}</p>
                            </div>
                            <div className={classes.__prize_grid_data_value_div}>
                                <p className={classes.__prize_grid_data_value}>{item.value}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default PrizeGrid;