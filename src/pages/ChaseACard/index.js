import React, {useState, useEffect} from 'react'

import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import CardsSvg from '../../icons/Cards'
import CardBack from '../../assets/card_back.png'
import classes from './cardGamePage.module.scss'

function ChaseACard(props) {
    const totalCards = 55;
    const [cards, setCards] = useState([])

    useEffect(() => {
        pushCardsToArray()
    }, [])

    const onCardClick = (i) => {
        console.log('Card Selected', i)
     }

    function pushCardsToArray() {
        const _cards = []
        for (let i = 0; i < totalCards; i++) {
            _cards.push(i)
        }

        setCards(_cards)
    }

    return (
        <>
            <Header />
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace" />
                    <div className={classes._card_game_content_top}>
                            <CardsSvg style={{display: 'flex', height: 'auto'}} />
                        <p className={classes.__card_game_card_counter}>Chase The Ace Round</p>
                        <p className={classes.__card_game_info}> Select one card and if it's the Ace of Spades, you win $2000 CAD! </p>
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <Card>
                            <div className={classes.__card_game_content_cards}>
                                {
                                    cards.map(
                                        (itm, index) => <GameCard
                                                            key={itm + index.toString()}
                                                            isSelected image={CardBack}
                                            onClick={() => onCardClick(index)}
                                            styles={{width: '73px', height: '101px', margin: '5px 3.5px'}}
                                            />)
                                }
                            </div>
                        </Card>
                    </div>                
                </div>  
            </div>
            <Footer isBlack />
        </>
    )
}

export default ChaseACard

