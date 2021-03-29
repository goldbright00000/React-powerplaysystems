import React, {useState} from 'react';
import classes from './finalStandingsModal.module.scss';
import Modal from '../Modal';
import CloseIcon from '../../assets/close-white-icon.png';
import MagnifierIcon from '../../assets/magnifier_icon.png';

const data = [
    {
        id: 1,
        displayName: 'john_house',
        winningAmount: '$2,000.00',
    },
    {
        id: 2,
        displayName: 'winnername',
        winningAmount: '$750.00',
    },
    {
        id: 3,
        displayName: 'dart_winner',
        winningAmount: '$500.00',
    },
    {
        id: 4,
        displayName: 'saymyname',
        winningAmount: '$400.00',
    },
    {
        id: 5,
        displayName: 'john_house',
        winningAmount: '$350.00',
    },
    {
        id: 6,
        displayName: 'winnername',
        winningAmount: '$350.00',
    },
    {
        id: 7,
        displayName: 'dart_winner',
        winningAmount: '$350.00',
    },
    {
        id: 8,
        displayName: 'saymyname',
        winningAmount: '$200.00',
    },
    {
        id: 9,
        displayName: 'john_house',
        winningAmount: '$200.00',
    },
    {
        id: 10,
        displayName: 'winnername',
        winningAmount: '$200.00',
    },
    {
        id: 11,
        displayName: 'dart_winner',
        winningAmount: '$200.00',
    },
    {
        id: 12,
        displayName: 'saymyname',
        winningAmount: '$200.00',
    },
    {
        id: 13,
        displayName: 'john_house',
        winningAmount: '$100.00',
    },
    {
        id: 14,
        displayName: 'winnername',
        winningAmount: '$100.00',
    },
    {
        id: 15,
        displayName: 'dart_winner',
        winningAmount: '$100.00',
    },
    {
        id: 16,
        displayName: 'saymyname',
        winningAmount: '$100.00',
    },
];

const FinalStandingsModal = (props) => {
    const {isVisible = false, onClose = () => {}} = props || {};

    return (
        <Modal visible={isVisible}>
            <div className={classes.__final_standings_modal}>
                <div className={classes.__final_standings_modal_main_content}>
                    <div className={classes.__final_standings_modal_close_icon}>
                        <img 
                            src={CloseIcon}
                            width="16" 
                            height="16" 
                            onClick={() => onClose()} 
                            style={{cursor: 'pointer'}} 
                        />
                    </div>
                    <div className={classes.__final_standings_modal_title_div}>
                        <div className={classes.__final_standings_modal_title}>
                            Final Standings
                        </div>
                        <div className={classes.__final_standings_modal_title_price}>
                            $10,000
                        </div>
                    </div>
                   <div className={classes.__final_standings_modal_date_time_div}>
                        <div className={classes.__final_standings_modal_date_time}>
                            Oct 24, 2020  |  8:00PM ET
                        </div>
                        <div className={classes.__final_standings_modal_prize_pool}>
                            Prize Pool
                        </div>
                   </div>
                   <hr />
                   <div className={classes.__final_standings_modal_search}>
                        <div className={classes.__final_standings_modal_search_magnifier_icon}>
                            <img src={MagnifierIcon} /> 
                        </div>
                        <div className={classes.__final_standings_modal_search_input_field_div}>
                            <input 
                                type="text" 
                                placeholder="Search by Display name" 
                                className={classes.__final_standings_modal_search_input_field} 
                            />
                        </div>
                   </div>
                   <div className={classes.__final_standings_modal_data_main_div}>
                        <div className={classes.__final_standings_modal_data_header}>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_place}`}>
                                Place
                            </div>
                            <div 
                                className={
                                    `${classes.__final_standings_modal_data_header_title} 
                                    ${classes.__final_standings_modal_data_header_title_display_name}`}>
                                Display name
                            </div>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_amount_won}`}>
                                Amount Won
                            </div>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_action}`}>
                                Action
                            </div>
                        </div>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className={classes.__final_standings_modal_data_div} key={index}>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text} 
                                            ${classes.__final_standings_modal_data_place}`}>
                                            {item.id}
                                        </div>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text}
                                            ${classes.__final_standings_modal_data_display_name}`}>
                                            {item.displayName}
                                        </div>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text}
                                            ${classes.__final_standings_modal_data_amount_won}`}>
                                            {item.winningAmount}
                                        </div>
                                        <div className={`${classes.__final_standings_modal_data_action}`}>
                                            <button className={classes.__final_standing_modal_data_action_button}>View Team</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                   </div>
                </div>
            </div>
        </Modal>
    );
};

export default FinalStandingsModal;