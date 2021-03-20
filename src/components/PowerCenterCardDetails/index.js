import React, {useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import Hitters from './Hitters';
import classes from './index.module.scss';
import PointSystem from './PointSystem';
import PowersAvailable from './PowersAvailable';
import PrizeGrid from './PrizeGrid';

const PowerCenterCardDetails = (props) => {
    const {title = '', onBackClick = () => {}, onNextClick = () => {}} = props || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={classes.__power_center_card_details}>
            <Header title={title} />
            {
                currentIndex == 0
                &&
                <PrizeGrid />
            }
            {
                currentIndex == 1
                &&
                <Hitters />
            }
            {
                currentIndex == 2 && title !== 'NHL'
                &&
                <PowersAvailable />
            }
            {
                currentIndex == 2 && title === 'NHL'
                &&
                <PointSystem />
            }
            <Footer 
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
                    } else {
                        onNextClick();
                    }
                }}
            />
        </div>
    );
};

export default PowerCenterCardDetails;