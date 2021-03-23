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
import Modal from '../Modal';
import Card from '../Card';
import CloseIcon from '../../icons/Close';
import SportCardSelection from '../SportsSelectionCard';
import SwapIcon from '../../icons/Swap';

import { dummyData } from '../../pages/NHLpowerdFS/dummyData';

function SportsLiveCardSelection(props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showReplaceModal, setReplaceModalState] = useState(false);
    const [selectedReplaceData, setReplaceData] = useState();

    const { item: currentPlayer = {}, compressed = false } = props || {};
    const { live_data: selectedData = [] } = useSelector(state => state.nhl);
    const dispatch = useDispatch();

    const {
        category = '',
        title = '',
        teamA = '',
        teamB = '',
        id = '',
        isSelected = false,
        isStarPower = false,
        live_data_steps = [],
        xp = '',
        xpPoints = 0,
        xpTimes = '',
    } = currentPlayer || {};

    useEffect(() => {
        if (compressed) {
            setCurrentStep(0);
        }
    }, [compressed]);

    const nextStep = () => {
        let _currentStep = currentStep;
        if (currentStep < live_data_steps?.length - 1) {
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
        let _calculatedXp = (xpVal || 1) * parseInt(live_data_steps[currentStep]?.points)

        const _dataList = [...selectedData];
        let index = _dataList?.indexOf(currentPlayer);
        currentPlayer.xp = xp;
        currentPlayer.xpPoints = _calculatedXp || 6;
        currentPlayer.xpTimes = xpVal;
        _dataList[index] = currentPlayer;

        dispatch(NHLActions.setLiveNhlData(_dataList));
    }

    const renderSelectedXp = () => {
        if (xp === CONSTANTS.XP.xp1_5) return <XP1_5 size={24} />
        else if (xp === CONSTANTS.XP.xp2) return <XP2Icon size={24} />
        else if (xp === CONSTANTS.XP.xp3) return <XP3 size={24} />

        return <XPIcon size={24} />
    }

    const toggleReplaceModal = () => {
        let _cat = hasText(category, 'team') ? 'td' : `${category}`?.replace(/1|2/g, '');
        const [replaceData] = dummyData?.filter(_data => _data?.cat === _cat);

        setReplaceData(replaceData);
        setReplaceModalState(!showReplaceModal);
    }

    const onReplacePlayer = (id) => {
        const _dataList = [...selectedData];
        let targetPlayerIndex = _dataList?.indexOf(currentPlayer);

        if (targetPlayerIndex !== -1 && selectedReplaceData) {
            const [selectedPlayer] = selectedReplaceData?.data?.filter(player => player?.id === id);

            if (selectedPlayer) {
                selectedPlayer.category = category;
                _dataList[targetPlayerIndex] = selectedPlayer;

                dispatch(NHLActions.setLiveNhlData(_dataList));
                setReplaceModalState(false);
            }
        }
    }

    return (
        <>
            <div className={classes.container_body_card} key={id}>
                <div className={classes.container_card_header}>
                    <div className={`
                    ${classes.container_card_header_left} 
                    ${hasText(category, 'Team') && classes.teamD}
                    `}
                    >
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
                            <ReplaceAllIcon style={{ height: 'auto' }} size={24} onClick={toggleReplaceModal} />
                        </div>
                    </div>
                    <div className={classes.divider} />
                    {
                        live_data_steps?.length ?
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
                                                            <span>SOG: {live_data_steps[currentStep]?.states.sog}</span>
                                                            <div>
                                                                <span>G: {live_data_steps[currentStep]?.states.g}</span>
                                                                <span className={classes.separater} />
                                                                <span>A: {live_data_steps[currentStep]?.states.a}</span>
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
                                                    ${getIceType(live_data_steps[currentStep].type)
                                                                ?
                                                                classes.bg_s
                                                                :
                                                                getBenchType(live_data_steps[currentStep].type) ? classes.bg_p : classes.bg_n
                                                            }`}>{live_data_steps[currentStep]?.type}</p>
                                                        {
                                                            !compressed &&
                                                            <>
                                                                <div className={classes.container_card_body_top}>
                                                                    <ClockIcon />
                                                                    <span> P1 | 12:59</span>
                                                                </div>
                                                                <p className={classes.p_2}>{live_data_steps[currentStep]?.value}</p>
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
                                                        ${live_data_steps[currentStep]?.step?.length > 4 ? classes.overflow : ''}`
                                                    }
                                                    >
                                                        {
                                                            live_data_steps[currentStep]?.step && live_data_steps[currentStep]?.step?.length &&
                                                            live_data_steps[currentStep]?.step?.map((itm, indx) => (
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
                                                        Total Points: {live_data_steps[currentStep]?.totalPoints}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>
                                }

                                {
                                    !compressed && live_data_steps?.length ?
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

            <Modal visible={showReplaceModal}>
                <div className={classes.modal_container}>
                    <Card>
                        <div className={classes.modal_header}>
                            <p className={classes.title}>Swap Your Starter</p>
                            <CloseIcon onClick={toggleReplaceModal} />
                        </div>

                        <div className={classes.modal_body}>
                            <div className={classes.modal_body_header}>Body Header</div>

                            <div className={classes.modal_body_content}>
                                {
                                    selectedReplaceData && selectedReplaceData?.data?.map(
                                        (item, ind) =>
                                            <SportCardSelection
                                                item={item}
                                                key={ind + '-'}
                                                btnTitle="Swap"
                                                btnIcon={<SwapIcon />}
                                                onSelectDeselect={onReplacePlayer}
                                            />
                                    )
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </Modal>
        </>
    )
}

SportsLiveCardSelection.propTypes = {
    item: PropTypes.object,
    isSelected: PropTypes.bool,
    disabled: PropTypes.bool,
    compressed: PropTypes.bool,
    onSelectDeselect: PropTypes.func,
}

export default SportsLiveCardSelection