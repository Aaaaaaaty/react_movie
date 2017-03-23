import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style'

class FilmSeat extends Component {
  constructor(props){
     super(props)
     this.state = {
     }
  }
  render(){
    let { location } = this.props
    let movieMsg = location.state
    let movieType = (() => {
      if(movieMsg.dimensional === 0)return (<span>2D</span>)
      if(movieMsg.dimensional === 1)return (<span>3D</span>)
      if(movieMsg.dimensional === 2)return (<span>4D</span>)
    })()
    let data = new Date(movieMsg.time)
    let week = data.getDay() + 1
    let month = data.getMonth() + 1
    let dayCn = ''
    switch (week) {
      case 1:
        dayCn = '周一'
        break
      case 2:
        dayCn = '周二'
        break
      case 3:
        dayCn = '周三'
        break
      case 4:
        dayCn = '周四'
        break
      case 5:
        dayCn = '周五'
        break
      case 6:
        dayCn = '周六'
        break
      case 7:
        dayCn = '周日'
        break
      default:
       return false
    }
    if( week < 10 ) week = '0' + week
    if( month < 10 ) month = '0' + month
    return (
      <div className={ styles.movieMsgWrapper }>
        <div className={ styles.movieMsgFlex}>
          <div className={ styles.movieTitleFlex }>
            <p className={ styles.movieTitle}>北京完美影城（望京店）</p>
            <p className={ styles.movieDate }> <span>{ dayCn }{month}月{week}日</span>
                <span>{ movieMsg.startTime }</span>
                <span>{movieMsg.language}{movieType}</span></p>
          </div>
          <div className={ styles.movieMsgBtn}>换一场</div>
        </div>
        <div className={ styles.seatWrapperAll}>
          <div className={ styles.seatWrapper }>
            <div className={ styles.seatItem }><img className={ styles.seatImg } src= './images/seat_white.png'></img><span className={ styles.seatWord }>可选</span></div>
            <div className={ styles.seatItem }><img className={ styles.seatImg } src= './images/seat_red.png'></img><span className={ styles.seatWord }>已售</span></div>
            <div className={ styles.seatItem }><img className={ styles.seatImg } src= './images/seat_green.png'></img><span className={ styles.seatWord }>已选</span></div>
            <div className={ styles.seatItem }><img className={ styles.seatImg } src= './images/seat_double.png'></img><span className={ styles.seatWord }>情侣座</span></div>
          </div>
        </div>
      </div>
    )
  }
}
export default FilmSeat
