import React, { PureComponent } from 'react';
class CityType extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {cityData,recheck} = this.props
   
    var showIner=<div >正在定位中</div>
   
    if(cityData.cityName){
        showIner=<div>{cityData.cityName}</div>
    }
    else if(cityData.text=="waiting"){
        showIner=<div>正在定位中。。。</div>
    }
    else if(cityData.text=="fail"){
        showIner=<div onClick={recheck}>定位失败，点击重试</div>
    }
    
    
    return (<div>
                <h5>定位城市</h5>       
                <ul>
                    {showIner}
                </ul>
    
            </div>)
   }
    
}

export default CityType;