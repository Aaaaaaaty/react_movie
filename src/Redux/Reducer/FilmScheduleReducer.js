import * as filmScheduleActions from '../Action/FilmScheduleAction'
import { combineReducers } from 'redux'

export const filmScheduleList = (state = [], action={})=>{
    switch(action.type){
        case filmScheduleActions.FILM_SCHEDULELIST_FETCH:
        return state
        case filmScheduleActions.FILM_SCHEDULELIST_SUCESS:
        return state = action.text.result
        default:
        return state
    }
}

export const filmList = (state = [], action={})=>{
    switch(action.type){
        case filmScheduleActions.FILM_LIST_FETCH:
        return state
        case filmScheduleActions.FILM_LIST_SUCESS:
        return state = action.text
        default:
        return state
    }
}

export default combineReducers({
  filmScheduleList,
  filmList
})
