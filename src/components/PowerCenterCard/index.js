import React from 'react';
import classes from './powerCenterCard.module.scss';
import MLBPlayer from '../../assets/mlb-player.png';
import MLBPlayerOppsite from '../../assets/baseball-player-copy.png';
import NFLPlayer from '../../assets/nfl-player.png';
import NBAPlayer from '../../assets/nba-player.png';
import NHLPlayer from '../../assets/nhl-player.png';
import InfiniteEntry from '../../assets/invalid-name.svg';
import PowerCenterCardDetails from '../PowerCenterCardDetails';
import OutlineButton from '../OutlineButton';
import OutlineButtonViceVersa from '../OutlineButtonViceVersa';

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
        game_type = 'PowerdFS',
        game_set_start = '',
        start_time = '',
        paid_game = false,
        entry_fee = null,
        targeted_game = false,
        showDetails = false,
        totalPoints = null,
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
        if (title === 'MLB' && game_type === 'PowerdFs_challenge') {
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

    const onEnterModal = () => {
        
    }

    return (
        !showDetails
            ?
            game_type !== 'PowerdFs_challenge' ? (
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
                                <span style={{
                                    marginRight: 10,
                                    color: "grey",
                                    textDecoration: "none",
                                    display: "inline-block"
                                }}></span>
                                Details
                            </div>
                            <div className={classes.__power_center_card_details_link_forward_arrow}>
                                {">"}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.__power_center__challenge_card} style={getBackgroundImageWithStyle()}>
                    <div className={classes.__card_title}>
                        <p className={classes.__card_title_text}>{title} <span className={classes.__card__title_first}>PowerdFS</span><br /> {totalPoints} Point Challenge!</p>
                    </div>
                    <div className={classes.__start_end_date}>
                        <span className={classes.__date_text}>{game_set_start} | {start_time} ET</span>
                    </div>
                    <div className={classes.__current_jackpot}>
                        <span className={classes.__current_jackpot_text}>Manage your team to {totalPoints} points and win</span>
                        <h1 className={classes.__current_jackpot_amount}> {currency === 'USD' ? (
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
                        )}{prize}!</h1>
                    </div>
                    <div className={classes.__win_power}>
                        <span className={classes.__win_power_span}>You have the Powers to win!</span>
                    </div>
                    <div className={classes.__card_button}>
                        <OutlineButtonViceVersa
                            title={`Enter`}
                            onClick={onEnter}
                        />
                    </div>
                    <div className={classes.__power_center_card_status_and_details}>
                        {/* <div className={classes.__power_center_card_total}>
                            {targeted_game ? (
                                <p>
                                    {outOf} <span>of {total}</span>
                                </p>

                            ) : (
                                <p>
                                    {outOf} <span>of <img src={InfiniteEntry} alt="infinite entry" /></span>
                                </p>
                            )}
                        </div> */}
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
                </div>
            )
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