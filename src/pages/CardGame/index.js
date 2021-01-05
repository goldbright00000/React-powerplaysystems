import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {redirectTo} from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import BoltIcon from '../../assets/bolt.png'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import SidebarButton from '../../components/SidebarButton'
import Replace from '../../icons/Replace'
import PlusMinus from '../../icons/PlusAndMinus'
import { CONSTANTS } from '../../utility/constants'
import { IsAceCard } from '../../utility/shared'
import { setCardState, resetCardState, cardGameInventory } from '../../actions/cardGameAction'
import classes from './cardGamePage.module.scss'

const TOTAL_ROUNDS = 5;
const MAX_ROUND_TIME = 2;
let _round = 0;
const cardsArr = []
const aceCardsArr = []

function CardGame(props) {
    const [cardsState, setCardsState] = useState({})
    const [count, setCount] = useState(MAX_ROUND_TIME)
    const [currentRound, setCurrentRound] = useState(0)

    const dispatch = useDispatch();
    const { collectedAceCards = [],
        inventory = {}
    } = useSelector(state => state.cardGame)

    const { replace = 0, replaceAll = 0, powerMatch = 0, increase = 0, decrease = 0 } = inventory || {}
    
    useEffect(() => { 
        resetStates()
    }, [])

    useEffect(() => {
        let timeOut = null;

        if (_round < TOTAL_ROUNDS) {
            let time = MAX_ROUND_TIME;
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    time = MAX_ROUND_TIME;
                    setCount(time)

                    _round += 1;
                    setCurrentRound(_round)
                    updateCardState()
                }
            }, 1000)
        } else {
            clearInterval(timeOut)
        }

        return () => clearInterval(timeOut)
    }, [currentRound])

    const resetStates = () => {
        while (cardsArr?.length > 0) {
            cardsArr.pop();
        }

        while (aceCardsArr?.length > 0) {
            aceCardsArr.pop()
        }

        _round = 0;
        setCardsState({})
        setCurrentRound(0)
        setCount(MAX_ROUND_TIME)
        dispatch(resetCardState())
    }

    const updateCardState = () => {
        let card = getRandomCard()

        // let collectedAce = getAceCount(card);
        let isCardAceCompleted = updateAceCard(card)
        if (isCardAceCompleted) {
            //recursive call
            return updateCardState()
        }
        cardsArr.push(card)

        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: card})
    }

    const getRandomCard = () => {
        let card = {};
        let _cardSuit = Math.floor(Math.random() * (3 - 1) + 1)
        let _cardRankIndex = Math.floor(Math.random() * (13 - 2) + 2)
        
        card.suit = _cardSuit;
        card.rank = _cardRankIndex;

        return card
    }

    const updateAceCard = (card) => {
        if (IsAceCard(card)) {
            const _collectedAceCards = collectedAceCards;
            if (_collectedAceCards?.length && _collectedAceCards?.length > 0) {
                const _aceCardInfo = _collectedAceCards?.filter(_card => _card.suit === card.suit)[0]
                if (_aceCardInfo) {
                    const { suit = 0, aceCards = 0 } = _aceCardInfo || {}
                    let _aceCards = aceCards
                    if (_aceCards === CONSTANTS.MAX_ACE_PER_CARD) {
                        //ace cards for current suit is completed
                        //select random card
                        return true
                    } else {
                        _aceCards += 1;
                    }

                    const _aceCard = {
                        suit: suit,
                        aceCards: _aceCards,
                    }
                    let cardIndex = _collectedAceCards?.indexOf(_aceCardInfo)
                    aceCardsArr[cardIndex] = _aceCard
                    dispatch(setCardState(aceCardsArr))   
                } else {
                    const _aceCard = {
                        suit: card.suit,
                        aceCards: 1
                    }
    
                    aceCardsArr.push(_aceCard)
                    dispatch(setCardState(aceCardsArr))
                }
            } else {
                //no ace card is available in state
                //store new ace cards to state
                const _aceCard = {
                    suit: card.suit,
                    aceCards: 1
                }

                aceCardsArr.push(_aceCard)
                dispatch(setCardState(aceCardsArr))
            }
        }

        return false
    }

    const updateCards = (index, card) => {
        cardsArr[index] = card
        let isAceCompleted = updateAceCard(card)
        if (!isAceCompleted) {
            setCardsState({...cardsState, collectedCards: cardsArr})
        }
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, {path})
    }

    const getAceCards = () => {
        let totalAces = 0;
        if (collectedAceCards.length) {
            totalAces = collectedAceCards?.reduce((c1, c2) => {
                return c1 + (c2['aceCards'] || 0)
            }, 0)
        }

        return totalAces;
    }

    const updateInventory = (inventoryValue, actionType) => {
        const _inventory = inventory;

        switch (actionType) {
            case CONSTANTS.CARD_POP_ACTIONS.INCREASE:
                _inventory.increase = inventoryValue
                break
            
            case CONSTANTS.CARD_POP_ACTIONS.DECREASE:
                _inventory.decrease = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH:
                _inventory.powerMatch = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.REPLACE:
                _inventory.replace = inventoryValue
                break;
        }

        dispatch(cardGameInventory(_inventory))
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
                                    card={cardsState?.collectedCards?.[0]}
                                    isSelected={cardsArr[0] && true}
                                    cardIndex={0}
                                    collectedAceCards={collectedAceCards}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup
                                    card={cardsState?.collectedCards?.[1]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[1]?.rank] === "A"}
                                    isSelected={cardsArr[1] && true}
                                    cardIndex={1}
                                    collectedAceCards={collectedAceCards}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup
                                    card={cardsState?.collectedCards?.[2]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[2]?.rank] === "A"}
                                    isSelected={cardsArr[2] && true}
                                    cardIndex={2}
                                    collectedAceCards={collectedAceCards}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup
                                    card={cardsState?.collectedCards?.[3]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[3]?.rank] === "A"}
                                    isSelected={cardsArr[3] && true}
                                    cardIndex={3}
                                    collectedAceCards={collectedAceCards}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup
                                    card={cardsState?.collectedCards?.[4]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[4]?.rank] === "A"}
                                    isSelected={cardsArr[4] && true}
                                    cardIndex={4}
                                    collectedAceCards={collectedAceCards}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                            </div>
                            <button className={classes.__reload_btn} onClick={resetStates}
                                disabled={cardsArr.length !== 5 ? true : false}
                            >
                                <Reload size={48} className={classes.__reload_svg_icon}/>
                            </button>
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        <Alert primary collectedAce={getAceCards() || 0} />

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
                            toolText={`${replace} left`}
                            icon={<Replace style={{height: 'auto'}}/>}
                        />

                        <SidebarButton
                            primary
                            title="Replace All"
                            toolText={`${replaceAll} left`}
                            icon={<div
                                className={classes.__sidebar_reload_btn}>
                                <Reload bgColor={"#0ff"} style={{height: 'auto'}}/>
                            </div>}
                        />

                        <SidebarButton
                            primary
                            title="Power Match"
                            toolText={`${powerMatch} left`}
                            icon={<img src={BoltIcon} width={53} height={53} alt={''}/>}
                        />

                        <SidebarButton
                            primary
                            title="Increase"
                            toolText={`${increase} left`}
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

