import React, { Component } from 'react'
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store'
import FilmSeat from '../Components/FilmSeat/FilmSeat'
import FilmSeatSale from '../Components/FilmSeatSale/FilmSeatSale'
import FilmSeatTitle from '../Components/FilmSeatTitle/FilmSeatTitle'

class FilmChooseSeat extends Component {
  constructor(props){
     super(props)
  }
  componentWillMount() {
    const { getFilmSeatList } = this.props
    getFilmSeatList("./data/filmSeat.json", "")
  }
  changeSeatConf(item, isSoldUrl, type) {
    const { changeFilmBuySeatList } = this.props
    let data = {
      item: item, //座位信息
      isSoldUrl: isSoldUrl, //所有座位颜色列表
      type: type
    }
    changeFilmBuySeatList(data)
  }
  render() {
    let { filmSeatList, filmBuyList, location } = this.props
    let style = {
      height: '1.8rem'
    }
    return  (
              <div>
                <FilmSeatTitle location={ location }/>
                <FilmSeat filmSeatList={ filmSeatList }
                          filmBuyList={ filmBuyList }
                          animationTime={ 200 }
                          changeSeatConf={ this.changeSeatConf.bind(this) }/>
                <FilmSeatSale filmBuyList= { filmBuyList }
                              filmSeatList={ filmSeatList }
                              changeSeatConf={ this.changeSeatConf.bind(this) }/>
              </div>
            )
  }
}

const FilmChooseSeatC = connect(mapStateToProps,mapDispatchToProps)(FilmChooseSeat)
export default FilmChooseSeatC
