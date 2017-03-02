import fetch from 'isomorphic-fetch'
import $ from 'jquery'
export const ADD = 'INCREMENT';
export const MINUS = 'DECREMENT';
export const NAME_CHANGE = 'NAME_CHANGE';
export const REQUEST_START="REQUEST_START";
export const REQUEST_RECEIVED="REQUEST_RECEIVED"

export const nameChange= function(text) {
  return {
    type: NAME_CHANGE,
    text
  }
}

export const addNum= function(text) {
  return {
    type: ADD,
    text
  }
}

export const minusNum= function(text) {
  return {
    type: MINUS,
    text
  }
}


export const fetchPosts = (url, postData) => {
    return dispatch => {
        dispatch({type:"REQUEST_START",text:postData});

        return (
                 $.ajax({
                        url : "http://hdsupport.tgbus.com/api/index?aid=31&cid=3&s=get_targets&page_size=500",
                        dataType : "jsonp",
                        success : function(data){
                           dispatch({type:"REQUEST_RECEIVED",text:data})
                        },
                        error:function(){
                            //alert('fail');
                        }
                    })

        )




    }
}

export const CITYMAP_FETCHSTART="CITYMAP_FETCHSTART";
export const CITYMAP_RECEIVE="CITYMAP_RECEIVE"

export const fetchCityMap = (url, postData) => {
    return dispatch => {
        dispatch({type:"CITYMAP_FETCHSTART",text:postData});

      return fetch(url,{
            mode: 'no-cors',
            method:"GET",
        })
        .then(response => {
            if (response.ok) {
                response.json().then(json =>{ dispatch({type:"CITYMAP_RECEIVE",text:json})})
            } else {
                console.log("status", response.status);
            }
        })
        .catch(error => {console.log(error);})
    }
}

export const LOCATION_FETCHSTART="LOCATION_FETCHSTART";
export const LOCATION_RECEIVE="LOCATION_RECEIVE"
export const LOCATION_ERROR="LOCATION_ERROR"
export const LOCATION_CHANGE="LOCATION_CHANGE"

export const changeLocation= function(text) {
  return {
    type: LOCATION_CHANGE,
    text
  }
}

export const fetchCityLocation = (url, postData) => {
    return dispatch => {
        dispatch({type:"LOCATION_FETCHSTART",text:postData});

      return fetch(url,{
            mode: 'no-cors',
            method:"GET",
        })
        .then(response => {

            if (response.ok) {

                response.json().then(json =>{ dispatch({type:"LOCATION_RECEIVE",text:json})})
            } else {
                console.log("status", response.status);
                dispatch({type:"LOCATION_ERROR",text:""})
            }
        })
        .catch(error => {

                        console.log(error);
                        dispatch({type:"LOCATION_ERROR",text:""})
                        })
    }
}

export const SEARCH_START="SEARCH_START"
export const SEARCH_END="SEARCH_END"
export const LOCATION_SEARCH="LOCATION_SEARCH"

export const searchWord= function(text) {
  return {
    type: LOCATION_SEARCH,
    text
  }
}
export const searchStart=function(text) {
  return {
    type: SEARCH_START,
    text
  }
}
export const searchEnd=function(text) {
  return {
    type: SEARCH_END,
    text
  }
}

export const CITY_CINIMA_FETCH="CITY_CINIMA_FETCH"
export const CITY_CINIMA_RECEIVE="CITY_CINIMA_RECEIVE"
export const CITY_CINIMA_ERROR="CITY_CINIMA_ERROR"

export const fetchCityCinimas = (url, postData) => {
    return dispatch => {
        dispatch({type:"CITY_CINIMA_FETCH",text:postData});

      return fetch(url,{
            mode: 'no-cors',
            method:"GET",
        })
        .then(response => {

            if (response.ok) {

                response.json().then(json =>{ dispatch({type:"CITY_CINIMA_RECEIVE",text:json})})
            } else {
                console.log("status", response.status);
                 dispatch({type:"CITY_CINIMA_ERROR",text:""})
            }
        })
        .catch(error => {

                        console.log(error);
                        dispatch({type:"CITY_CINIMA_ERROR",text:""})
                        })
    }
}
