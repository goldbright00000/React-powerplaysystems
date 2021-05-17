import React, {useState} from 'react';
import classes from './powersAvailable.module.scss';
import PointBooster from '../../assets/point-booster-mobile.png';
import SwapPlayer from '../../assets/swap-player-mobile.png';
import Undo from '../../assets/undo-mobile.png';
import RetroBoost from '../../assets/retro-boost-mobile.png';
import DWall from '../../assets/d-wall-mobile.png';
import VideoReview from '../../assets/video-review-mobile.png';

const data1 = [
    {
        id: 1,
        icon: PointBooster,
        count: 2,
        value: 'Point Booster'
    },
    {
        id: 2,
        icon: SwapPlayer,
        count: 2,
        value: 'Swap Player'
    },
    {
        id: 3,
        icon: Undo,
        count: 2,
        value: 'Undo'
    },
];

const data2 = [
    {
        id: 4,
        icon: RetroBoost,
        count: 3,
        value: 'Retro Boost'
    },
    {
        id: 5,
        icon: DWall,
        count: 2,
        value: 'D-Wall'
    },
    {
        id: 6,
        icon: VideoReview,
        count: 2,
        value: 'Video Review'
    },
];

const PowersAvailable = (props) => {
    const {title = ''} = props || {};

    return (
        <div className={classes.__powers_available}>
            <div className={classes.__powers_available_date_time}>
                Oct 24, 2020  |  8:00PM ET
            </div>
            <div className={classes.__powers_available_powerdfs}>
                <div>
                    <p className={classes.__powers_available_powerdfs_title}>
                        <span className={classes.__powers_available_powerdfs_title_first}>{title}</span> PowerdFS
                    </p>
                </div>
                <div className={classes.__powers_available_title}>
                    Powers Available
                </div>
            </div>
            <div className={classes.__powers_available_data_container}>
                {
                    data1.map((item, index) => {
                        return (
                            <div className={classes.__powers_available_data} key={index}>
                                <div className={classes.__powers_available_data_icon_div}>
                                    <img src={item.icon} width="34" height="34" className={classes.__powers_available_data_icon} />
                                    <div className={classes.__powers_available_data_power_count}>
                                        <p>
                                            {item.count}
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.__powers_available_data_value_div}>
                                    <p className={classes.__powers_available_data_value}>{item.value}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.__powers_available_data_container}>
                {
                    data2.map((item, index) => {
                        return (
                            <div className={classes.__powers_available_data} key={index}>
                                <div className={classes.__powers_available_data_icon_div}>
                                    <img src={item.icon} width="34" height="34" className={classes.__powers_available_data_icon} />
                                    <div className={classes.__powers_available_data_power_count}>
                                        <p>
                                            {item.count}
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.__powers_available_data_value_div}>
                                    <p className={classes.__powers_available_data_value}>{item.value}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PowersAvailable;