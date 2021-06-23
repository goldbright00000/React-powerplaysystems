import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Hitters from './Hitters';
import classes from './index.module.scss';
import PointSystem from './PointSystem';
import PowersAvailable from './PowersAvailable';
import PrizeGrid from './PrizeGrid';
import TeamRoster from './TeamRoster';

const PowerCenterCardDetails = (props) => {
    const {
        entry_fee = '',
        title = '',
        onBackClick = () => { },
        onNextClick = () => { },
        myGameCenter = false,
        PointsSystem = [],
        Power = [],
        PrizePayout = []
    } = props || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={classes.__power_center_card_details}>
            <Header title={title} />
            {
                currentIndex == 0
                &&
                <PrizeGrid PrizePayout={PrizePayout} />
            }
            {
                currentIndex == 1 && title !== 'NHL'
                &&
                <Hitters PointsSystem={PointsSystem} />
            }
            {
                currentIndex == 1 && title === 'NHL'
                &&
                <PointSystem />
            }
            {
                currentIndex == 2
                &&
                <PowersAvailable title={title} Power={Power} />
            }
            {
                currentIndex == 3 && title === 'MLB'
                &&
                <TeamRoster league={title} />
            }
            <Footer
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
                    } else if (currentIndex < 3 && title === 'MLB') {
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