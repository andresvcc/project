const initialState = {
    count: 0,
    loginStatus:false,
    typeUser:0,
    surname:'inconue',
    sessID:'vide',
    incrireVisibility:'visible'
}

function CounterReducer (state = initialState, action){
    switch(action.type){
        case "INCREMENT_COUNT": {
            return {...state, ...action}
        }
        case "DECREMENT_COUNT": {
            return {...state, ...action}
        }
        case "LOGIN": {
            return {...state, ...action}
        }
        case "LOGOUT": {
            return {...state, ...action}
        }
        default:
            return state
    }
} 

export default CounterReducer