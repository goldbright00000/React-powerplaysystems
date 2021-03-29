import React, {useState} from 'react';
import TeamPointsModal from './TeamPointsModal';
import classes from './viewResults.module.scss';

const data = [
    {  
        id: 1,
        title: 'john_house',
        value: '$2,000.00'
    },
    {
        id: 2,
        title: 'winnername',
        value: '$750.00'
    },
    {
        id: 3,
        title: 'dart_winner',
        value: '$350.00'
    },
    {
        id: 4,
        title: 'saymyname',
        value: '$200.00'
    },
    {
        id: 5,
        title: 'ricksanchez',
        value: '$150.00'
    },
    {
        id: 6,
        title: 'simon_fisher',
        value: '$100.00'
    },
    {
        id: 7,
        title: 'marissa_walkman',
        value: '$80.00'
    },
    {
        id: 8,
        title: 'erik_cartman',
        value: '$60.00'
    },
    {
        id: 9,
        title: '1johnsnow',
        value: '$50.00'
    },
    {
        id: 10,
        title: 'stan_pines',
        value: '$40.00'
    },
];

const ViewResults = (props) => {
    const {title = '', onViewResultsBack = () => {}} = props || {};
    const [isSelected, setIsSelected] = useState(-1);
    const [teamPointsModal, setTeamPointsModal] = useState(false);

    const getSelectedColor = (id) => {
        return isSelected == id && '#fb6e00';
    };

    return (
        <div className={classes.__view_results}>
            <div className={classes.__view_results_header}>
                <span className={classes.__view_results_header_hr + ' ' + classes.__view_results_header_hr_left}></span>
                <p className={classes.__view_results_header_title}>
                    <span className={classes.__view_results_header_title_first}>{title}</span> PowerdFS
            </p>
                <span className={classes.__view_results_header_hr + ' ' + classes.__view_results_header_hr_right}></span>
            </div>
            <div className={classes.__view_results_main_title}>
                Final Standings
            </div>
            <p className={classes.__view_results_sub_title}>Prize Payouts</p>
            {
                data.map((item, index) => {
                    return (
                        <div 
                            className={classes.__view_results_data}
                            onClick={() => {
                                setIsSelected(item.id);
                                setTeamPointsModal(!teamPointsModal);
                            }}>
                            <div 
                                className={classes.__view_results_data_number_div}>
                                <p style={{color: getSelectedColor(item.id)}}>{item.id}</p>
                            </div>
                            <div className={classes.__view_results_data_title_div}>
                                <p style={{color: getSelectedColor(item.id)}}>{item.title}</p>
                            </div>
                            <div className={classes.__view_results_data_value_div}>
                                <p style={{color: getSelectedColor(item.id)}}>{item.value}</p>
                            </div>
                            <div className={classes.__view_results_data_arrow_div} style={{backgroundColor: getSelectedColor(item.id)}}>
                                {">"}
                            </div>
                        </div>
                    )
                })
            }
            <div className={classes.__view_results_back_link}>
                <div className={classes.__view_results_back_link_arrow}>
                    {"<"}
                </div>
                <div className={classes.__view_results_back_link_text} onClick={onViewResultsBack}>
                    Back
                </div>
            </div>
            {
                teamPointsModal
                &&
                <TeamPointsModal 
                    isVisible={teamPointsModal}
                    onClose={() => setTeamPointsModal(false)}
                />
            }
        </div>
    );
};

export default ViewResults;