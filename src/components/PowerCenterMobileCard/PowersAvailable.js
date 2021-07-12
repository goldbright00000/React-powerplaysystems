import React from 'react';
import classes from './powersAvailable.module.scss';
import PointBooster from '../../assets/point-booster-mobile.png';
import SwapPlayer from '../../assets/swap-player-mobile.png';
import Undo from '../../assets/undo-mobile.png';
import RetroBoost from '../../assets/retro-boost-mobile.png';
import DWall from '../../assets/d-wall-mobile.png';
import VideoReview from '../../assets/video-review-mobile.png';
import PointMultipliers from '../../assets/point-multipliers.png';
import PlayerSwaps from '../../assets/player-swaps.png';
import InfoIcon from '../../assets/info-icon@3x.png';
import Challange from '../../assets/challenge.svg';

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

const getIcon = (powerName) => {
    if (powerName) {
        if (powerName.toLowerCase().match(/wall/g))
            return DWall;

        else if (powerName.toLowerCase().match(/video|review/g))
            return VideoReview;

        else if (powerName.toLowerCase().match(/swap/g))
            return PlayerSwaps;

        else if (powerName.toLowerCase().match(/multi|boost/g))
            return PointMultipliers;

        else if (powerName.toLowerCase().match(/retro/g))
            return RetroBoost;

        else if (powerName.toLowerCase().match(/challenge/g))
            return Challange;
    }
}

const PowersAvailable = (props) => {
    const {
        title = '',
        Power = [],
        game_set_start = '',
        start_time = '',
    } = props || {};

    return (
        <div className={classes.__powers_available}>
            <div className={classes.__powers_available_date_time}>
                {game_set_start} | {start_time} ET
            </div>
            <div className={classes.__powers_available_powerdfs}>
                <div className={classes.__power_info_main}>
                    <div className={classes.__info_main_title}>
                        <p className={classes.__powers_available_title}>
                            Powers Available
                        </p>
                    </div>
                    {/* <div className={classes.__info_icon_mobile}>
                        < img src={InfoIcon} className={classes.__info_icon} alt="" srcset="" />
                    </div> */}
                </div>
                <div className={classes.__powers_available_title}>
                    Powers Available
                </div>
            </div>
            <div className={classes.__powers_available_data_container}>
                {
                    Power?.map((item, index) =>
                        <>
                            {index < 3 && (
                                <div className={classes.__powers_available_data} key={index}>
                                    <div className={classes.__powers_available_data_icon_div}>
                                        <img src={getIcon(item?.powerName)} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                                        <div className={classes.__powers_available_data_power_count}>
                                            <p>
                                                {item?.amount}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={classes.__powers_available_data_value_div}>
                                        <p className={classes.__powers_available_data_value}>{item?.powerName}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
            <div className={classes.__powers_available_data_container}>
                {
                    Power?.map((item, index) =>
                        <>
                            {index >= 3 && (
                                <div className={classes.__powers_available_data} key={index}>
                                    <div className={classes.__powers_available_data_icon_div}>
                                        <img src={getIcon(item?.powerName)} width="34" height="34" className={classes.__powers_available_data_icon} alt="" />
                                        <div className={classes.__powers_available_data_power_count}>
                                            <p>
                                                {item?.count}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={classes.__powers_available_data_value_div}>
                                        <p className={classes.__powers_available_data_value}>{item?.powerName}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
        </div >
    );
};

export default PowersAvailable;