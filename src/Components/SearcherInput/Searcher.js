import React, { PureComponent } from 'react';
var style=require("./style.scss")
class Searcher extends PureComponent {
    constructor(props){
       super(props);
       
     }
    searchWord(event){
        const {searchingWord,origindata}=this.props;
        searchingWord({"keyword":event.target.value,"origindata":origindata})
         
    }
    cancelSearch(event){
        const {searchEnd,searchingWord,origindata} = this.props;
        this.refs.myInput.value="";
        searchingWord({"keyword":"","origindata":origindata})
        searchEnd()
    }
    
    render() {
	  
        const {searching,searchingStart,searchEnd,searchResult} = this.props;
        
   //var a=style.searchbox+" "+style.searchbox1
    
   
   // console.log(searchResult)
        var mySearch=""
   if(searching){
        mySearch=style.searching
   }
    
    return (<div className={style.searchbox} >
               <div className={mySearch} >
                    <input ref="myInput" placeholder="输入城市名或拼音" onFocus={searchingStart}  onKeyUp={this.searchWord.bind(this)} />
                    <em className={style.searchicon}></em>
                    <em onClick={this.cancelSearch.bind(this)} className={style.cancelicon}>取消</em>
                </div>
            </div>)
   }
    
}

export default Searcher;