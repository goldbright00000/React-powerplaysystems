import React, { useEffect, useState } from 'react';
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
import { isEmpty } from 'lodash';

const XP = {
    xp1_5: 'xp1.5',
    xp2: 'xp2',
    xp3: 'xp3',
}

function SportsLiveCardSelection(props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedXp, setSelectedXp] = useState('');

    const {
        category = '',
        title = '',
        teamA = '',
        teamB = '',
        id = '',
        isSelected = false,
        isStarPower = false,
        steps = [],
        compressed = false,
    } = props || {};

    useEffect(() => {
        if (compressed) {
            setCurrentStep(0);
        }
    }, [compressed]);

    const nextStep = () => {
        let _currentStep = currentStep;
        if (currentStep < steps?.length - 1) {
            _currentStep++;
        } else {
            _currentStep = 0;
        }

        setCurrentStep(_currentStep);
    }

    const backStep = () => {
        let _currentStep = currentStep;
        if (currentStep > 0) {
            _currentStep--;
        } else {
            _currentStep = currentStep;
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

    const onSelectXP = (xp = '') => {
        setSelectedXp(xp)
    }

    const renderSelectedXp = () => {
        if (selectedXp === XP.xp1_5) return <XP1_5 size={24} />
        else if (selectedXp === XP.xp2) return <XP2Icon size={24} />
        else if (selectedXp === XP.xp3) return <XP3 size={24} />

        return <XPIcon size={24} />
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
            <div className={`${classes.container_card_body} ${compressed ? classes.compressed : classes.height}`}>
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
                                                                <span onClick={() => onSelectXP(XP.xp1_5)}><XP1_5 /></span>
                                                                <span onClick={() => onSelectXP(XP.xp2)}><XP2Icon /></span>
                                                                <span onClick={() => onSelectXP(XP.xp3)}><XP3 /></span>
                                                            </div>
                                                        }>
                                                            <div data-tip data-for={`${title}`}>
                                                                <div className={classes.state_xp}>
                                                                    {
                                                                        isEmpty(selectedXp)
                                                                            ?
                                                                            <XPIcon size={24} />
                                                                            :
                                                                            renderSelectedXp()
                                                                    }
                                                                </div>
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
                                                    {
                                                        !compressed &&
                                                        <p className={classes.p_2}>{steps[currentStep]?.value}</p>
                                                    }
                                                </div>
                                                {
                                                    !compressed &&
                                                    <p>Opp. G: P. Roy .976</p>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {
                                        !compressed && currentStep === 1 &&
                                        <div className={classes.points_summary}>
                                            <p className={classes.points_summary_title}>Points Summary</p>
                                            <div className={classes.points_summary_1}>
                                                <div className={classes.points_summary_h}>
                                                    <span>Time</span>
                                                    <span>Type</span>
                                                    <span>Power</span>
                                                    <span>Pts</span>
                                                </div>
                                                <div className={`${classes.points_summary_b} 
                                                        ${steps[currentStep]?.step?.length > 4 ? classes.overflow : ''}`
                                                }
                                                >
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
                                !compressed && steps?.length ?
                                    <div className={classes.card_footer_arrow}>
                                        {
                                            currentStep > 0 ?
                                                <>
                                                    <div onClick={backStep} className={classes.footer_back}>
                                                        Back
                                                    </div>
                                                    <div className={classes.left_align}>
                                                        <span className={`${classes.arrow} ${classes.left}`} />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div onClick={nextStep} className={classes.card_details}>
                                                        Details
                                                    </div>
                                                    <span className={`${classes.arrow} ${classes.right}`} />
                                                </>
                                        }
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
    compressed: PropTypes.bool,
    onSelectDeselect: PropTypes.func,
}

export default SportsLiveCardSelection

