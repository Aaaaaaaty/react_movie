export const FILM_SEATLIST_FETCH="FILM_SEATLIST_FETCH"
export const FILM_SEATLIST_ERROR="FILM_SEATLIST_ERROR"
export const FILM_SEATLIST_SUCESS="FILM_SEATLIST_SUCESS"

export const fetchFilmSeatList = (url, postData) => {
    return dispatch => {
      dispatch({type:"FILM_SEATLIST_FETCH",text:""})
      return  fetch(url,{
                mode: 'no-cors',
                method:"GET",
              })
              .then(response => {
                if (response.ok) {
                  response.json().then(json =>{dispatch({type:"FILM_SEATLIST_SUCESS",text:json})})
                } else {
                  dispatch({type:"FILM_SEATLIST_ERROR",text:""})
                }
              })
              .catch(error => {
                dispatch({type:"FILM_SEATLIST_ERROR",text:""})
              })
    }
}
