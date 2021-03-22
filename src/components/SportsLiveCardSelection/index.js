import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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
import { hasText } from '../../utility/shared';
import * as NHLActions from '../../actions/NHLActions';
import { CONSTANTS } from '../../utility/constants';


function SportsLiveCardSelection(props) {
    const [currentStep, setCurrentStep] = useState(0);

    const { item = {}, compressed = false } = props || {};
    const { data: selectedData = [] } = useSelector(state => state.nhl);
    const dispatch = useDispatch();

    const {
        category = '',
        title = '',
        teamA = '',
        teamB = '',
        id = '',
        isSelected = false,
        isStarPower = false,
        steps = [],
        xp = '',
        xpPoints = 0,
        xpTimes = '',
    } = item || {};

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
        return hasText(type, 'ice');
    }

    const getBenchType = (type) => {
        return hasText(type, 'Bench');
    }

    const onSelectXP = (xp = '', xpVal) => {
        let _calculatedXp = (xpVal || 1) * parseInt(steps[currentStep]?.points)

        let selectedCard = dispatch(NHLActions.getSingleData({ id }));
        const _dataList = [...selectedData];
        let index = _dataList?.indexOf(selectedCard);
        selectedCard.xp = xp;
        selectedCard.xpPoints = _calculatedXp || 6;
        selectedCard.xpTimes = xpVal;
        _dataList[index] = selectedCard;

        dispatch(NHLActions.setData(_dataList));
    }

    const renderSelectedXp = () => {
        if (xp === CONSTANTS.XP.xp1_5) return <XP1_5 size={24} />
        else if (xp === CONSTANTS.XP.xp2) return <XP2Icon size={24} />
        else if (xp === CONSTANTS.XP.xp3) return <XP3 size={24} />

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
                    <p>{teamA} vs <span className={classes.teamB}>{teamB}</span></p>
                </div>
            </div>
            <div className={`${classes.container_card_body} 
            ${compressed ? classes.compressed : classes.height}`}>
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
                                                    <p>{xpTimes} Points</p>
                                                    <div className={classes.points_right_1}>
                                                        <span>{xpPoints || 6}</span>
                                                        <ToolTip toolTipContent={
                                                            <div className={classes.tool_tip_xp}>
                                                                <span onClick={() => onSelectXP(CONSTANTS.XP.xp1_5, 1.5)}><XP1_5 /></span>
                                                                <span onClick={() => onSelectXP(CONSTANTS.XP.xp2, 2)}><XP2Icon /></span>
                                                                <span onClick={() => onSelectXP(CONSTANTS.XP.xp3, 3)}><XP3 /></span>
                                                            </div>
                                                        }>
                                                            <div data-tip data-for={`${title}`}>
                                                                <div className={classes.state_xp}>
                                                                    {
                                                                        isEmpty(xp)
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
                                                        <>
                                                            <div className={classes.container_card_body_top}>
                                                                <ClockIcon />
                                                                <span> P1 | 12:59</span>
                                                            </div>
                                                            <p className={classes.p_2}>{steps[currentStep]?.value}</p>
                                                        </>
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
    item: PropTypes.object,
    category: PropTypes.string,
    title: PropTypes.string,
    avgVal: PropTypes.number,
    teamA: PropTypes.string,
    teamB: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    stadium: PropTypes.string,
    xp: PropTypes.string,
    id: PropTypes.number,
    isSelected: PropTypes.bool,
    isStarPower: PropTypes.bool,
    disabled: PropTypes.bool,
    steps: PropTypes.array,
    injured: PropTypes.bool,
    compressed: PropTypes.bool,
    onSelectDeselect: PropTypes.func,
    onSelectXp: PropTypes.func,
}

export default SportsLiveCardSelection