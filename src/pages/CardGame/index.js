import React, {useState, useEffect} from 'react'

import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import './cardGamePage.scss'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'

function CardGame(props) {
    const [count, setCount] = useState(0);
    useEffect(() => { 
        let time = 0;
        const timeOut = setInterval(() => {
            if (time !== 5) {
                time++
                setCount(time)
            } else {
                time = 0;
                setCount(0)
            }
        }, 1000)

        return () => clearInterval(timeOut)
    }, [])

    return (
        <>
            <Header />
            <div className="__card_game_content">
                <div className="__card_game_content_left">
                    <PageHeader title="Chase The Ace" />
                    <div className="_card_game_content_top">
                            <CardsSvg style={{display: 'flex', height: 'auto'}} />
                        <p className="__card_game_card_counter">Card <span>2</span> of 5</p>
                        <p className="__card_game_round_counter">Round <span>2</span> of 5</p>
                        <span className="__card_divider"></span>
                        <p className="__card_game_Next_card_drawn_in">Next card drawn in</p>
                        <ProgressBar
                            progress={count}
                            maxProgress={5}
                            size={62}
                            strokeWidth={4}
                            circleOneStroke='grey'
                            circleTwoStroke='#e3610a' />
                    </div>

                    <div className="__card_game_content_body">
                        <Card>
                            <div className="__card_game_content_cards">
                                <GameCard />
                                <GameCard />
                                <GameCard />
                                <GameCard />
                                <GameCard />
                            </div>
                            <button className={'__reload_btn'}>
                                <Reload size={54} className="__reload_svg_icon" />
                            </button>
                        </Card>
                    </div>

                    <div className="__card_game_content_footer">
                        <Alert success />
                        
                        <button className={`__btn __card_game_footer_btn`}>Chace The Ace!</button>
                    </div>
                
                </div>
                
                <Sidebar />
            </div>
            <Footer isBlack />
        </>
    )
}

CardGame.propTypes = {

}

export default CardGame

