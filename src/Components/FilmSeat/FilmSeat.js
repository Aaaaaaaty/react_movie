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
        isScaleFinish: true
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
    let { startX, startY, lastDisX, lastDisY, dis, scaleOld, isScaleFinish } = this.state
    if(isScaleFinish) {
      if(e.touches.length === 1) {
        let moveX = e.touches[0].clientX
        let moveY = e.touches[0].clientY
        let disX = moveX - startX + lastDisX
        let disY = moveY - startY + lastDisY
        this.setState({
          moveX: moveX,
          moveY: moveY,
          left: disX,
          top: disY,
        })
      } else {
        let moveDis = this.calDistance(e)
        let scaleNum = moveDis / dis
        let scaleResult = scaleNum + scaleOld - 1
        if( scaleResult > 2.5) scaleResult = 2.5
        this.setState({
          scaleNum: scaleResult
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
  render() {
    let { filmSeatList } = this.props
    let { left, top, scaleNum, animationTime } = this.state
    let seatList = filmSeatList.seatArr
    if(seatList) {
      let maxSize = this.getWrapperSize(seatList)
      let list = seatList.map((item, index) => {
        let isSold = '#ffffff'
        if(item.isSold) {
          isSold = '#fa5939'
        }
        let style = {
          position: 'absolute',
          left:`${item.xAxis * 0.6}rem`,
          top: `${item.yAxis * 0.6}rem`,
          backgroundColor: `${ isSold }`
        }
        return (
          <div  key={ 'seatId' + index }
                style={ style }
                className={ styles.seatItem }></div>
        )
      })
      let style = {
        width: `${ maxSize.maxX * 0.8 }rem`,
        height: `${ maxSize.maxY * 0.8 }rem`,
        left: `${ 3.75 + (left / 100) }rem`,
        top: `${ 1 + top / 100 }rem`,
        marginLeft: `${ -maxSize.maxX * 0.4 }rem`,
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
      return (
        <div  className={ styles.seatWrapper }
              onTouchStart={ this.onTouchStartWrapper.bind(this) }>
          <div  className={ styles.seatItemWrapper }
                style={ style }
                onTouchStart={ this.onTouchStart.bind(this) }
                onTouchMove={ this.onTouchMove.bind(this) }
                onTouchEnd={ this.onTouchEnd.bind(this) }>
            <span>{this.state.left},{this.state.top}</span>
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
