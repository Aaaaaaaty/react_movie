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
        'hallName': '1号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '1号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '英语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '1号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      },{
        'hallName': '1号厅',
        'duration': 100,
        'releaseTime': '2016-01-23',
        'showStartTime': '2016-01-23 15:30:00',
        'standardPrice': 60,
        'salePrice': 26,
        'canBuy': true,
        'language': '国语',
        'dimensional': 0//影片维度：0-2D；1-3D；2-4D
      }]
    let data = mockData
    let list = data.map((item, index) => {
      return (
          <FilmScheduleItem key={ 'FilmScheduleItem' + index }
                            />
      )
    })
    return  (
              <div>
                <FilmScheduleTitle />
                { list }
              </div>
            )
  }
}



const FilmScheduleListC = connect(mapStateToProps,mapDispatchToProps)(FilmScheduleList)
export default FilmScheduleListC;
