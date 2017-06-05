import * as filmDetailActions from '../Action/FilmDetailAction'
import { combineReducers } from 'redux'

export const filmDetailMsgPosition = (state = [], action={})=>{
    switch(action.type){
        case filmDetailActions.CHANGE_FILM_DETAILMSGPOSITION:
        if(action.text === 'down') {
          state = 'auto'
        } else {
          state = '4.16rem'
        }
        return state
        default:
        return state
    }
}

export default combineReducers({
  filmDetailMsgPosition
})
