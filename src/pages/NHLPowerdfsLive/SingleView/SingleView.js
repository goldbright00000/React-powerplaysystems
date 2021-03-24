import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ReplaceIcon from '../../../icons/Replace';
import ClockIcon from '../../../icons/Clock3';
import XP1_5 from '../../../icons/XP1_5';
import XP2Icon from '../../../icons/XP2';
import XP3 from '../../../icons/XP3';
import PowerPlayIcon from '../../../assets/token.png';
import { hasText } from '../../../utility/shared';
import SportsLiveCardSelection from '../../../components/SportsLiveCardSelection';
import { CONSTANTS } from '../../../utility/constants';

let currentCard = 0;

function SingleView(props) {
    const { data = [] } = props || {};

    const [selectedCard, setSelectedCard] = useState(data[currentCard]);

    useEffect(() => {
        setSelectedCard(data[currentCard]);
    }, [data]);

    const RenderCard = ({ item, selected = false, onSelectCard = (item) => { } }) => {
        const {
            category = '',
            title = '',
            time = '',
            id = '',
            live_data_steps = [],
            xp = '',
            xpPoints = 0,
            xpTimes = '',
            isStarPower = false,
        } = item || {};

        return (
            <div
                onClick={() => onSelectCard(item)}
                className={`${classes.card} ${selected && classes.active}`}
            >
                <div className={classes.card_header}>
                    <div>
                        {
                            isStarPower &&
                            <img src={PowerPlayIcon} />
                        }
                        <p>{title}</p>
                    </div>
                    <ReplaceIcon size={22} />
                </div>

                <div className={classes.card_body}>
                    <div className={classes.card_cat}>{category}</div>
                    <div className={classes.card_xp_points}>
                        Points: {live_data_steps[1]?.totalPoints}
                        {
                            renderXp(xp)
                        }
                    </div>
                    <div className={classes.card_clock}>
                        <ClockIcon color="#688fbd" />
                        <span> P1 | {time.replace('PM', '')}</span>
                    </div>
                </div>

                <div
                    className={`${classes.card_type} 
                    ${hasText(live_data_steps[0]?.type, 'ice')
                            ?
                            classes.success
                            :
                            hasText(live_data_steps[0]?.type, 'bench') && classes.danger}`}
                >
                    {live_data_steps[0]?.type}
                </div>
            </div>
        )
    }

    const onSelectCard = (item) => {
        let index = data?.length && data?.indexOf(item);
        currentCard = index;

        setSelectedCard(item);
    }

    const renderXp = (xp) => {
        if (xp === CONSTANTS.XP.xp1_5) return <XP1_5 size={20} />
        else if (xp === CONSTANTS.XP.xp2) return <XP2Icon size={20} />
        else if (xp === CONSTANTS.XP.xp3) return <XP3 size={20} />
    }

    const onNext = () => {
        if (currentCard < data?.length - 1) currentCard++; else currentCard = 0;

        setSelectedCard(data[currentCard]);
    }

    const onBack = () => {
        if (currentCard > 0) currentCard--; else currentCard = data?.length - 1;

        setSelectedCard(data[currentCard])
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.left_side}>
                {
                    data && data?.length &&
                    data?.map((item, ind) => <RenderCard
                        key={ind + '-'}
                        item={item}
                        selected={selectedCard?.id === item?.id}
                        onSelectCard={onSelectCard}
                    />)
                }
            </div>

            <div className={classes.right_side}>
                <div onClick={onBack} className={`${classes.arrow} ${classes.left}`} />
                <SportsLiveCardSelection item={selectedCard} />
                <div onClick={onNext} className={`${classes.arrow} ${classes.right}`} />
            </div>
        </div>
    )
}

SingleView.propTypes = {
    data: PropTypes.array,
}

export default SingleView

