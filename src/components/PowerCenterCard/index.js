import React from 'react';
import classes from './powerCenterCard.module.scss';
import MLBPlayer from '../../assets/mlb-player.png';
import NFLPlayer from '../../assets/nfl-player.png';
import NBAPlayer from '../../assets/nba-player.png';
import NHLPlayer from '../../assets/nhl-player.png';
import PowerCenterCardDetails from '../PowerCenterCardDetails';
import OutlineButton from '../OutlineButton';

const PowerCenterCard = (props) => {
    const {
        id = null,
        title = '',
        prize = null,
        outOf = null,
        total = null,
        percent = null,
        game_type = '',
        game_set_start = '',
        start_time = '',
        entry_fee = null,
        showDetails = false,
        onDetailsClick = () => { },
        onBackClick = () => { },
        onNextClick = () => { },
        onEnter = () => { },
        PointsSystem = [],
        Power = [],
        PrizePayout = [],
        userHasEntered = false,
    } = props || {};

    const getBackgroundImageWithStyle = () => {
        let backgroundImageStyle = {
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'inherit',
        };
        if (title === 'MLB') {
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

    const numberWithCommas = (x) => {
        if(x >= 10000)
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        else
            return x;
    }

    return (
        !showDetails
            ?
            <div className={classes.__power_center_card} style={getBackgroundImageWithStyle()}>
                <div className={classes.__power_center_card_powerdfs}>
                    <span className={classes.__power_center_card_powerdfs_hr + ' ' + classes.__power_center_card_powerdfs_hr_left}></span>
                    <p className={classes.__power_center_card_powerdfs_title}>
                        <span className={classes.__power_center_card_powerdfs_title_first}>{title}</span> {game_type}
                    </p>
                    <span className={classes.__power_center_card_powerdfs_hr + ' ' + classes.__power_center_card_powerdfs_hr_right}></span>
                </div>
                <div className={classes.__power_center_card_prize_pool}>
                    <p
                        className={classes.__power_center_card_prize_pool_common + ' ' + classes.__power_center_card_prize_pool_price}>
                        ${numberWithCommas(prize)}
                    </p>
                    <p
                        className={classes.__power_center_card_prize_pool_common + ' ' + classes.__power_center_card_prize_pool_text}>
                        Prize Pool
                    </p>
                </div>

                <div className={classes.__power_center_card_enter}>

                    {userHasEntered ? (
                        <>
                            <OutlineButton
                                title={`Entered`}
                            />
                        </>
                    ) : (
                        total == outOf ? (
                            <>
                                <OutlineButton
                                    title={`Full ${total}`}
                                />
                            </>
                        ) : (
                            <OutlineButton
                                title={`Enter  •  $${entry_fee}`}
                                onClick={onEnter}
                            />
                        )
                    )}

                </div>
                <div className={classes.__power_center_card_date_time}>
                    {game_set_start} | {start_time} ET
                </div>
                <div className={classes.__power_center_card_status_and_details}>
                    <div className={classes.__power_center_card_total}>
                        <p>
                            {outOf} <span>of {total}</span>
                        </p>
                    </div>
                    <div className={classes.__power_center_card_details}>
                        <div className={classes.__power_center_card_details_link} onClick={() => {
                            onDetailsClick(id)
                        }}>
                            Details
                        </div>
                        <div className={classes.__power_center_card_details_link_forward_arrow}>
                            {">"}
                        </div>
                    </div>
                </div>
            </div >
            :
            <PowerCenterCardDetails
                Power={Power}
                PrizePayout={PrizePayout}
                PointsSystem={PointsSystem}
                entry_fee={entry_fee}
                title={title}
                onBackClick={() => onBackClick()}
                onNextClick={() => onNextClick()}
                onEnter={onEnter}
            />
    );
};

export default PowerCenterCard;