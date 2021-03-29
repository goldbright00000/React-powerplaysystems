import React, {useState} from 'react';
import classes from './teamPointsModal.module.scss';
import Modal from '../../components/Modal';
import CloseIcon from '../../assets/close-white-icon.png';
import { NavLink } from 'react-router-dom';
import Card from '../../components/PowerpickCard';
import { dummyData } from '../../pages/NHLPowerdfsLive/dummyData';
import SportsLiveCardSelection from '../../components/SportsLiveCardSelection';

const TeamPointsModal = (props) => {
    const {isVisible = false, onClose = () => {}} = props || {};
    const [activeTab, setActiveTab] = useState(1);

    return (
        <Modal visible={isVisible}>
            <div className={classes.__team_points_modal}>
                <div className={classes.__team_points_modal_main_content}>
                    <div className={classes.__team_points_modal_close_icon}>
                        <img 
                            src={CloseIcon}
                            width="16" 
                            height="16" 
                            onClick={() => onClose()} 
                            style={{cursor: 'pointer'}} 
                        />
                    </div>
                    <div className={classes.__team_points_modal_main_title}>
                        Team Points for Display name: <span>john_house</span>
                    </div>
                    <hr />
                    <div className={classes.__team_points_modal_nav_links}>
                        <ul>
                            <li>
                                <a
                                    href="javascript:0"
                                    className={activeTab == 1 && classes.active}
                                    onClick={() => setActiveTab(1)}
                                >
                                    Team Manager
                                </a>
                            </li>
                            <li>
                                <a
                                    href="javascript:0"
                                    className={activeTab == 2 && classes.active}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Score Details
                                </a>
                            </li>
                        </ul>
                        <div className={classes.__team_points_modal_total_points_text}>
                            Total Points: <span>999</span>
                        </div>
                    </div>
                    <div className={classes.__team_points_modal_card_div}>
                        <Card>
                        {
                            dummyData.map((item, index) => {
                                return (
                                    <SportsLiveCardSelection
                                    item={item}
                                    key={index + ""}
                                    />
                                );
                            })
                        }
                        </Card>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TeamPointsModal;