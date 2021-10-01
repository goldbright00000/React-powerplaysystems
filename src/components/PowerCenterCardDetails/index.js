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
import MLBPlayer from '../../assets/mlb-player.png';
import MLBPlayerOppsite from '../../assets/baseball-player-copy.png';
import NFLPlayer from '../../assets/nfl-player.png';
import NBAPlayer from '../../assets/nba-player.png';
import NHLPlayer from '../../assets/nhl-player.png';

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
        prize = '',
        userHasEntered = false
    } = props || {};
    const [currentIndex, setCurrentIndex] = useState(0);
    const getBackgroundImageWithStyle = () => {
        let backgroundImageStyle = {
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'inherit',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.5
        };
        if (title === 'MLB1') {
            backgroundImageStyle.backgroundImage = `url(${MLBPlayerOppsite})`;
            backgroundImageStyle.backgroundPosition = "106px 60px";
        } else if (title === 'MLB') {
            backgroundImageStyle.backgroundImage = `url(${MLBPlayer})`;
            backgroundImageStyle.backgroundPosition = "-46px 18px";
        } else if (title === 'NFL') {
            backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
            backgroundImageStyle.backgroundPosition = "65px 60px";
        } else if (title === 'NBA') {
            backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
            backgroundImageStyle.backgroundPosition = "-75px 68px";
        } else {
            backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
            backgroundImageStyle.backgroundPosition = "36px 106px";
        }
        return backgroundImageStyle;
    }

    return (
        <div className={classes.__power_center_card_details} >
            <div style={getBackgroundImageWithStyle()}></div>
            <div style={{ zIndex: 1 }}>
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
                    <PointSystem PointsSystem={PointsSystem} onEnter={onEnter} title={title} />
                }
                {
                    currentIndex == 2
                    &&
                    <PowersAvailable title={title} Power={Power} onEnter={onEnter} />
                }
                {
                    currentIndex == 3
                    &&
                    <TeamRoster league={title} onEnter={onEnter} />
                }
                {
                    currentIndex == 4
                    &&
                    <ContestRules game_set_start={game_set_start} prize={prize} powers={Power} points={PointsSystem} isMobileGameCenter={false} showDateTime={false} title={title} />
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
                        } else if (currentIndex < 4) {
                            setCurrentIndex(currentIndex + 1);
                        } else {
                            onNextClick();
                        }
                    }}
                    myGameCenter={myGameCenter}
                    userHasEntered={userHasEntered}
                />
            </div>
        </div>
    );
};

export default PowerCenterCardDetails;