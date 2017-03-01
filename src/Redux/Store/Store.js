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
    postMessage:state.postMessage,
    cityMap:state.cityMap,//所有 城市院线
    loctionCtiy:state.loctionCtiy,//所属地选择 所属地状态
    searching:state.searching,//所属地选择页面，是否点开搜索框
    searchResult:state.searchResult,//所处地选择 搜索结果
    cityCinimas:state.cityCinimas,//本市影院数据
  }
}
export const mapDispatchToProps=(dispatch)=> {
  return {
    addState: () => dispatch(Actions.addNum("message")),
    changeName: () => dispatch(Actions.nameChange("message")),
    loadingData:()=>dispatch(Actions.fetchPosts("https://wholesaletest.playcomb.com/gameList/getWholeSaleGameList","123123")),
    getCityMap:(url,data)=>dispatch(Actions.fetchCityMap(url,data)),//获取城市院线
    getCityLocation:(url,data)=>dispatch(Actions.fetchCityLocation(url,data)),//获取所在地
    changeCityLocation:(data)=>dispatch(Actions.changeLocation(data)),//改变所在地
    searchingStart:()=>dispatch(Actions.searchStart()),//点选所在地搜索框
    searchEnd:()=>dispatch(Actions.searchEnd()),//所在地搜索取消
    searchingWord:(data)=>dispatch(Actions.searchWord(data)),//所在地 搜索关键词
    fetchCityCinimas:(url,data)=>dispatch( Actions.fetchCityCinimas(url,data)),//获取所在城市影院
  }
}



export default store;