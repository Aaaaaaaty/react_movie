import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style'

class FilmSeat extends Component {
  constructor(props){
     super(props)
     this.state = {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        scaleNum: 1,
        left: 0,
        top: 0,
        animationTime: 0,
        dis: 0,
        isScaleFinish: true,
        isTwo: false,
        wrapperWidth: 5.25, //选座框外层宽度,
        isSoldUrl: 'seat_white'
     }
  }
  onTouchStart(e) {
    e.preventDefault()
    let { left, top, scaleNum } = this.state
    if(e.touches.length === 1) {
      let startX = e.touches[0].clientX
      let startY = e.touches[0].clientY
      this.setState({
        startX: startX,
        startY: startY,
        lastDisX: left,
        lastDisY: top
      })
    } else {
      let dis = this.calDistance(e)
      this.setState({
        dis: dis,
        scaleOld: scaleNum
      })
    }
  }
  onTouchMove(e) {
    e.preventDefault()
    let { startX, startY, lastDisX, lastDisY, dis, scaleOld, isScaleFinish, isTwo } = this.state
    if(isScaleFinish) {
      if(e.touches.length === 1) {
        let moveX = e.touches[0].clientX
        let moveY = e.touches[0].clientY
        let disX = moveX - startX + lastDisX
        let disY = moveY - startY + lastDisY
        if(isTwo) {
          this.setState({
            isTwo: false
          })
        } else {
          this.setState({
            moveX: moveX,
            moveY: moveY,
            left: disX,
            top: disY,
          })
        }
      } else if(e.touches.length === 2) {
        let moveDis = this.calDistance(e)
        let scaleNum = moveDis / dis
        let scaleResult = scaleNum + scaleOld - 1
        if( scaleResult > 2.5) scaleResult = 2.5
        this.setState({
          scaleNum: scaleResult,
          isTwo: true
        })
      }
    }
  }
  onTouchEnd(e) {
    e.preventDefault()
    let { scaleNum, left, top } = this.state
    let { animationTime } = this.props
    if(scaleNum < 1) {
      scaleNum = 1
      this.setState({
        animationTime: animationTime,
        left: 0,
        top: 0,
        scaleNum: scaleNum,
        isScaleFinishL: false
      }, () => {
        setTimeout(() => {
          this.setState({
            animationTime: 0,
            isScaleFinish: true
          })
        }, animationTime)
      })
    }
  }
  calDistance(e) {
    let touch0 = e.touches[0]
    let touch1 = e.touches[1]
    let touch0X = touch0.clientX
    let touch0Y = touch0.clientY
    let touch1X = touch1.clientX
    let touch1Y = touch1.clientY
    return Math.sqrt(Math.pow(touch1X - touch0X, 2) + Math.pow(touch1Y - touch0Y, 2))
  }
  getWrapperSize(seatList) {
    let maxX = 0
    let maxY = 0
    seatList.forEach((item, index) => {
      if(item.xAxis > maxX) {
        maxX = item.xAxis
      }
      if(item.yAxis > maxY) {
        maxY = item.yAxis
      }
    })
    return {
      maxX: maxX,
      maxY: maxY
    }
  }
  onTouchStartWrapper(e) {
    e.preventDefault()
  }
  getSeatColNum(seatList, maxSize, seatWidth) {
    let { left, top, scaleNum, animationTime, wrapperWidth } = this.state
    let numIndex = 0
    let numArr = []
    seatList.forEach((item, index) => {
      if(item.yAxis === numIndex + 1) {
        numArr[numIndex] = item
      } else {
        numIndex ++
      }
    })
    let result = numArr.map((item, index) => {
      let scaleHeight = (seatWidth * maxSize.maxY) * (scaleNum - 1)
      let top = ((seatWidth) * (item.yAxis - 1))
      let style = {
        top: `${top * scaleNum}rem`,
      }
      return(
        <li key={'numindex' + index}
            className={ styles.numIndex }
            style={ style }
            >
            {index + 1}
        </li>
      )
    })
    return result
  }
  changeSeat(isSoldUrl, index, item) {
    let { changeSeatConf } = this.props
    if(isSoldUrl[index] === 'seat_white') {
      isSoldUrl[index] = 'seat_green'
      changeSeatConf(item, isSoldUrl, 'add') //增加座位，底下标签增加同时座椅颜色列表
    } else if(isSoldUrl[index] === 'seat_green') {
      isSoldUrl[index] = 'seat_white'
      changeSeatConf(item, isSoldUrl, 'delete') //删除座位
    }

  }
  componentWillReceiveProps(nextProp) {
    let { filmSeatList, filmBuyList } = nextProp
    let seatList = filmSeatList.seatArr
      let isSoldUrl = []
    if(seatList) {
      seatList.forEach((item, index) => {
        if(item.isSold) {
          isSoldUrl[index] = 'seat_red'
        } else {
          isSoldUrl[index] = 'seat_white'
        }
      })
      this.setState({
        isSoldUrl: isSoldUrl
      }, () => {
        if(filmBuyList.isSoldUrl.length) {
          this.setState({
            isSoldUrl: filmBuyList.isSoldUrl
          })
        }
      })
    }
  }
  render() {
    let { filmSeatList } = this.props
    let { left, top, scaleNum, animationTime, wrapperWidth, isSoldUrl } = this.state
    let seatList = filmSeatList.seatArr
    if(seatList) {
      let maxSize = this.getWrapperSize(seatList)
      let seatWidth = wrapperWidth / maxSize.maxX
      let seatWrapperHeight = seatWidth * maxSize.maxY
      let list = seatList.map((item, index) => {
        let style = {
          position: 'absolute',
          left: `${seatWidth * (item.xAxis - 1)}rem`,
          top: `${seatWidth * (item.yAxis - 1)}rem`,
          width: `${wrapperWidth / maxSize.maxX}rem`,
        }
        return (
          <img  key={ 'seatId' + index }
                style={ style }
                src={ `.\/images\/${isSoldUrl[index]}.png` }
                onTouchTap={ this.changeSeat.bind(this, isSoldUrl, index, item) }
                className={ styles.seatItem }></img>
        )
      })
      let listNum = this.getSeatColNum(seatList, maxSize, seatWidth)
      let style = {
        width: `${wrapperWidth}rem`,
        height: `${ seatWrapperHeight }rem`,
        left: `${ 3.75 + (left / 100) }rem`,
        top: `${ 1 + top / 100 }rem`,
        marginLeft: `${ -wrapperWidth / 2 }rem`,
        transform: `scale(${scaleNum})`,
        MsTransform:`scale(${scaleNum})`, 	/* IE 9 */
        MozTransform:`scale(${scaleNum})`, 	/* Firefox */
        WebkitTransform:`scale(${scaleNum})`, /* Safari 和 Chrome */
        OTransform:`scale(${scaleNum})`,
        WebkitTransition:`all ${animationTime}ms linear`,
        MozTransition:`all ${animationTime}ms linear`,
        OTransition:`all ${animationTime}ms linear`,
        MsTransition:`all ${animationTime}ms linear`,
        transition:`all ${animationTime}ms linear`,
      }
      let styleNumIndexWrapper = {
        top: `${ (1 + top / 100 - seatWidth* maxSize.maxY *(scaleNum - 1)/2) }rem`, //算出缩放后和最初的变化值，除以二，给-top,里面小的li标签直接top*scale
        height: `${ seatWrapperHeight * scaleNum }rem`,
        zIndex: 100
      }
      return (
        <div  className={ styles.seatWrapper }
              onTouchStart={ this.onTouchStartWrapper.bind(this) }>
          <ul className={ styles.numIndexWrapper } style={ styleNumIndexWrapper }>{ listNum }</ul>
          <div  className={ styles.seatItemWrapper }
                style={ style }
                onTouchStart={ this.onTouchStart.bind(this) }
                onTouchMove={ this.onTouchMove.bind(this) }
                onTouchEnd={ this.onTouchEnd.bind(this) }>
            { list }
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }

  }
}
export default FilmSeat
