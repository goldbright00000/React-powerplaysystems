import { isEmpty } from 'lodash'
import { CONSTANTS } from './constants'

export function redirectTo(props ,{path = '/', state = {} }) {
    const { history: { push = () => { } } = {} } = props || {}
    if(!isEmpty(state))
        return push(path, state)
    
    return push(path)
}

export function IsAceCard(card) {
    return CONSTANTS.CARD_RANKS[card?.rank] === "A"
}

export function GetAceCardIndex() {
    return CONSTANTS.CARD_RANKS.indexOf("A")
}