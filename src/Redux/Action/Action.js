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
        
        
        
        return fetch("http://10.2.45.84/package.json",{//http://10.2.45.84/package.json
            mode: 'no-cors',
            method:"GET",
            
        })
        .then(response => {
           
            console.log("status", response);
            //console.log("status", response.blob());
            if (response.ok) {
                response.json().then(json => dispatch({type:"REQUEST_RECEIVED",text:json}))
            } else {
                console.log("status1", response.status);
            }
        })
        .catch(error => console.log(error))
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
            }
        })
        .catch(error => {
           
                        console.log(error);
                        dispatch({type:"LOCATION_ERROR",text:""})
                        })
    }
}





