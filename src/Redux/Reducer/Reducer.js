import * as Actions from '../Action/Action';


    
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