import * as FilmChooseSeatActions from '../Action/FilmChooseSeatAction'
import { combineReducers } from 'redux'

export const filmSeatList = (state = {}, action={})=>{
    switch(action.type){
        case FilmChooseSeatActions.FILM_SEATLIST_FETCH:
        return state
        case FilmChooseSeatActions.FILM_SEATLIST_SUCESS:
        return state = action.text
        default:
        return state
    }
}

export default combineReducers({
  filmSeatList,
})
