import React, { PureComponent } from 'react';
import { connect ,Provider} from 'react-redux'
    
import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';

import CityType from '../Components/CityType/CityType';
import LoctionType from '../Components/CityType/LoctionType';


class CityLocation extends PureComponent {
    constructor(props){
       super(props);
     }
    componentWillMount(){
         const {getCityMap,getCityLocation} = this.props;
         getCityMap('http://10.2.45.84/data/citys.json',"")
         getCityLocation('http://10.2.45.84/data/cityName.json','')
    }
    render() {
	  
    const {cityMap,loctionCtiy,getCityLocation} = this.props;
        
    var cityNodes=[];
       
    
    cityMap.forEach(function(node,index){
        cityNodes.push(<CityType title={node.title} citys={node.citys} key={"key"+index} />)
    })
    
        
    
   var locationNode=<LoctionType cityData={loctionCtiy} recheck={()=>{ getCityLocation('http://10.2.45.84/data/cityName.json',"")}}  />
   
        
       
    
        
   
    
    return (<div>
            {locationNode}
            {cityNodes}
            </div>)
    
    
    }
    
    
}


const CityLocationC = connect(mapStateToProps,mapDispatchToProps)(CityLocation);

export default CityLocationC;