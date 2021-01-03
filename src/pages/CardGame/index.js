import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import {redirectTo} from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import SidebarButton from '../../components/SidebarButton'
import PowerMatchImg from '../../assets/flash.png'
import Replace from '../../icons/Replace'
import PlusMinus from '../../icons/PlusAndMinus'
import classes from './cardGamePage.module.scss'
import { CONSTANTS } from '../../utility/constants'

const TOTAL_ROUNDS = 5;
let _round = 0;
let _collectedAces = 0;
const cardsArr = []

function CardGame(props) {
    const [count, setCount] = useState(5)
    const [currentRound, setCurrentRound] = useState(0)
    const [collectedAces, setCollectedAces] = useState(0)
    const [card, setCard] = useState({ suit: 0, rank: 0 })
    
    useEffect(() => { 
        resetStates()
    }, [])

    useEffect(() => {
        let timeOut = null;

        if (_round < TOTAL_ROUNDS) {
            let time = 5;
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--
                    setCount(time)
                } else {
                    time = 5;
                    setCount(5)

                    _round += 1;
                    setCurrentRound(_round)
                    let _card = getACard()
                    cardsArr.push(_card)
                    setCard(_card)
                }
            }, 1000)
        } else {
            clearInterval(timeOut)
        }

        return () => clearInterval(timeOut)
    }, [currentRound])

    const resetStates = () => {
        while (cardsArr.length > 0) {
            cardsArr.pop();
        }

        _round = 0;
        _collectedAces = 0;
        setCollectedAces(0);
        setCard({ suit: 0, rank: 0 });
        setCurrentRound(0)
    }

    const getACard = () => {
        let card = {};
        let _cardSuit = Math.floor(Math.random() * (3 - 1) + 1)
        let _cardRankIndex = Math.floor(Math.random() * (13 - 2) + 2)
        
        if (CONSTANTS.CARD_RANKS[_cardRankIndex] === "A") {
            _collectedAces += 1;
            setCollectedAces(_collectedAces)
        }
        card.suit = _cardSuit;
        card.rank = _cardRankIndex;
        return card
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, {path})
    }

    return (
        <>
            <Header/>
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace"/>
                    <div className={classes._card_game_content_top}>
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>Card <span>{currentRound}</span> of {TOTAL_ROUNDS}
                        </p>
                        <p className={classes.__card_game_round_counter}>Round <span>2</span> of 5</p>
                        <span className={classes.__card_divider} />
                        <p className={classes.__card_game_Next_card_drawn_in}>Next card drawn in</p>
                        <ProgressBar
                            progress={count}
                            maxProgress={5}
                            size={62}
                            strokeWidth={4}
                            circleOneStroke='grey'
                            circleTwoStroke='#fff'/>
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <Card>
                            <div className={classes.__card_game_content_cards}>
                                <GameCard
                                    showCardPopup
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[0]?.rank] === "A"}
                                    card={cardsArr[0]}
                                    isSelected={cardsArr[0] && true}
                                />
                                <GameCard
                                    showCardPopup
                                    card={cardsArr[1]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[1]?.rank] === "A"}
                                    isSelected={cardsArr[1] && true} />
                                <GameCard
                                    showCardPopup
                                    card={cardsArr[2]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[2]?.rank] === "A"}
                                    isSelected={cardsArr[2] && true} />
                                <GameCard
                                    showCardPopup
                                    card={cardsArr[3]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[3]?.rank] === "A"}
                                    isSelected={cardsArr[3] && true} />
                                <GameCard
                                    showCardPopup
                                    card={cardsArr[4]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[4]?.rank] === "A"}
                                    isSelected={cardsArr[4] && true} />
                            </div>
                            <button className={classes.__reload_btn} onClick={resetStates}>
                                <Reload size={48} className={classes.__reload_svg_icon}/>
                            </button>
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        <Alert primary collectedAce={collectedAces} />

                        <button className={`__btn ${classes.__card_game_footer_btn}`}
                            onClick={() => _redirectTo('/chase-a-card')}>
                            Chase The Ace!
                        </button>
                    </div>
                </div>

                <Sidebar>
                    <div className={classes.__sidebar_header}>
                        <span className={classes.__sidebar_header_title}>My Powerplays</span>
                        <div className={classes.__sidebar_header_balance}>
                            <span>My Balance</span>
                            <span className={classes.__sidebar_balance_text}>$0.00</span>
                        </div>
                    </div>

                    <div className={classes.__sidebar_button_wrapper}>
                        <SidebarButton
                            success
                            title="Replace"
                            toolText="1 left"
                            icon={<Replace style={{height: 'auto'}}/>}
                        />

                        <SidebarButton
                            primary
                            title="Replace All"
                            toolText="$.25"
                            icon={<div className={classes.__sidebar_reload_btn}><Reload bgColor={"#0ff"}
                                                                                        style={{height: 'auto'}}/>
                            </div>}
                        />

                        <SidebarButton
                            primary
                            title="Power Match"
                            toolText="$.25"
                            icon={<img src={PowerMatchImg} width={48} height={48} alt={''}/>}
                        />

                        <SidebarButton
                            primary
                            title="Increase"
                            toolText="$.25"
                            icon={<PlusMinus style={{height: 'auto'}}/>}
                        />

                        {/* <SidebarButton
                            primary
                            title="Decrease"
                            toolText="$.25"
                            icon={<ArrowDown style={{height: 'auto'}}/>}
                        /> */}
                    </div>
                </Sidebar>
            </div>
            <Footer isBlack/>
        </>
    )
}

CardGame.propTypes = {}

export default withRouter(CardGame)

