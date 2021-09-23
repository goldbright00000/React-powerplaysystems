import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import DWallIcon from '../../assets/d-wall-main.png';
import XPIcon from '../../assets/point-multipliers-main.png';
import SwapIcon from '../../assets/player-swaps-main.png';
import VideoReviewIcon from '../../assets/video-review-main.png';
import RetroBoostIcon from "../../assets/retro-boost-icon.png";
import ChallengeIcon from "../../assets/challenge.svg"
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import PowerUpIcon from '../../assets/power-up-icon.svg';

const getIconAndDesc = (powerName) => {
    if (powerName) {
        if (powerName.toLowerCase().match(/wall/g))
            return {
                icon: DWallIcon,
                desc: '<p>Protect your Team-D with this point blocking Power. </p><p>Any points against your Team-Dwill not count while this Power is active.</p>'
            };

        else if (powerName.toLowerCase().match(/video|review/g))
            return {
                icon: VideoReviewIcon,
                desc: 'Seeing Runs scored against the Team Defence result in negative points for the Contest Participants fantasy team, they can use a video review for a 50/50 chance to negate any runs scored against. If the Team Defense just allowed a Grand Slam, use Video Review for a chance to have it reversed.'
            }

        else if (powerName.toLowerCase().match(/swap/g))
            return {
                icon: SwapIcon,
                desc: '<p>Keep your team in the game by swapping out underperforming or injured players.</p><p> You can swap for any same-position player whose game started at the same time asyour original selection.</p><p>For example, you can swap your QB for a new QB whose game started as the same time as your original selection.</p>'
            }

        else if (powerName.toLowerCase().match(/multi|point|1.5|2.5/g))
            return {
                icon: XPIcon,
                desc: '<p>Power-up your points with a Point Booster Power! Choose between 1.5x, 2x, and 3x boosters. You chose when to use. Try 3x when bases are loaded... or at the beginning of an drive.</p>'
            }

        else if (powerName.toLowerCase().match(/retro/g))
            return {
                icon: RetroBoostIcon,
                desc: '<p>Our very own time travel machine is ready for you! </p><p> Missed using your point booster before a TD, HR, or goal? </p><p> No worries, you have 30 seconds after the play to retroactively boost any missed opportunities by 2x.</p>'
            }

        else if (powerName.toLowerCase().match(/challenge/g))
            return {
                icon: ChallengeIcon,
                desc: '<p>This is a Coaches Challenge that you can use to challenge the last point generating play scored against your Team-D.</p><p>Activate it and our head office will flip a coin to see if the points scored against your Team-D will be reversed.</p><p> We thought it might be good to use after a Grand Slam or a 50-yard TD.</p>'
            }
        else if (powerName.toLowerCase().match(/power-up/g))
            return {
                icon: PowerUpIcon,
                desc: '<p>Have you run out of Powers? Need a couple more to push you to the top of the leaderboard?</p><p>Redeem your Power Tokens to get a new supply!</p>'
            }
    }
}

const ContestRulesPopUp = props => {

    const {
        points,
        powers
    } = props;
    const h3Class = 'title-2 __primary-text __bold __m-0  __font-family-teko __line-height-1'
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <>
            {useMemo(() => props.component && props.component({ showPopUp: () => {setShowPopUp(true) } }), [props])}
            {showPopUp && <CreatePopUpPortal>
                <div className={styles.popupWrapper}>
                    <div className={styles.blur} onClick={() => setShowPopUp(false)}></div>
                    <div className={`__title-6 modal-animation ${styles.popup}`}>
                        <div className={styles.crossicon} onClick={() => setShowPopUp(false)}><span></span></div>
                        <h1 className={`__m-0 main-title __center ${styles.title}`}>PowerdFS - <span className='__primary-text'>MLB</span></h1>
                        <h6 className={`__center __title-6 __m-0 __letter-spacing __bold ${styles.subtitle}`}>CONTEST RULES</h6>
                        <section className='__mt-4 __mb-3'>
                            <h1 className='__title-1 __primary-text __bold __m-0 __font-family-teko'>PowerdFS - MLB</h1>
                            <p className='m-0'>In Powered DFS MLB contests, Contest Participants will create a lineup by selecting players listed on the Player Selection Page. Star players have a Star identifier and participants may select a maximum of three star players on their fantasy team. Only one star player may be selected for each position.</p>
                            <p className='__mt-1 __mb-1'>Contest results will be determined by the total points accumulated by each Contest Participant (scoring rules summarized below).</p>
                            <p>Participation in each contest must be made only as specified in the Terms of Use. Failure to comply with these Terms of Use will result in disqualification and, if applicable, prize forfeiture.</p>
                        </section>
                        <section className='__mb-3 __mt-3'>
                            <h3 className='title-2 __primary-text __bold __m-0  __font-family-teko'>Scoring</h3>
                            <div className={styles.cardWrapper}>
                                {Object.keys(points).map((data, index) => {
                                    return (
                                        <div className={styles.card}>
                                            <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                            <ul>
                                                {points[data]?.map((item, i) => {
                                                    return (
                                                        <>
                                                            <li>{item.plays}</li>
                                                            <li>{item?.action} {item.points} Pts</li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Powers</h3>
                            <p>Powers are available to be used in this Contest and are included with the Contest Participants entry fee. Powers enable Contest Participants to enhance their fantasy team’s performance. The following powers will be made available for this contest:</p>
                            <div className={styles.powersSubSectionsWrapper}>
                                {powers && powers.length > 0 && powers.map((item, index) => {
                                    return (
                                        <section className={styles.powersSubSection}>
                                            <img src={getIconAndDesc(item?.powerName).icon} alt='' />
                                            <h4>{(item?.powerName == "Retro Boost")? "2x Retro Boost" :  item?.powerName}</h4>
                                            <p dangerouslySetInnerHTML={{__html: getIconAndDesc(item?.powerName).desc}}/>
                                        </section>
                                    )
                                })}
                            </div>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Scoring Notes</h3>
                            <p>Hitting statistics for Pitchers will not be counted and pitching statistics for Hitters will not be counted.</p>
                        </section>
                        <section>
                            <h3 className={h3Class}>Lineup Requirements</h3>
                            <p>Lineups will consist of 8 players.</p>
                            <p className='__mt-2'>The 8 roster positions are:</p>
                            <ul className={styles.linupRequrementsList}>
                                <li><span>1</span><b>P</b>  (Pitcher – Includes SPs and RPs)</li>
                                <li><span>1</span><b>C</b>  (Catcher)</li>
                                <li><span>1</span><b>SS</b>  (Shortstop)</li>
                                <li><span>2</span><b>xB</b>  (1B, 2B, or 3B)</li>
                                <li><span>2</span><b>OF</b>  (Outfielders)</li>
                                <li><span>1</span><b>Team Defense</b>  (Runs against are deducted from the contest participants point total)</li>
                            </ul>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Players available for Selection</h3>
                            <p className='__mb-2'>The Players available for selection will consist of all MLB players expected to be on the active roster for the teams scheduled to play. Occasionally a player may be missing from the list of available players due to trades or other unforeseen circumstances.</p>
                            <p>In most cases, once the Player selection list is established, the Player List will not be adjusted. A "Game Set" is a set of games used for contests; each contest is linked to one Game Set.</p>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Position Eligibility</h3>
                            <p>Player positions are determined at the sole discretion of PowerPlay Games.</p>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Cancelled, Postponed, and Rescheduled Games</h3>
                            <p>If a game is canceled, postponed, or rescheduled to a time outside of the original Scoring Period, the game will be disabled from the Game Set and players listed to play in that game will not be eligible to accrue points. Contest participants are free to swap out inactive players for other active players if they have Swaps available.</p>
                            <p className='__mt-2 __mb-2'>The Scoring Period for each contest participant’s fantasy team is defined as the time of the scheduled start of the first game within the Game Set wherein the contest participant has a player selected and the official end of all games where the contest participant has a player selected.</p>
                            <p className='__mt-2 __mb-2'>Any games that are disabled will be indicated as such on the Power Center page. Emails and other notifications may also be used to notify users of disabled games.</p>
                            <p>Games are "known" to be canceled or postponed once their status is updated as such by PowerPlay Games MLB stats-provider, Sportradar.</p>
                        </section>
                        <section className='mt-3'>
                            <h3 className={h3Class}>Suspended or Shortened Games</h3>
                            <p>PowerPlay Games uses official MLB statistics and only includes statistics from games MLB deems to be official. If the MLB declares a game "suspended" then the statistics generated before the game is suspended will count in Game Sets containing said game. Any statistics generated on a later date when the game resumes will not be included.</p>
                        </section>
                    </div>
                </div>
            </CreatePopUpPortal>}
        </>
    )
}



export default ContestRulesPopUp;