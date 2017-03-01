import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmScheduleItem from '../Components/FilmScheduleItem/FilmScheduleItem'
import FilmScheduleTitle from '../Components/FilmScheduleTitle/FilmScheduleTitle'

class FilmScheduleList extends Component {
  constructor(props){
     super(props);
  }

  render() {
    let mockData = [{
        'hallName': '0号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 18:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '0号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 18:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '0号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 18:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '0号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 18:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '1号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 08:40:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': false,
        'language': '英语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '2号厅',
        'duration': 100,
        'releaseTime': '2016-01-24',
        'showStartTime': '2016-01-24 07:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': false,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '3号厅',
        'duration': 100,
        'releaseTime': '2016-01-25',
        'showStartTime': '2016-01-25 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '3号厅',
        'duration': 100,
        'releaseTime': '2016-01-26',
        'showStartTime': '2016-01-25 13:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '3号厅',
        'duration': 100,
        'releaseTime': '2016-01-26',
        'showStartTime': '2016-01-25 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '3号厅',
        'duration': 100,
        'releaseTime': '2016-01-26',
        'showStartTime': '2016-01-25 10:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      }]
    let data = mockData
    return  (
              <div>
                <FilmScheduleItem data={ data } animationTime={300}  />
              </div>
            )
  }
}



const FilmScheduleListC = connect(mapStateToProps,mapDispatchToProps)(FilmScheduleList)
export default FilmScheduleListC;
