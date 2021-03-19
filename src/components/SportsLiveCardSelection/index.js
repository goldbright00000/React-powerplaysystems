import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ClockIcon from '../../icons/Clock3';
import PowerPlayIcon from '../../assets/token.png';
import ForwardArrow from '../../icons/ForwardArrow';
import XPIcon from '../../icons/XPIcon';
import ReplaceAllIcon from '../../icons/Replace';
import ToolTip from '../../components/ToolTip';
import XP1_5 from '../../icons/XP1_5';
import XP2Icon from '../../icons/XP2';
import XP3 from '../../icons/XP3';

function SportsLiveCardSelection(props) {
    const [currentStep, setCurrentStep] = useState(0);

    const {
        category = '',
        title = '',
        avgVal = 0,
        teamA = '',
        teamB = '',
        time = '',
        date = '',
        stadium = '',
        id = '',
        isSelected = false,
        isStarPower = false,
        steps = [],
        onSelectDeselect = () => { },
        disabled = false,
        injured = false,
    } = props || {};

    const nextStep = () => {
        let _currentStep = currentStep;
        if (currentStep < steps?.length - 1) {
            _currentStep++;
        } else {
            _currentStep = 0;
        }

        setCurrentStep(_currentStep);
    }

    const getIceType = (type) => {
        let txt = `${type}`.toLocaleLowerCase();
        if (txt?.includes('ice')) {
            return true;
        }
    }

    const getBenchType = (type) => {
        let txt = `${type}`.toLocaleLowerCase();
        if (txt?.includes('bench')) {
            return true;
        }
    }

    return (
        <div className={classes.container_body_card} key={id}>
            <div className={classes.container_card_header}>
                <div className={classes.container_card_header_left}>
                    <span className={classes.header_line_bar} />
                    {category}
                </div>
                <div className={classes.container_card_header_right}>
                    <p>{teamA} vs <span>{teamB}</span></p>
                </div>
            </div>
            <div className={classes.container_card_body}>
                <div className={classes.container_card_body_top}>
                    <ClockIcon />
                    <span> P1 | 12:59</span>
                </div>
                <div className={classes.container_card_title}>
                    <div className={classes.card_title_left}>
                        {
                            isStarPower &&
                            <img src={PowerPlayIcon} />
                        }
                        <p className={classes.container_selected_p}>
                            {title}
                        </p>
                    </div>
                    <div className={classes.card_title_right}>
                        <ReplaceAllIcon style={{ height: 'auto' }} size={24} />
                    </div>
                </div>
                <div className={classes.divider} />
                {
                    steps?.length ?
                        <div className={classes.card_state_main_container}>
                            {
                                <>
                                    {
                                        currentStep === 0 &&
                                        <div className={classes.states_points}>
                                            <div className={classes.states_points_top}>
                                                <div className={classes.states_points_left}>
                                                    <p>Stats</p>
                                                    <div>
                                                        <span>SOG: {steps[currentStep]?.states.sog}</span>
                                                        <div>
                                                            <span>G: {steps[currentStep]?.states.g}</span>
                                                            <span className={classes.separater} />
                                                            <span>A: {steps[currentStep]?.states.a}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={classes.states_points_right}>
                                                    <p>Points</p>
                                                    <div className={classes.points_right_1}>
                                                        <span>{steps[currentStep]?.points}</span>
                                                        <ToolTip toolTipContent={
                                                            <div className={classes.tool_tip_xp}>
                                                                <span onClick={() => {
                                                                    console.log('A');
                                                                }}><XP1_5 /></span>
                                                                <span onClick={() => {
                                                                    console.log('B');
                                                                }}><XP2Icon /></span>
                                                                <span onClick={() => {
                                                                    console.log('C');
                                                                }}><XP3 /></span>
                                                            </div>
                                                        }>
                                                            <div data-tip data-for={`${title}`}>
                                                                <XPIcon size={24} />
                                                            </div>
                                                        </ToolTip>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={classes.states_points_center}>
                                                <div>
                                                    <p className={`${classes.p_1} 
                                                    ${getIceType(steps[currentStep].type)
                                                            ?
                                                            classes.bg_s
                                                            :
                                                            getBenchType(steps[currentStep].type) ? classes.bg_p : classes.bg_n
                                                        }`}>{steps[currentStep]?.type}</p>
                                                    <p className={classes.p_2}>{steps[currentStep]?.value}</p>
                                                </div>
                                                <p>Opp. G: P. Roy .976</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        currentStep === 1 &&
                                        <div className={classes.points_summary}>
                                            <p className={classes.points_summary_title}>Points Summary</p>
                                            <div className={classes.points_summary_1}>
                                                <div className={classes.points_summary_h}>
                                                    <span>Time</span>
                                                    <span>Type</span>
                                                    <span>Power</span>
                                                    <span>Pts</span>
                                                </div>
                                                <div className={classes.points_summary_b}>
                                                    {
                                                        steps[currentStep]?.step && steps[currentStep]?.step?.length &&
                                                        steps[currentStep]?.step?.map((itm, indx) => (
                                                            <div>
                                                                <span>{itm?.p1}</span>
                                                                <span>{itm?.type}</span>
                                                                <span>{itm?.power === '' ? '-' : itm?.power}</span>
                                                                <span>{itm?.pts}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className={classes.summary_total_pts}>
                                                    Total Points: {steps[currentStep]?.totalPoints}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            }

                            {
                                steps?.length ?
                                    <div className={classes.card_footer_arrow}>
                                        <div onClick={nextStep} className={classes.card_details}>
                                            Details
                                        </div>
                                        <span className={`${classes.arrow} ${classes.right}`} />
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                        :
                        <p className={`
                            ${classes.container_body_card_state} 
                            ${classes.card_state_no_data} 
                            ${isSelected ? classes.active : ''}`}
                        >
                            No Data
                        </p>
                }
            </div>
        </div>
    )
}

SportsLiveCardSelection.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    avgVal: PropTypes.number,
    teamA: PropTypes.string,
    teamB: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    stadium: PropTypes.string,
    id: PropTypes.number,
    isSelected: PropTypes.bool,
    isStarPower: PropTypes.bool,
    disabled: PropTypes.bool,
    steps: PropTypes.array,
    injured: PropTypes.bool,
    onSelectDeselect: PropTypes.func,
}

export default SportsLiveCardSelection

