import * as filmScheduleActions from '../Action/FilmScheduleAction'
import { combineReducers } from 'redux'

export const filmScheduleList = (state =[], action={})=>{
    switch(action.type){
        case filmScheduleActions.FILM_SCHEDULELIST_FETCH:
        return state
        case filmScheduleActions.FILM_SCHEDULELIST_SUCESS:
        return state.push(action.text.result)
        default:
        return state
    }
}

export default combineReducers({
  filmScheduleList
})
