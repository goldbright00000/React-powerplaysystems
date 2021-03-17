import React, {useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import Hitters from './Hitters';
import classes from './index.module.scss';
import PowersAvailable from './PowersAvailable';
import PrizePayouts from './PrizePayouts';

const PowerCenterCardDetails = (props) => {
    const {title = ''} = props || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={classes.__power_center_card_details}>
            <Header title={title} />
            {
                currentIndex == 0
                &&
                <PrizePayouts />
            }
            {
                currentIndex == 1
                &&
                <Hitters />
            }
            {
                currentIndex == 2
                &&
                <PowersAvailable />
            }
            
            <Footer 
                onBack={() => {
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    }
                }}
                onNext={() => {
                    if (currentIndex < 2) {
                        setCurrentIndex(currentIndex + 1);
                    }
                }}
            />
        </div>
    );
};

export default PowerCenterCardDetails;