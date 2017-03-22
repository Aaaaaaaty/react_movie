import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import styles from './style'

class FilmScheduleItem extends Component {
  constructor(props){
     super(props)
     this.state = {
       animationTime: this.props.animationTime,
       translateX: 0,
       disRem: 0,
       x: 0, //整次位移值 7.5倍数,记录end偏移量
     }
  }
  componentDidMount() {
  }
  componentWillMount() {
    let { data } = this.props
    this.setState({
      data: data,
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      translateX: 0,
      animationTime: 0
    })
  }
  onTouchStart(e) {
     e.stopPropagation()
    //  e.preventDefault()
     let startPos = {x:e.touches[0].pageX,y:e.touches[0].pageY,time:+new Date} //取第一个touch的坐标值
     let isScrolling = 0
     let startX = e.touches[0].clientX
     this.setState({
       startX: startX,
       startPos: startPos,
       isScrolling: isScrolling,
     })
  }
  onTouchMove(length, e) {
      // e.preventDefault()
      // e.stopPropagation()
      let { startPos, x, translateX, startX } = this.state
      let endPos = {x:e.touches[0].pageX - startPos.x,y:e.touches[0].pageY - startPos.y}
      let isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0 //isScrolling为1时，表示纵向滑动，0为横向滑动
      if(isScrolling === 0){
      　　e.preventDefault() //阻止触摸事件的默认行为，即阻止滚屏
      }
      let moveX = e.touches[0].clientX
      let disRem = (moveX - startX) / 375 * 7.5
      let maxLength = (length - 1) * 7.5
      let _state = {}
      if( -translateX > maxLength || -translateX < 0 ) {
       _state = {
         translateX: x + disRem * (1 / Math.abs(moveX - startX)),
         animationTime: 0
       }
      } else {
       _state = {
         translateX: disRem + x,
         animationTime: 0
       }
      }
      this.setState(_state)
  }
  onTouchEnd(length, e) {
     e.stopPropagation()
    //  e.preventDefault()
     let { animationTime } = this.props
     let { x, translateX, startX } = this.state
     let endX = e.changedTouches[0].clientX
     let maxLength = ( length - 1 ) * 7.5
     let _state = {}
     this.setState({
       endX: endX
     }, () => {
       if(((startX - endX) / 100) > (7.5 / 5)){
         if( -translateX < maxLength ) {
           let disX = x - 7.5
           _state = {
             translateX: disX,
             animationTime: animationTime,
             x: disX
           }
         } else {
           _state = {
             translateX: -maxLength,
             animationTime: animationTime
           }
         }
       } else if(((startX - endX) / 100) < -(7.5 / 5)){
         if( -translateX > 0 ) {
           let disX = x + 7.5
           _state = {
             translateX: disX,
             animationTime: animationTime,
             x: disX
           }
         } else {
           _state = {
             translateX: 0,
             animationTime: animationTime
           }
         }
       } else {
         let disX = x
         _state = {
           translateX: disX,
           animationTime: animationTime,
           x: disX
         }
       }
       this.setState(_state)
     })
  }
  slideChange(index) {
    let { translateX } = this.state
    switch (index) {
      case 0:
        translateX = 0
        break
      case 1:
        translateX = -7.5
        break;
      case 2:
        translateX = -15
        break;
      case 3:
        translateX = -22.5
        break;
    }
    this.setState({
      translateX: translateX,
      x: translateX,
      animationTime: 0
    })
  }
  render() {
    let { data } = this.state
    let releaseTime = data[0].releaseTime
    let _data_arr = []
    let _index = 0
    let _data = data.forEach((item, index)  => {
      _data_arr[index] = []
      if(item.releaseTime !== releaseTime) {
        releaseTime = item.releaseTime
        ++_index
      }
      _data_arr[_index].push(item)
    })
    let result_data = _data_arr.filter((item, index) => { //按天过滤出一个二维数组
      return item.length !== 0
    })
    let listLength = result_data.length
    let list = result_data.map((item, index) => {
      let itemList = item.map((item, index) => {
        let time = new Date(item.showStartTime.split(' ')[0] + 'T' + item.showStartTime.split(' ')[1])
        let duration = item.duration * 60000
        let startTime = time.toLocaleString("en-US", {hour12: false}).split(' ')[1]
        let endTime = new Date(time.getTime() +　duration).toLocaleString("en-US", {hour12: false}).split(' ')[1]
        let btn = (() =>{
          if (item.canBuy){
            return (
              <Link to={{ pathname: '/filmChooseSeat',
                          state: {  language: item.language,
                                    dimensional: item.dimensional,
                                    time: item.releaseTime,
                                    startTime: startTime} }}
                    className={ styles.buyBtn }>购票</Link>
            )
          } else {
            return (
              <span className={ styles.nobuyBtn }>停售</span>
            )
          }
        })()
        let movieType = (() => {
          if(item.dimensional === 0)return (<span>2D</span>)
          if(item.dimensional === 1)return (<span>3D</span>)
          if(item.dimensional === 2)return (<span>4D</span>)
        })()
         return (
          <div  key={'itemList' + index}
                className ={ styles.wrapper } >
            <div className={ styles.time }>
              <p>{ startTime }</p>
              <p className={ styles.endTime }>{ endTime }散场</p>
            </div>
            <div className={ styles.base }>
              <p>{ item.language }{ movieType }</p>
              <p className={ styles.subHall }>{ item.hallName }</p>
            </div>
            <div className={ styles.base }>
              <p>￥{ item.salePrice }</p>
              <p className={ styles.subPrice }>影城价格￥{ item.standardPrice }</p>
            </div>
            <div className={ styles.base }>
              {btn}
            </div>
          </div>
        )
      })
      return (
        <div  key={'FilmScheduleItem' + index}
              className={ styles.scheduleItem }
              >
          {itemList}
        </div>
      )
    })
    let titleList = result_data.map((item, index) => {
      let { animationTime, translateX } = this.state
      let slideTranslateX = -(translateX / 7.5 + 1) / 4 * 7.5 + 2.125
      let data = new Date(item[0].releaseTime)
      let week = data.getDay() + 1
      let month = data.getMonth() + 1
      let dayCn = ''
      let color = '#000000'
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
      if( index === 0 ) if(slideTranslateX === 0.25) color = '#fe4b37'
      if( index === 1 ) if(slideTranslateX === 2.125) color = '#fe4b37'
      if( index === 2 ) if(slideTranslateX === 4) color = '#fe4b37'
      if( index === 3 ) if(slideTranslateX === 5.875) color = '#fe4b37'
      let style = {
        color: `${color}`,
        WebkitTransition:`color ${animationTime}ms linear`,
        MozTransition:`color ${animationTime}ms linear`,
        OTransition:`color ${animationTime}ms linear`,
        MsTransition:`color ${animationTime}ms linear`,
        transition:`color ${animationTime}ms linear`
      }
      return (
          <div  key={'title' + index}
                style={ style }
                className={ styles.title }
                onClick={ this.slideChange.bind(this, index)}>
                { dayCn }{month }-{ week }
          </div>
      )
    })
    let { translateX, animationTime } = this.state
    let style = {
      width:'400%',
      position: 'absolute',
      transform:`translateX(${translateX}rem)`,
      MsTransform:`translateX(${translateX}rem)`, 	/* IE 9 */
      MozTransform:`translateX(${translateX}rem)`, 	/* Firefox */
      WebkitTransform:`translateX(${translateX}rem)`, /* Safari 和 Chrome */
      OTransform:`translateX(${translateX}rem)`,
      WebkitTransition:`transform ${animationTime}ms linear`,
      MozTransition:`transform ${animationTime}ms linear`,
      OTransition:`transform ${animationTime}ms linear`,
      MsTransition:`transform ${animationTime}ms linear`,
      transition:`transform ${animationTime}ms linear`,
    }
    let slideTranslateX = -(translateX / 7.5 + 1) / 4 * 7.5 + 2.125
    let slideStyle = {
      display: 'block',
      height: '0.02rem',
      width: '1.375rem',
      backgroundColor: '#fe4b37',
      transform:`translateX(${slideTranslateX}rem)`,
      MsTransform:`translateX(${slideTranslateX}rem)`, 	/* IE 9 */
      MozTransform:`translateX(${slideTranslateX}rem)`, 	/* Firefox */
      WebkitTransform:`translateX(${slideTranslateX}rem)`, /* Safari 和 Chrome */
      OTransform:`translateX(${slideTranslateX}rem)`,
      WebkitTransition:`transform ${animationTime}ms linear`,
      MozTransition:`transform ${animationTime}ms linear`,
      OTransition:`transform ${animationTime}ms linear`,
      MsTransition:`transform ${animationTime}ms linear`,
      transition:`transform ${animationTime}ms linear`,
    }
    return (
      <div className={ styles.buyTicket }>
        <div className={ styles.titleWrapper }>
          {titleList}
        </div>
        <span style={ slideStyle }></span>
        <div className={ styles.schedule }>
          <div  style= { style }
                onTouchStart={ this.onTouchStart.bind(this)}
                onTouchMove={ this.onTouchMove.bind(this, listLength)}
                onTouchEnd={ this.onTouchEnd.bind(this, listLength)}>
                { list }
          </div>
        </div>
      </div>
    )
  }
}
export default FilmScheduleItem
