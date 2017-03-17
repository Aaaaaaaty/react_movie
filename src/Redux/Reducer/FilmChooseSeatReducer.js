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

export const filmBuyList = (state = {item:[],isSoldUrl:{},type:''}, action={})=>{
    switch(action.type){
        case FilmChooseSeatActions.CHANGE_FILM_BUYSEAT:
        let _state = Object.assign({}, state)
        if(action.text.type === 'add') {
          _state.item.push(action.text.item)
        } else {
          let index = _state.item.indexOf(action.text.item)
          _state.item.splice(index, 1)
        }
        _state.isSoldUrl = action.text.isSoldUrl
        _state.type = action.text.type
        return _state
        default:
        return state
    }
}


export default combineReducers({
  filmSeatList,
  filmBuyList
})
