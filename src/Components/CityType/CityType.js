import React, { PureComponent } from 'react';
var style=require("./ctStyle.scss")
var baseStyle=require("../../styles/base.scss")
class CityType extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {title,citys} = this.props
   
    
    var cityNodes=[];
       
    
    citys.forEach(function(node,index){
        cityNodes.push(<li  className={baseStyle.left} key={"key"+index}>{node.cityName}</li>)
    })
  
    return (<div className={style.sline}>
                <h5>{title}</h5>       
                <ul className={baseStyle.clear}>
                    {cityNodes}
                </ul>
    
            </div>)
   }
    
}

export default CityType;