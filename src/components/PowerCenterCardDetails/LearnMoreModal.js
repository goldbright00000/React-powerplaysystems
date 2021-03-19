import React, {useState} from 'react';
import classes from './learnMoreModal.module.scss';
import { Modal } from 'react-responsive-modal';
import CloseIcon from '../../assets/close-white-icon.png';
import PointMultipliersMain from '../../assets/point-multipliers-main.png';
import VideoReviewMain from '../../assets/video-review-main.png';
import DWallMain from '../../assets/d-wall-main.png';
import PointMultipliersLight from '../../assets/point-multipliers-light.png';
import PlayerSwapsLight from '../../assets/player-swaps-light.png';
import VideoReviewLight from '../../assets/video-review-light.png';
import DWallLight from '../../assets/d-wall-light.png';

const mainIconWidthAndHeight = 85;
const lightIconWidthAndHeight = 64;

const LearnMoreModal = (props) => {
    const {learnMoreModal = false, onCloseModal = () => { }} = props || {};
    const [title, setTitle] = useState('Point Multiplier');
    const [pointMultiplier, setPointMultiplier] = useState(true);
    const [playerSwap, setPlayerSwap] = useState(false);
    const [videoReview, setVideoReview] = useState(false);
    const [dWall, setDwall] = useState(false);
    const [lightIcons, setLightIcons] = useState([PlayerSwapsLight, VideoReviewLight, DWallLight]);

    const closeIcon = (
        <img src={CloseIcon} width="20" height="20" />
    );

    const getMainIcon = () => {
        if (pointMultiplier) {
            return PointMultipliersMain;
        } else if (playerSwap) {
            return PointMultipliersMain;
        } else if (videoReview) {
            return VideoReviewMain;
        } else {
            return DWallMain;
        }
    };

    const getDescription = () => {
        if (pointMultiplier) {
            return (
                <p className={classes.__learn_more_modal_body_description}>
                    Power-up your points with the Point Multiplier. You chose when to activate. Maybe 3x at the start of a Power Play?
                    <br/><br/>
                    3X, 2X and 1.5X points when activated,  lasts for 2 mins of game time.
                </p>
            );
        } else if (playerSwap) {
            return (
                <p className={classes.__learn_more_modal_body_description}>
                    Swap any player on your team with another player from a list of available players.
                </p>
            );
        } else if (videoReview) {
            return (
                <p className={classes.__learn_more_modal_body_description}>
                    Use this Power after a score against your team. <br/> 
                    There's a 50-50 chance it will be reversed.
                </p>
            );
        } else {
            return (
                <p className={classes.__learn_more_modal_body_description}>
                    Use this power to prevent any points against your team defence while active.
                </p>
            );
        }
    };

    const setPowers = (pointMultiplier, playerSwap, videoReview, dWall) => {
        setPointMultiplier(pointMultiplier);
        setPlayerSwap(playerSwap);
        setVideoReview(videoReview);
        setDwall(dWall);
    };

    const onPowerClick = (power) => {
        if (pointMultiplier) {
            if (power == 'first') {
                setPowers(false, true, false, false);
                setTitle('Player Swaps');
                setLightIcons([PointMultipliersLight, VideoReviewLight, DWallLight]);
            } else if (power == 'second') {
                setPowers(false, false, true, false);
                setTitle('Video Review');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, DWallLight]);
            } else {
                setPowers(false, false, false, true);
                setTitle('D-Wall');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, VideoReviewLight]);
            }
        } else if (playerSwap) {
            if (power == 'first') {
                setPowers(true, false, false, false);
                setTitle('Point Multiplier');
                setLightIcons([PlayerSwapsLight, VideoReviewLight, DWallLight]);
            } else if (power == 'second') {
                setPowers(false, false, true, false);
                setTitle('Video Review');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, DWallLight]);
            } else {
                setPowers(false, false, false, true);
                setTitle('D-Wall');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, VideoReviewLight]);
            }
        } else if (videoReview) {
            if (power == 'first') {
                setPowers(true, false, false, false);
                setTitle('Point Multiplier');
                setLightIcons([PlayerSwapsLight, VideoReviewLight, DWallLight]);
            } else if (power == 'second') {
                setPowers(false, true, false, false);
                setTitle('Player Swaps');
                setLightIcons([PointMultipliersLight, VideoReviewLight, DWallLight]);
            } else {
                setPowers(false, false, false, true);
                setTitle('D-Wall');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, VideoReviewLight]);
            }
        } else {
            if (power == 'first') {
                setPowers(true, false, false, false);
                setTitle('Point Multiplier');
                setLightIcons([PlayerSwapsLight, VideoReviewLight, DWallLight]);
            } else if (power == 'second') {
                setPowers(false, true, false, false);
                setTitle('Player Swaps');
                setLightIcons([PointMultipliersLight, VideoReviewLight, DWallLight]);
            } else {
                setPowers(false, false, true, false);
                setTitle('Video Review');
                setLightIcons([PointMultipliersLight, PlayerSwapsLight, VideoReviewLight]);
            }
        }
    };

    return (
        <Modal 
            open={learnMoreModal} 
            onClose={onCloseModal} 
            center 
            focusTrapped={false}
            closeIcon={closeIcon}
            styles={{modal: {backgroundColor: 'transparent' }, closeButton: {top: 50, right: 40}}}>
            <div className={classes.__learn_more_modal}>
                <div className={classes.__learn_more_modal_header}>
                    <div className={classes.__learn_more_modal_header_title}>
                        {title}
                    </div>
                </div>
                <div className={classes.__learn_more_modal_body}>
                    <div className={classes.__learn_more_modal_body_powers}>
                        <div className={classes.__learn_more_modal_body_power_main}>
                            <img 
                                src={getMainIcon()} 
                                width={mainIconWidthAndHeight} 
                                height={mainIconWidthAndHeight} 
                            />
                        </div>
                        <div 
                        className={classes.__learn_more_modal_body_power_light}
                        onClick={() => onPowerClick('first')}>
                            <img 
                                src={lightIcons[0]} 
                                width={lightIconWidthAndHeight} 
                                height={lightIconWidthAndHeight} 
                            />
                        </div>
                        <div className={classes.__learn_more_modal_body_power_light}
                            onClick={() => onPowerClick('second')}>
                            <img 
                                src={lightIcons[1]} 
                                width={lightIconWidthAndHeight} 
                                height={lightIconWidthAndHeight} 
                            />
                        </div>
                        <div className={classes.__learn_more_modal_body_power_light}
                            onClick={() => onPowerClick('third')}>
                            <img 
                                src={lightIcons[2]} 
                                width={lightIconWidthAndHeight} 
                                height={lightIconWidthAndHeight} 
                            />
                        </div>
                    </div>
                    <div className={classes.__learn_more_modal_body_description_div}>
                        {getDescription()}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LearnMoreModal;