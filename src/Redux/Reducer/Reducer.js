import * as Actions from '../Action/Action';
import { combineReducers } from 'redux'
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


export const cityMap = (state ={"citysData":[],"navData":[],"originData":[]}, action={})=>{

    switch(action.type){
        case Actions.CITYMAP_FETCHSTART:
        return {"citysData":[],"navData":[],"originData":[]}
        case Actions.CITYMAP_RECEIVE:
        return cityDataSetUp(action.text.result)
        default:
        return state
    }
}
function cityDataSetUp(data){

    var hotCitys=_(data).filter(function(city){
        return city.isHot=="true";
    })

    var sortdata=_(data).sortBy(function(city){
        return city.firstLetter;
    })

    var newdata=_(sortdata).groupBy(function(city){
        return city.firstLetter
    })

    var newdatac=[{title:"热门城市",citys:hotCitys}]
    var navData=["热门城市"]
    for(var i in newdata){
        newdatac.push({title:i,citys:newdata[i]});
        navData.push(i);
    }
   // console.log(data)
   var dataob={"citysData":newdatac,"navData":navData,originData:data}

    return dataob;
}


export const loctionCtiy = (state ={"text":"geting"}, action={})=>{

    switch(action.type){
        case Actions.LOCATION_FETCHSTART:
        return {"text":"waiting"}
        case Actions.LOCATION_RECEIVE:
        return action.text.result
        case Actions.LOCATION_ERROR:
        return {"text":"fail"}
        case Actions.LOCATION_CHANGE:
        return action.text
        default:
        return state
    }
}

export const searching=(state =false, action={})=>{
    switch(action.type){
        case Actions.SEARCH_START:
        return true
        case Actions.SEARCH_END:
        return false
        default:
        return state
    }
}

export const searchResult=(state ={keyWord:"",result:[]}, action={})=>{
    switch(action.type){
        case Actions.LOCATION_SEARCH:

        return findCinimals(action.text)

        default:
        return state
    }
}
function findCinimals(data){
    var keyWord=String(data.keyword).toLocaleLowerCase();
    var originData=data.origindata;


    if(String(keyWord).trim().length>0){

        var result=_(originData).filter(function(sdata,index){
            var bol=(String(sdata.cityName).toLocaleLowerCase().indexOf(keyWord)>-1||String(sdata.firstLetter).toLocaleLowerCase().indexOf(keyWord)>-1)

            return bol

         })

         return {keyWord:keyWord,result:result}
    }
    else{
        return {keyWord:"",result:[]}
    }

}



export const cityCinimas = (state ={"text":"waitToFetch"}, action={})=>{

    switch(action.type){
        case Actions.CITY_CINIMA_FETCH:
        return {"text":"waiting"}
        case Actions.CITY_CINIMA_RECEIVE:
        return action.text.result
        case Actions.CITY_CINIMA_ERROR:
        return {"text":"fail"}

        default:
        return state
    }
}

export default combineReducers({
  cityMap,
  loctionCtiy,
  searching,
  searchResult,
  cityCinimas
})
