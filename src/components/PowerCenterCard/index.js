import React from 'react';
import classes from './powerCenterCard.module.scss';
import MLBPlayer from '../../assets/mlb-player.png';
import NFLPlayer from '../../assets/nfl-player.png';
import NBAPlayer from '../../assets/nba-player.png';
import NHLPlayer from '../../assets/nhl-player.png';
import InfiniteEntry from '../../assets/invalid-name.svg';
import PowerCenterCardDetails from '../PowerCenterCardDetails';
import OutlineButton from '../OutlineButton';
import PowerCurrency from '../../assets/power-white.png';
import BtcCurrency from '../../assets/btc-white.png';
import EthCurrency from '../../assets/ethereum-white.png';

import OrangePowerCurrency from '../../assets/power-orange.png';
import OrangeBtcCurrency from '../../assets/btc-orange.png';
import OrangeEthCurrency from '../../assets/ethereum-orange.png';

import { getTimeZone } from '../../utility/shared';

const PowerCenterCard = (props) => {
    const {
        id = null,
        title = '',
        prize = null,
        currency = '$',
        prize_currency = 'USD',
        outOf = null,
        total = null,
        percent = null,
        game_type = '',
        game_set_start = '',
        start_time = '',
        paid_game = false,
        entry_fee = null,
        targeted_game = false,
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
        if (x >= 10000)
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        else
            return x;
    }

    const getCurrency = (currency) => {
        if (currency.toUpperCase() === 'BTC') {
            return BtcCurrency;
        } else if (currency.toUpperCase() === 'ETH') {
            return EthCurrency;
        }

        // if (currency.toUpperCase() === 'PWRS') {
        //     return PowerCurrency;
        // } else if (currency.toUpperCase() === 'BTC') {
        //     return BtcCurrency;
        // } else if (currency.toUpperCase() === 'ETH') {
        //     return EthCurrency;
        // }
    }

    const getEnterCurrency = (currency) => {
        if (currency.toUpperCase() === 'PWRS') {
            return OrangePowerCurrency;
        } else if (currency.toUpperCase() === 'BTC') {
            return OrangeBtcCurrency;
        } else if (currency.toUpperCase() === 'ETH') {
            return OrangeEthCurrency;
        }
    }

    return (
        !showDetails
            ?
            <div className={classes.__power_center_card} style={getBackgroundImageWithStyle()}>
                <div className={classes.__power_center_card_powerdfs}>
                    <span className={classes.__power_center_card_powerdfs_hr + ' ' + classes.__power_center_card_powerdfs_hr_left}></span>
                    <p className={classes.__power_center_card_powerdfs_title}>
                        <span className={classes.__power_center_card_powerdfs_title_first}>{title}</span> PowerdFS
                    </p>
                    <span className={classes.__power_center_card_powerdfs_hr + ' ' + classes.__power_center_card_powerdfs_hr_right}></span>
                </div>
                <div className={classes.__power_center_card_prize_pool}>
                    <p
                        className={classes.__power_center_card_prize_pool_common + ' ' + classes.__power_center_card_prize_pool_price}>
                        {currency === 'USD' ? (
                            `$`
                        ) : (
                            currency === 'PWRS' ? (
                                prize_currency === 'USD' ? (
                                    `$`
                                ) : (
                                    <img
                                        src={getCurrency(prize_currency)}
                                        width="20"
                                        alt=""
                                    />
                                )
                            ) : (
                                <img
                                    src={getCurrency(currency)}
                                    width="20"
                                    alt=""
                                />
                            )
                        )}
                        {numberWithCommas(prize)}
                    </p>
                    <p
                        className={classes.__power_center_card_prize_pool_common + ' ' + classes.__power_center_card_prize_pool_text}>
                        Prize Pool
                    </p>
                </div>

                <div className={classes.__power_center_card_enter}>
                    {userHasEntered ? (
                        <OutlineButton
                            title={`Entered`}
                        />
                    ) : (
                        total == outOf && targeted_game ? (
                            <OutlineButton
                                title={`Full ${total}`}
                            />
                        ) : (
                            paid_game || paid_game === null ? (
                                currency !== 'USD' ? (
                                    <OutlineButton
                                        title0={`Enter  •  `}
                                        title={entry_fee}
                                        onClick={onEnter}
                                        currency={getEnterCurrency(currency)}
                                    />
                                ) : (
                                    <OutlineButton
                                        title={`Enter  •  $${entry_fee}`}
                                        onClick={onEnter}
                                    />
                                )
                            ) : (
                                <OutlineButton
                                    title={`Enter  •  Free`}
                                    onClick={onEnter}
                                />
                            )
                        )
                    )}
                </div>
                <div className={classes.__power_center_card_date_time}>
                    {game_set_start} | {start_time} ET
                </div>
                <div className={classes.__power_center_card_status_and_details}>
                    <div className={classes.__power_center_card_total}>
                        {targeted_game ? (
                            <p>
                                {outOf} <span>of {total}</span>
                            </p>

                        ) : (
                            <p>
                                {outOf} <span>of <img src={InfiniteEntry} alt="infinite entry" /></span>
                            </p>
                        )}
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
                game_set_start={game_set_start}
                prize={numberWithCommas(prize)}
            />
    );
};

export default PowerCenterCard;