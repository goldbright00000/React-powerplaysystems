import { isEmpty } from 'lodash'

export function redirectTo(props ,{path = '/', state = {} }) {
    const { history: { push = () => { } } = {} } = props || {}
    if(!isEmpty(state))
        return push(path, state)
    
    return push(path)
}