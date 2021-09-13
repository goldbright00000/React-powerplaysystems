import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Hitters from './Hitters';
import classes from './index.module.scss';
import PointSystem from './PointSystem';
import PowersAvailable from './PowersAvailable';
import PrizeGrid from './PrizeGrid';
import TeamRoster from './TeamRoster';
import ContestRules from './ContestRules';

const PowerCenterCardDetails = (props) => {
    const {
        entry_fee = '',
        title = '',
        onBackClick = () => { },
        onNextClick = () => { },
        myGameCenter = false,
        PointsSystem = [],
        Power = [],
        PrizePayout = [],
        onEnter = () => { },
        game_set_start = '',
        prize = ''
    } = props || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={classes.__power_center_card_details}>
            <Header title={title} />
            {
                currentIndex == 0
                &&
                <PrizeGrid PrizePayout={PrizePayout} onEnter={onEnter} />
            }
            {
                currentIndex == 1 && title !== 'NHL'
                &&
                <Hitters PointsSystem={PointsSystem} onEnter={onEnter} />
            }
            {
                currentIndex == 1 && title === 'NHL'
                &&
                <PointSystem PointsSystem={PointsSystem} onEnter={onEnter} />
            }
            {
                currentIndex == 2
                &&
                <PowersAvailable title={title} Power={Power} onEnter={onEnter} />
            }
            {
                currentIndex == 3 && title === 'MLB'
                &&
                <TeamRoster league={title} onEnter={onEnter} />
            }
            {
                currentIndex == 4 && title === 'MLB'
                &&
                <ContestRules game_set_start={game_set_start} prize={prize} powers={Power} points={PointsSystem} isMobileGameCenter={false} showDateTime={false}/>
            }
            <Footer
                onEnter={onEnter}
                entry_fee={entry_fee}
                onBack={() => {
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    } else {
                        onBackClick();
                    }
                }}
                onNext={() => {
                    if (currentIndex < 2) {
                        setCurrentIndex(currentIndex + 1);
                    } else if (currentIndex < 4 && title === 'MLB') {
                        setCurrentIndex(currentIndex + 1);
                    } else {
                        onNextClick();
                    }
                }}
                myGameCenter={myGameCenter}
            />
        </div>
    );
};

export default PowerCenterCardDetails;