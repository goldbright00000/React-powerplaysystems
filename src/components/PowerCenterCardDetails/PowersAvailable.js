import React, { useState } from 'react';
import classes from './powersAvailable.module.scss';
import PointMultipliers from '../../assets/point-multipliers.png';
import PlayerSwaps from '../../assets/player-swaps.png';
import VideoReview from '../../assets/video-review.png';
import DWall from '../../assets/d-wall.png';
import LearnMoreModal from './LearnMoreModal';

const data = [
    {
        id: 1,
        icon: PointMultipliers,
        count: 3,
        value: 'Point Multipliers'
    },
    {
        id: 2,
        icon: PlayerSwaps,
        count: 2,
        value: 'Player Swaps'
    },
    {
        id: 3,
        icon: VideoReview,
        count: 2,
        value: 'Video Review'
    },
    {
        id: 4,
        icon: DWall,
        count: 2,
        value: 'D-Wall'
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
    }
}

const PowersAvailable = (props) => {
    const {
        title = '',
        Power = [],
    } = props || {};

    const [learnMoreModal, setLearnMoreModal] = useState(false);

    const onOpenModal = () => setLearnMoreModal(true);
    const onCloseModal = () => setLearnMoreModal(false);

    return (
        <div className={classes.__powers_available}>
            <div className={classes.__powers_available_title_and_learn_more_div}>
                <div className={classes.__powers_available_title_div}>
                    <p className={classes.__powers_available_title}>Powers Available</p>
                </div>
                {
                    learnMoreModal
                    &&
                    <LearnMoreModal
                        title={title}
                        learnMoreModal={learnMoreModal}
                        onCloseModal={onCloseModal}
                    />
                }
            </div>
            {
                Power.map((item, index) => {
                    return (
                        <div className={classes.__powers_available_data}>
                            <div className={classes.__powers_available_data_icon_div}>
                                {console.log('powerName', item?.powerName)}
                                <img src={getIcon(item?.powerName)} alt="" width="36" height="36" className={classes.__powers_available_data_icon} />
                                <div className={classes.__powers_available_data_power_count}>
                                    {item?.amount || null}
                                </div>
                            </div>
                            <div className={classes.__powers_available_data_value_div}>
                                <p className={classes.__powers_available_data_value}>{item?.powerName}</p>
                            </div>
                            {
                                Power.length == index + 1
                                &&
                                <div className={classes.__powers_available_learn_more_div} onClick={() => onOpenModal()}>
                                    <p className={classes.__powers_available_learn_more_text}>Learn more</p>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default PowersAvailable;