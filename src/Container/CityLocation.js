import React, { PureComponent } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';

import CityType from '../Components/CityType/CityType.js';
import LoctionType from '../Components/CityType/LoctionType';
import SearchResult from '../Components/CityType/SearchResult';
import NavNode from '../Components/NavNode/NavNode';
import SearchInput from '../Components/SearcherInput/Searcher';
import Header from '../Components/PageHeader/PageCitySelectorHeader';


class CityLocation extends PureComponent {
    constructor(props){
       super(props);
     }
    componentWillMount(){
         const {getCityMap,getCityLocation} = this.props;
         getCityMap('./data/citys.json',"")
         getCityLocation('./data/cityName.json','')
    }
    render() {

        const {cityMap,loctionCtiy,getCityLocation,changeCityLocation,searching,searchingStart,searchEnd,searchingWord,searchResult} = this.props;

        var cityNodes=[];


            cityMap.citysData.forEach(function(node,index){
            var title=node.title
            var cityarr=node.citys
            cityNodes.push((<CityType title={title} locationC={changeCityLocation} citys={cityarr} key={"key"+index} />) )
        })

        //console.log(searchResult)
        if(searchResult.result.length>0){
            var searchArr=((<SearchResult citys={searchResult.result}  />) )

        }



   var locationNode=<LoctionType cityData={loctionCtiy}  recheck={()=>{ getCityLocation('http://10.2.45.84/data/cityName.json',"")}}  />


    var navNode=<NavNode navTag={cityMap.navData}   />

        var   headData={"title":"选择城市","ltitle":"关闭","lclick":"/cinimaSelect/default"};


                    if(searchResult.result.length>0&&searching){
                            return (<div>
                                     <Header   headerData={headData} />
                                    <SearchInput origindata={cityMap.originData} searching={searching} searchingWord={searchingWord} searchingStart={searchingStart} searchEnd={searchEnd} searchResult={searchResult} />

                                    {searchArr}</div>)

                    }
                    else{
                         return (<div>
                             <Header   headerData={headData} />
                            <SearchInput origindata={cityMap.originData} searching={searching} searchingWord={searchingWord} searchingStart={searchingStart} searchEnd={searchEnd} searchResult={searchResult} />
                            {locationNode}
                            {cityNodes}
                            {navNode}
                        </div>)
                    }





    }


}


const CityLocationC = connect(mapStateToProps,mapDispatchToProps)(CityLocation);

export default CityLocationC;
