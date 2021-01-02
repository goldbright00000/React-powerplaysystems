import React from 'react'
import PropTypes from 'prop-types'

import { CONSTANTS } from '../../utility/constants'
import Clubs from './Club/Clubs';
import Spade from './Spade/Spades';
import Hearts from './Hearts/Hearts';
import Diamonds from './Diamond/Diamonds';

function Cards(props) {
    const { card: { suit = 0, rank = 0 } = {} } = props || {}
    
    const renderCard = (suit, rank) => {
        let _rank = CONSTANTS.CARD_RANKS[rank]
        switch (suit) {
            case CONSTANTS.CARD_SUITS.DIAMOND:
                return <Diamonds style={{height: 'auto'}} width={130} height={195} value={`${_rank}`} />

            case CONSTANTS.CARD_SUITS.CLUB:
                return <Clubs style={{height: 'auto', margin: '0', padding: '0'}} width={130} height={195} value={`${_rank}`} />

            case CONSTANTS.CARD_SUITS.HEART:
                return <Hearts style={{height: 'auto'}} width={130} height={195} value={`${_rank}`} />

            case CONSTANTS.CARD_SUITS.SPADE:
                return <Spade style={{height: 'auto'}} width={130} height={195} value={`${_rank}`} />
        }
    }

    return (
        <>
          {renderCard(suit, rank)}  
        </>
    )
}

Cards.propTypes = {
    card: PropTypes.object
}

export default Cards

