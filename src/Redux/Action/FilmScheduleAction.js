export const FILM_SCHEDULELIST_FETCH="FILM_SCHEDULELIST_FETCH"
export const FILM_SCHEDULELIST_ERROR="FILM_SCHEDULELIST_ERROR"
export const FILM_SCHEDULELIST_SUCESS="FILM_SCHEDULELIST_SUCESS"

export const fetchFilmScheduleList = (url, postData) => {
    return dispatch => {
      dispatch({type:"FILM_SCHEDULELIST_FETCH",text:"123"})
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
