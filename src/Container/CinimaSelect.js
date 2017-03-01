import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'
    
import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import CinimaSelectNode from '../Components/CityType/CinimaSelectNode';

class CinimaSelect extends Component {
    constructor(props){
       super(props);
      
    }
    componentWillMount(){
         const {fetchCityCinimas} = this.props;
         fetchCityCinimas('http://10.2.45.84/data/cinima2.json',"")
    }
  render() {
	  
    const {cityCinimas} = this.props
     var cinimanode
    
    if(cityCinimas.text=="waitToFetch"){   
           
            
        }
    else if(cityCinimas.text=="waiting"){}
       else if(cityCinimas.text=="fail"){
        cinimanode=<div>fail</div>
       }
      else{  cinimanode=((<CinimaSelectNode cinimas={cityCinimas}  />) )}
     // console.log(cityCinimas)
    return  (<div>
                         {cinimanode}
              </div>)
    
  }
  
}
             
      

const CinimaSelectC = connect(mapStateToProps,mapDispatchToProps)(CinimaSelect)




export default CinimaSelectC;