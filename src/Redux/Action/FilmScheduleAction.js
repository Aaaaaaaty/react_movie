export const FILM_SCHEDULELIST_FETCH="FILM_SCHEDULELIST_FETCH"
export const FILM_SCHEDULELIST_ERROR="FILM_SCHEDULELIST_ERROR"
export const FILM_SCHEDULELIST_SUCESS="FILM_SCHEDULELIST_SUCESS"

export const fetchFilmScheduleList = (url, postData) => {
    return dispatch => {
      dispatch({type:"FILM_SCHEDULELIST_FETCH",text:""})
      return  fetch(url,{
                mode: 'no-cors',
                method:"GET",
              })
              .then(response => {
                if (response.ok) {
                  response.json().then(json =>{dispatch({type:"FILM_SCHEDULELIST_SUCESS",text:json})})
                } else {
                  dispatch({type:"FILM_SCHEDULELIST_ERROR",text:""})
                }
              })
              .catch(error => {
                dispatch({type:"FILM_SCHEDULELIST_ERROR",text:""})
              })
    }
}


export const FILM_LIST_FETCH="FILM_LIST_FETCH"
export const FILM_LIST_ERROR="FILM_LIST_ERROR"
export const FILM_LIST_SUCESS="FILM_LIST_SUCESS"

export const fetchFilmList = (url, postData) => {
    return dispatch => {
      dispatch({type:"FILM_LIST_FETCH",text:""})
      return  fetch(url,{
                mode: 'no-cors',
                method:"GET",
              })
              .then(response => {
                if (response.ok) {
                  response.json().then(json =>{dispatch({type:"FILM_LIST_SUCESS",text:json})})
                } else {
                  dispatch({type:"FILM_LIST_ERROR",text:""})
                }
              })
              .catch(error => {
                dispatch({type:"FILM_LIST_ERROR",text:""})
              })
    }
}
