import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmListItem from '../Components/FilmListItem/FilmListItem'


class FilmList extends Component {
    constructor(props){
       super(props);
       this.state = {
         listType: 'online'
       }
    }

    render() {
      let mockData = {
        online:[{
          'name': '刺客信条',
          'filmShortCode': 0,
          'releaseTime': '2016-01-23',
          'director': 'someone',
          'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚迈克尔·法斯宾德,玛丽昂·歌迪亚',
          'phrase': '穿越黑科技，法鲨炫腹肌',
          'posterUrl': 'http://static.wepiao.com/movie/2016/9/7_0/201609070940573548.jpg',
          'userFilmInterestCount': 10,
          'saleStatus': 1, //售卖状态，0不可售，1可售，2预售
          'is2D': true,
          'is3D': false,
          'isImax': true,
          'isDmax': false
        },{
          'name': '从你的全世界路过',
          'filmShortCode': 0,
          'releaseTime': '2016-01-23',
          'director': 'someone',
          'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
          'phrase': '穿越黑科技，法鲨炫腹肌',
          'posterUrl': 'http://static.wepiao.com/movie/2016/9/20_0/201609201030512727.jpg',
          'userFilmInterestCount': 10,
          'saleStatus': 1, //售卖状态，0不可售，1可售，2预售
          'is2D': true,
          'is3D': true,
          'isImax': true,
          'isDmax': false
        },{
          'name': '樱桃小丸子：来自意大利的少年',
          'filmShortCode': 0,
          'releaseTime': '2016-01-23',
          'director': 'someone',
          'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
          'phrase': '穿越黑科技，法鲨炫腹肌',
          'posterUrl': 'http://static.wepiao.com/movie/2016/8/30_0/201608301238141346.jpg',
          'userFilmInterestCount': 10,
          'saleStatus': 2, //售卖状态，0不可售，1可售，2预售
          'is2D': true,
          'is3D': false,
          'isImax': true,
          'isDmax': false
        },{
          'name': '七月与安生',
          'filmShortCode': 0,
          'releaseTime': '2016-01-23',
          'director': 'someone',
          'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
          'phrase': '穿越黑科技，法鲨炫腹肌',
          'posterUrl': 'http://static.wepiao.com/movie/2016/9/5_0/201609050956396819.jpg',
          'userFilmInterestCount': 10,
          'saleStatus': 1, //售卖状态，0不可售，1可售，2预售
          'is2D': true,
          'is3D': false,
          'isImax': true,
          'isDmax': false
        }],
        coming:[
          {
            'name': '追凶者也',
            'filmShortCode': 0,
            'releaseTime': '2016-01-23',
            'director': 'someone',
            'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
            'phrase': '穿越黑科技，法鲨炫腹肌',
            'posterUrl': 'http://static.wepiao.com/movie/2016/8/24_0/201608241044045203.jpg',
            'userFilmInterestCount': 10,
            'saleStatus': 2, //售卖状态，0不可售，1可售，2预售
            'is2D': true,
            'is3D': false,
            'isImax': true,
            'isDmax': false
          },
          {
            'name': '大话西游',
            'filmShortCode': 0,
            'releaseTime': '2016-01-23',
            'director': 'someone',
            'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
            'phrase': '穿越黑科技，法鲨炫腹肌',
            'posterUrl': 'http://static.wepiao.com/movie/2016/9/2_0/201609021008045581.jpg',
            'userFilmInterestCount': 10,
            'saleStatus': 2, //售卖状态，0不可售，1可售，2预售
            'is2D': true,
            'is3D': false,
            'isImax': true,
            'isDmax': false
          }
        ]
      }
      let data = mockData
      let { listType } = this.state
      let list = data[listType].map((item, index) => {
        let filmType = []
        if(item['is2D']) filmType.push('2D')
        if(item['is3D']) filmType.push('3D')
        if(item['isImax']) filmType.push('IMAX')
        if(item['isDmax']) filmType.push('DMAX')
        return (
            <FilmListItem key={ 'filemListItem' + index}
                          name={ item.name }
                          phrase={ item.phrase }
                          starring={ item.starring }
                          saleStatus={ item.saleStatus }
                          url={ item.posterUrl }
                          filmType={ filmType } />
        )
      })
      return  (
                <div>
                { list }
                </div>
              )
    }
}



const FilmListC = connect(mapStateToProps,mapDispatchToProps)(FilmList)
export default FilmListC;
