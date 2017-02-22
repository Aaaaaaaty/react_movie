import * as Actions from '../Action/Action';

import _ from 'underscore';
    
export const value = (state = 5, action={})=>{
     
  // console.log(state)
     switch(action.type){
        case Actions.ADD:
        return state+1
        case Actions.MINUS:
        return state-1
        default:
      return state
  }
}
export const name = (state = "aaa", action={})=>{
 
   //  console.log(state)
    switch(action.type){
        case Actions.NAME_CHANGE:
        return state+"a"
        default:
        return state
    }
}

export const postMessage = (state = "nomessage", action={})=>{
 
   //  console.log(state)
    switch(action.type){
        case Actions.REQUEST_START:
        return "loading"
        case Actions.REQUEST_RECEIVED:
            //console.log(action.text)
        return JSON.stringify(action.text)
        default:
        return state
    }
}


export const cityMap = (state =[], action={})=>{
 
    switch(action.type){
        case Actions.CITYMAP_FETCHSTART:
        return []
        case Actions.CITYMAP_RECEIVE:
        return cityDataSetUp(action.text.result)
        default:
        return state
    }
}
function cityDataSetUp(data){
    var newdata=_(data).groupBy(function(city){
        return city.firstLetter
    })
    var newdatac=[]
    for(var i in newdata){
        newdatac.push({title:i,citys:newdata[i]});
    }
    
 
    return newdatac;
}


export const loctionCtiy = (state ={"text":"geting"}, action={})=>{
 
    switch(action.type){
        case Actions.LOCATION_FETCHSTART:
        return {"text":"waiting"}
        case Actions.LOCATION_RECEIVE:
        return action.text.result
        case Actions.LOCATION_ERROR:
            
        return {"text":"fail"}
        
        default:
        return state
    }
}
