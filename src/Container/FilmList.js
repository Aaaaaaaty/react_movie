import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmListItem from '../Components/FilmListItem/FilmListItem'
import FilmSlideShow from '../Components/FilmSlideShow/FilmSlideShow'

class FilmList extends Component {
  constructor(props){
     super(props);
     this.state = {
       listType: 'online'
     }
  }
  componentWillMount() {
    const { getFilmList } = this.props
    getFilmList("./data/filmList.json", "")
  }
  render() {
    let { filmList } = this.props
    let { listType } = this.state
    let filmImgListSliderArr = [
      'https://img5.mtime.cn/mg/2017/04/16/072713.93270227.jpg',
      'https://img5.mtime.cn/mg/2017/04/12/084705.35310921.jpg',
      'https://img5.mtime.cn/mg/2017/04/14/085243.95232267.jpg'
    ]
    let sliderImgWidth = 7.5      //单位是rem
    let sliderImgHeight = 3.22
    let animationTime = 200       //动画事件，单位是ms
    if(filmList[listType]) {
      let list = filmList[listType].map((item, index) => {
        let filmType = []
        if(item['is2D']) filmType.push('2D')
        if(item['is3D']) filmType.push('3D')
        if(item['isImax']) filmType.push('IMAX')
        if(item['isDmax']) filmType.push('DMAX')
        return (
            <FilmListItem key={ 'filemListItem' + index}
                          phrase={ item.phrase }
                          starring={ item.starring }
                          saleStatus={ item.saleStatus }
                          url={ item.posterUrl }
                          filmType={ filmType }
                          crews={ item.crews}
                          posterUrl={ item.posterUrl }
                          videoStills={ item.videoStills }
                          name={ item.name }
                          keyword={ item.keyword }
                          duration={ item.duration }
                          language={ item.language }
                          releaseTime={ item.releaseTime}
                          summary={ item.summary } />
        )
      })
      // let style = {
      //   marginLeft: '0.2rem'
      // }
      return  (
                <div>
                 <FilmSlideShow filmImgListSliderArr = { filmImgListSliderArr } sliderImgWidth = { sliderImgWidth } sliderImgHeight = { sliderImgHeight } animationTime = { sliderImgHeight }/>
                { list }
                </div>
              )
    } else {
      return (<div></div>)
    }


  }
}



const FilmListC = connect(mapStateToProps,mapDispatchToProps)(FilmList)
export default FilmListC;
