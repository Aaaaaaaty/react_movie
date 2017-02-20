import * as Actions from '../Action/Action';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducer from '../Reducer/Reducer';
import thunk from 'redux-thunk';

var store = createStore(
   combineReducers(reducer),
   applyMiddleware(thunk)
);




export const mapStateToProps =(state)=> {
  return {
    value: state.value,
    name: state.name,
    postMessage:state.postMessage
  }
}
export const mapDispatchToProps=(dispatch)=> {
  return {
    addState: () => dispatch(Actions.addNum("message")),
    changeName: () => dispatch(Actions.nameChange("message")),
    loadingData:()=>dispatch(Actions.fetchPosts("https://wholesaletest.playcomb.com/gameList/getWholeSaleGameList","123123"))
  }
}



export default store;