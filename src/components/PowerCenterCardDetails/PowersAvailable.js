import React, {useState} from 'react';
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

const PowersAvailable = () => {
    const [learnMoreModal, setLearnMoreModal] = useState(false);

    const onOpenModal = () => setLearnMoreModal(true);
    const onCloseModal = () => setLearnMoreModal(false);

    return (
        <div className={classes.__powers_available}>
            <div className={classes.__powers_available_title_and_learn_more_div}>
                <div className={classes.__powers_available_title_div}>
                    <p className={classes.__powers_available_title}>Powers Available</p>
                </div>
                <div className={classes.__powers_available_learn_more_div} onClick={() => onOpenModal()}>
                    <p className={classes.__powers_available_learn_more_text}>Learn more</p>
                </div>
                {
                    learnMoreModal
                    &&
                    <LearnMoreModal 
                        learnMoreModal={learnMoreModal} 
                        onCloseModal={onCloseModal} 
                    />
                }
            </div>
            {
                data.map((item, index) => {
                    return (
                        <div className={classes.__powers_available_data}>
                            <div className={classes.__powers_available_data_icon_div}>
                                <img src={item.icon} width="36" height="36" className={classes.__powers_available_data_icon} />
                                <div className={classes.__powers_available_data_power_count}>
                                    {item.count}
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
    );
};

export default PowersAvailable;