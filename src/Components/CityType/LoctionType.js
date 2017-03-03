import React, { PureComponent } from 'react';
var style=require("./ctStyle.scss")
var baseStyle=require("../../styles/base.scss");
import { Link} from 'react-router';
class CityType extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {cityData,recheck} = this.props
   
    var showIner=<div >正在定位中</div>
  
    if(!!cityData.cityName){
        showIner=<li className={style.toleft}><Link to={"/cinimaSelect/"+cityData.cityCode}>{cityData.cityName}</Link></li>
         
    }
    else if(cityData.text=="waiting"){
       showIner=<li  className={style.normal } ><em></em>正在定位中。。。</li>
    }
    else if(cityData.text=="fail"){
        showIner=<li className={style.normal }  onClick={recheck}><span className={style.fail}>定位失败，点击重试</span></li>
    }
    
    
    return (<div  className={style.sline}>
                <h5>定位城市</h5>       
                <ul className={baseStyle.clear}>
                    {showIner}
                </ul>
    
            </div>)
   }
    
}

export default CityType;