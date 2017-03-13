import React, { PureComponent } from 'react';
var style=require("./ctStyle.scss")
var baseStyle=require("../../styles/base.scss")
import { Link} from 'react-router';
class CityType extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {title,citys,locationC} = this.props
   
    
    var cityNodes=[];
      if(title.length>2){
          var className= style.toleft
        }
        else{
           var className=style.linep
        } 
    
    citys.forEach(function(node,index){
       /* function goCity(){
            var cityOb=node;
            locationC(cityOb)
        }
        onClick={goCity}*/
        
        cityNodes.push(<li   className={className} key={"key"+index}><Link to={"/cinimaSelect/"+node.cityCode}>{node.cityName}</Link></li>)
    })
  
    return (<div  className={style.sline}>
                <h5 name={title}> {title}</h5>       
                <ul className={baseStyle.clear}>
                    {cityNodes}
                </ul>
    
            </div>)
   }
    
}

export default CityType;