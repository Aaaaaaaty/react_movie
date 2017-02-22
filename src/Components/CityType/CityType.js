import React, { PureComponent } from 'react';
var style=require("./cityType.scss")
class CityType extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {title,citys} = this.props
   
    
    var cityNodes=[];
       
    
    citys.forEach(function(node,index){
        cityNodes.push(<li key={"key"+index}>{node.cityName}</li>)
    })
  
    return (<div className={style.oline}>
                <h5 className={style.olineTwo}>{title}</h5>       
                <ul>
                    {cityNodes}
                </ul>
    
            </div>)
   }
    
}

export default CityType;