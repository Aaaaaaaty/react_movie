import * as filmGoodsListActions from '../Action/FilmGoodsListAction'
import { combineReducers } from 'redux'

export const filmGoodsList = (state = [], action = {}) => {
	switch (action.type) {
		case filmGoodsListActions.FILM_GOODS_LIST_FETCH : 
		return state
		break

		case filmGoodsListActions.FILM_GOODS_LIST_SUCCESS : 
		return state = action.text
		break

		case filmGoodsListActions.FILM_GOODS_LIST_ERROR : 
		return state
		break

		default: 
		return state
		break
	}
}


export const filmGoodsListCounter = (state = [], action = {} ) => {
	let _state
	switch (action.type) {
		case filmGoodsListActions.FILM_GOODS_ACTION_INCREMENT : 
		_state = state.map ( (item, index) => {
			if (index == action.index) {
				item = item + 1;
			}
			return item
		})
		return state = _state
		break

		case filmGoodsListActions.FILM_GOODS_ACTION_DECREMENT : 
		_state = state.map ( (item, index) => {
			if (index == action.index) {
				 item = item - 1;
			}
			return item
		})
		return state =  _state
		break

		case filmGoodsListActions.FILM_GOODS_ACTION_INITIAL : 
		let len = action.length;
		let arr = new Array(len);
		for (let i = 0; i < len; i++) {
			arr[i] = 0;
		}
		return state = arr
		break

		default:
		return state
		break
	}
}

export default combineReducers({
  filmGoodsList,
  filmGoodsListCounter
})