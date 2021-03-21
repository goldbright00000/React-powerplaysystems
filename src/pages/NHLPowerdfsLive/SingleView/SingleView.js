import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import ReplaceIcon from '../../../icons/Replace';
import ClockIcon from '../../../icons/Clock3';
import { hasText } from '../../../utility/shared';
import SportsLiveCardSelection from '../../../components/SportsLiveCardSelection';

let currentCard = 0;

function SingleView(props) {
    const { data = [] } = props || {};

    const [selectedCard, setSelectedCard] = useState(data[currentCard]);

    const RenderCard = ({ item, selected = false }) => {
        const {
            category = '',
            title = '',
            time = '',
            id = '',
            steps = [],
        } = item || {};

        return (
            <div className={`${classes.card} ${selected && classes.active}`}>
                <div className={classes.card_header}>
                    <p>{title}</p>
                    <ReplaceIcon size={22} />
                </div>

                <div className={classes.card_body}>
                    <div className={classes.card_cat}>{category}</div>
                    <div>Points: {steps[1]?.totalPoints}</div>
                    <div>
                        <ClockIcon color="#688fbd" />
                        <span> P1 | {time.replace('PM', '')}</span>
                    </div>
                </div>

                <div
                    className={`${classes.card_type} 
                    ${hasText(steps[0]?.type, 'ice')
                            ?
                            classes.success
                            :
                            hasText(steps[0]?.type, 'bench') && classes.danger}`}
                >
                    {steps[0]?.type}
                </div>
            </div>
        )
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
                    />)
                }
            </div>

            <div className={classes.right_side}>
                <div onClick={onBack} className={`${classes.arrow} ${classes.left}`} />
                <SportsLiveCardSelection
                    category={selectedCard.category}
                    title={selectedCard.title}
                    teamA={selectedCard.teamA}
                    teamB={selectedCard.teamB}
                    date={selectedCard.date}
                    time={selectedCard.time}
                    stadium={selectedCard.stadium}
                    steps={selectedCard.steps}
                    id={selectedCard.id}
                    isStarPower={selectedCard.isStarPower}
                />
                <div onClick={onNext} className={`${classes.arrow} ${classes.right}`} />
            </div>
        </div>
    )
}

SingleView.propTypes = {
    data: PropTypes.array,
}

export default SingleView

