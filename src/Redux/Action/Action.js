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