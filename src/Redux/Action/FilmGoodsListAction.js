export const FILM_GOODS_LIST_FETCH="FILM_GOODS_LIST_FETCH"
export const FILM_GOODS_LIST_ERROR="FILM_GOODS_LIST_ERROR"
export const FILM_GOODS_LIST_SUCCESS="FILM_GOODS_LIST_SUCCESS"

export const fetchFilmGoodsList = (url, postData) => {
	return dispatch => {
		dispatch ({ type: "FILM_GOODS_LIST_FETCH", text: "" })
		return fetch (url, {
			mode: 'no-cors',
			method: 'GET'
		}).then (response => {
			if (response.ok) {
				response.json().then(json => {dispatch({ type:"FILM_GOODS_LIST_SUCCESS", text:json }) })
			} else {
				dispatch({ type: "FILM_GOODS_LIST_ERROR", text: "" })
			}
		}).catch (error => {
			dispatch({ type: "FILM_GOODS_LIST_ERROR", text: "" })
		})
	}
}


export const FILM_GOODS_ACTION_INCREMENT = "FILM_GOODS_ACTION_INCREMENT"
export const FILM_GOODS_ACTION_DECREMENT = "FILM_GOODS_ACTION_DECREMENT"
export const FILM_GOODS_ACTION_INITIAL = "FILM_GOODS_ACTION_INITIAL"

export const fetchFilmGoodsCount = (str, index, length) => {
	return dispatch => {
		dispatch ({ type: str, index: index, length: length});
	}
}