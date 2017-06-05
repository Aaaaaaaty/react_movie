import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import CinimaSelectNode from '../Components/CityType/CinimaSelectNode';
import Header from '../Components/PageHeader/PageCitySelectorHeader';
import $ from "jquery"
require("jquery-cookie")
class CinimaSelect extends Component {
    constructor(props){
       super(props);

    }
    componentWillMount(){
         const {fetchCityCinimas} = this.props;

         var code
         if(this.props.params.cityId=="default"){
            code=$.cookie("cityCode")

         }
        else {
            code=this.props.params.cityId
             $.cookie("cityCode",code)

        }
         //console.log(code)
         fetchCityCinimas('./data/cinima.json',"")
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
         var   city="选择城市"

        if(cityCinimas[0]){
                         city=  cityCinimas[0].cityName
                         }

    var   headData={"title":"选择城市","ltitle":city,"lclick":"/cityLocation"};//,"rtitle":"关闭","rclick":"/cinimaSelect/default"

    return  (<div>
                        <Header   headerData={headData} />
                         {cinimanode}
              </div>)

  }

}



const CinimaSelectC = connect(mapStateToProps,mapDispatchToProps)(CinimaSelect)




export default CinimaSelectC;
