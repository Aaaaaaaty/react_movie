import React, { PureComponent } from 'react';
var style=require("./ctStyle.scss")
var baseStyle=require("../../styles/base.scss")
class SearchResult extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {citys} = this.props
   
    
  
    var cityNodes=[]
    citys.forEach(function(node,index){
      cityNodes.push(<li  className={style.linep} key={"key"+index}>{node.cityName}</li>)
    })
  
    return (<div  className={style.sline}>
                <ul className={baseStyle.clear}>
                    {cityNodes}
                </ul>
    
            </div>)
   }
    
}

export default SearchResult;