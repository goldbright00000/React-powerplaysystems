import React from 'react';
import classes from './myGameCenterCard.module.scss';
import MLBPlayer from '../../assets/mlb-player.png';
import NFLPlayer from '../../assets/nfl-player.png';
import NBAPlayer from '../../assets/nba-player.png';
import NHLPlayer from '../../assets/nhl-player.png';
import BlueTick from '../../assets/blue_tick.png';
import PencilIcon from '../../assets/pencil_icon.png';
import PowerCenterCardDetails from '../PowerCenterCardDetails';
import OutlineButton from '../OutlineButton';
import ViewResults from '../../pages/MyGameCenter/ViewResults';
import Modal from '../../components/Modal';
import FinalStandingsModal from './FinalStandingsModal';

const MyGameCenterCard = (props) => {
    const {
        id = null,
        title = '',
        prize = null,
        outOf = null,
        total = null,
        percent = null,
        showDetails = false,
        inProgress = false,
        completed = false,
        teamManager = false,
        editPicks = false,
        makePicks = false,
        timeToStart = '',
        viewResults = false,
        finalStandingsModal = false,
        onDetailsClick = () => { },
        onBackClick = () => { },
        onNextClick = () => { },
        onEnter = () => { },
        onViewResults = () => { },
        onViewResultsBack = () => { },
        onFinalStandings = () => { }
    } = props || {};

    const getBackgroundImageWithStyle = () => {
        let backgroundImageStyle = {
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'inherit',
            border: inProgress && '1px solid #214f24',
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

    return (
        !showDetails
            ?
                !viewResults
                    ?
                        <div 
                            className={classes.__my_game_center_card} 
                            style={getBackgroundImageWithStyle()}>
                            {
                                inProgress
                                &&
                                <div className={classes.__my_game_center_card_in_progress}>
                                    <span></span>In Progress
                                </div>
                            }
                            <div className={classes.__my_game_center_card_powerdfs} style={{marginTop: inProgress && -3}}>
                                <span className={classes.__my_game_center_card_powerdfs_hr + ' ' + classes.__my_game_center_card_powerdfs_hr_left}></span>
                                <p className={classes.__my_game_center_card_powerdfs_title}>
                                    <span className={classes.__my_game_center_card_powerdfs_title_first}>{title}</span> PowerdFS
                            </p>
                                <span className={classes.__my_game_center_card_powerdfs_hr + ' ' + classes.__my_game_center_card_powerdfs_hr_right}></span>
                            </div>
                            <div className={classes.__my_game_center_card_date_time}>
                                Oct 24, 2020  |  8:00PM ET
                            </div>
                            <div className={classes.__my_game_center_card_prize_pool}>
                                <p
                                    className={classes.__my_game_center_card_prize_pool_common + ' ' + classes.__my_game_center_card_prize_pool_price}>
                                    ${prize}
                                </p>
                                <p
                                    className={classes.__my_game_center_card_prize_pool_common + ' ' + classes.__my_game_center_card_prize_pool_text}>
                                    {inProgress ? "Currently Winning" : "Prize Pool"}
                                </p>
                            </div>
                            <div className={classes.__my_game_center_card_buttons}>
                                {
                                    timeToStart
                                    &&
                                    <div className={classes.__my_game_center_card_buttons_time_to_start}>
                                        {timeToStart}
                                    </div>
                                }

                                {
                                    inProgress
                                    &&
                                    <div className={classes.__my_game_center_card_buttons_your_current_rank}>
                                        Your Current Rank: 240,051
                                    </div>
                                }
                                {
                                    teamManager
                                    &&
                                    <OutlineButton 
                                        title="Team Manager"
                                        onClick={onEnter}
                                    />
                                }

                                {
                                    editPicks
                                    &&
                                    <OutlineButton 
                                        title="Edit Picks"
                                        onClick={onEnter}
                                        styles={{color: '#f2f2f2', marginTop: 14}}
                                        icon={<img src={PencilIcon} width="16" height="16" />}
                                    />
                                }
                                
                                {
                                    makePicks
                                    &&
                                    <OutlineButton 
                                        title="Make Picks"
                                        onClick={onEnter}
                                        styles={{color: '#f2f2f2'}}
                                    />
                                }

                                {
                                    completed
                                    &&
                                    <div className={classes.__my_game_center_card_buttons_completed}>
                                        COMPLETED
                                    </div>
                                }

                                {
                                    completed
                                    &&
                                    <OutlineButton
                                        title="Final Standings"
                                        onClick={() => onFinalStandings(id)}
                                        styles={{marginTop: 14}}
                                    />
                                }
                            </div>
                            <div className={classes.__my_game_center_card_status_and_details}>
                                {
                                    inProgress || completed || timeToStart != ''
                                    ?
                                    <div className={classes.__my_game_center_card_full}>
                                        <div className={classes.__my_game_center_card_full_img}>
                                            <img src={BlueTick} width="18" height="18" />
                                        </div>
                                        <div className={classes.__my_game_center_card_full_text}>
                                            Full 200,000
                                        </div>
                                    </div>
                                    :
                                    <div className={classes.__my_game_center_card_total}>
                                        <p>
                                            {outOf} of <span>{total}</span>
                                        </p>
                                    </div>
                                }
                                
                                <div className={classes.__my_game_center_card_details}>
                                    {
                                        completed
                                        ?
                                        <div className={classes.__my_game_center_card_details_link} onClick={() => onViewResults(id)}>
                                            Winners
                                        </div>
                                        :
                                        <div className={classes.__my_game_center_card_details_link} onClick={() => onDetailsClick(id)}>
                                            Details
                                        </div>
                                    }  
                                    <div className={classes.__my_game_center_card_details_link_forward_arrow}>
                                        {">"}
                                    </div>
                                </div>
                            </div>
                            {
                                finalStandingsModal
                                &&
                                <FinalStandingsModal 
                                    isVisible={finalStandingsModal}
                                    onClose={() => onFinalStandings(-1)}
                                />
                            }
                        </div>
                    :
                <ViewResults 
                    title={title}
                    onViewResultsBack={() => onViewResultsBack()}
                />
            :
            <PowerCenterCardDetails
                title={title}
                onBackClick={() => onBackClick()}
                onNextClick={() => onNextClick()}
                myGameCenter={true}
            />
    );
};

export default MyGameCenterCard;