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
        scaleOld:1,
        left: 0,
        top: 0,
        animationTime: 0,
        dis: 0,
        wrapperWidth: 5.25, //选座框外层宽度,
        wrapperSmallWidth: 1.8,
        isSoldUrl: 'seat_white',
        isSmallShow: 0
     }
  }
  onTouchStart(e) {
    e.preventDefault()
    let { left, top, scaleNum, isSmallShow } = this.state
    let { animationTime } = this.props
    let state = {}
    if(e.touches.length === 1) {
      let startX = e.touches[0].clientX
      let startY = e.touches[0].clientY
      state = {
        startX: startX,
        startY: startY,
        lastDisX: left,
        lastDisY: top,
        isSmallShow: 1
      }
    } else {
      let dis = this.calDistance(e)
        state = {
          dis: dis,
          isSmallShow: 1
        }
    }
    state.animationTimeSmall = animationTime
    this.setState(state)
  }
  onTouchMove(e) {
    e.preventDefault()
    let { startX, startY, lastDisX, lastDisY, dis, scaleNum, scaleOld } = this.state
      if(e.touches.length === 1) {
        let moveX = e.touches[0].clientX
        let moveY = e.touches[0].clientY
        let disX = moveX - startX + lastDisX
        let disY = moveY - startY + lastDisY
        if(disX > 75 * scaleNum) disX = 75 * scaleNum
        if(disX < -110 * scaleNum) disX = -110 * scaleNum
        if(disY < -55 * scaleNum) disY = -55 * scaleNum
        if(disY > 40 * scaleNum) disY = 40 * scaleNum
        // scaleNum = 2
        this.setState({
          moveX: moveX,
          moveY: moveY,
          left: disX,
          top: disY,
        })
      } else if(e.touches.length === 2) {
        let moveDis = this.calDistance(e)
        let scaleNumResult = moveDis / dis + scaleOld - 1
        if( scaleNumResult > 2) scaleNumResult = 2
        if( scaleNumResult < 1) scaleNumResult = 1
        this.setState({
          scaleNum: scaleNumResult,
        })
      }
  }
  onTouchEnd(e) {
    e.preventDefault()
    let { scaleNum, left, top } = this.state
    let { animationTime } = this.props
    if(scaleNum === 1) {
      setTimeout(() => {
        this.setState({
          animationTime: animationTime,
          left: 0,
          top: 0,
          isSmallShow: 0
        }, () => {
          setTimeout(() => {
            this.setState({
              animationTime: 0
            })
          }, animationTime)

        })
      }, animationTime)
    }
    this.setState({
      scaleOld: scaleNum,
    })

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
    let { changeSeatConf, filmBuyList } = this.props
    if(isSoldUrl[index] === 'seat_white') {
      if(filmBuyList.item.length < 4) {
        isSoldUrl[index] = 'seat_green'
        changeSeatConf(item, isSoldUrl, 'add') //增加座位，底下标签增加同时座椅颜色列表
      } else {
        alert('最多选四个座位！')
      }

    } else if(isSoldUrl[index] === 'seat_green') {
      isSoldUrl[index] = 'seat_white'
      changeSeatConf(item, isSoldUrl, 'delete') //删除座位
    }

  }
  componentWillReceiveProps(nextProp) { //初次渲染座位按照filmSeatList,之后选座按照filmBuylist
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
    let { left, top, scaleNum, animationTime, wrapperWidth, isSoldUrl, wrapperSmallWidth, scaleOld, isSmallShow, animationTimeSmall } = this.state
    // scaleNum = 2
    let seatList = filmSeatList.seatArr
    if(seatList) {
      let maxSize = this.getWrapperSize(seatList)
      let seatWidth = wrapperWidth / maxSize.maxX
      let seatWrapperHeight = seatWidth * maxSize.maxY
      let list = seatList.map((item, index) => {
        let style = {
          position: 'absolute',
          left: `${seatWidth * (item.xAxis - 1) + seatWidth / 2 - 0.01}rem`,
          top: `${seatWidth * (item.yAxis - 1)}rem`,
          width: `${seatWidth}rem`,
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
        height: `${ seatWrapperHeight + 1}rem`,
        left: `${ 3.75 + (left / 100) }rem`,
        top: `${ top / 100 }rem`,
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
      let splitLineLeft = Math.floor(wrapperWidth / seatWidth / 2)
      let styleSplitLine = {
        width: '0.01rem',
        height: `${seatWrapperHeight}rem`,
        borderLeft: '0.01rem dashed #d1d6db',
        position: 'absolute',
        left: `${splitLineLeft * seatWidth + seatWidth / 2 - 0.01}rem`
      }
      let styleListWrapper = {
        width: `${wrapperWidth}rem`,
        height: `${ seatWrapperHeight}rem`,
        position: 'absolute',
        top: '1rem'
      }
      //小窗部分
      let seatSmallWidth = wrapperSmallWidth / maxSize.maxX
      let wrapperSmallHeight = seatSmallWidth * maxSize.maxY
      let listSmall = seatList.map((item, index) => {
        let style = {
          position: 'absolute',
          left: `${(seatSmallWidth) * (item.xAxis - 1)}rem`,
          top: `${(seatSmallWidth) * (item.yAxis - 1)}rem`,
          width: `${seatSmallWidth - 0.04}rem`,
          zIndex: 1,
        }
        return (
          <img  key={ 'seatSmallId' + index }
                style={ style }
                src={ `.\/images\/${isSoldUrl[index]}_small.png` }
                className={ styles.seatItem }></img>
        )
      })
      let styleSeatSmallWrapperList = {
        position: 'absolute',
        width: `${wrapperSmallWidth}rem`,
        height: `${wrapperSmallHeight}rem`,
        top: '0.2rem',
        left: '50%',
        marginLeft: `${-wrapperSmallWidth / 2}rem`,
        zIndex:1000
      }
      let styleSeatSmallWrapperBorder = {
        position: 'absolute',
        width: `${(wrapperSmallWidth + 0.1)}rem`,
        height: `${(wrapperSmallHeight + 0.1)}rem`,
        top: `${0.1 - top / 100 / scaleNum / 2 }rem`,
        left: `${1.25 - left / 100 / scaleNum / 2}rem`, //1.25为外层小窗宽度一半, 3为选座和小图宽度比
        marginLeft: `${-(wrapperSmallWidth) / 2 - 0.1}rem`,
        zIndex:1000,
        transform: `scale(${1 / scaleNum})`,
        MsTransform:`scale(${1 / scaleNum})`, 	/* IE 9 */
        MozTransform:`scale(${1 / scaleNum})`, 	/* Firefox */
        WebkitTransform:`scale(${1 / scaleNum})`, /* Safari 和 Chrome */
        OTransform:`scale(${1 / scaleNum})`,
      }
      let styleSeatSmallShow = {
        opacity: isSmallShow,
        WebkitTransition:`all ${animationTimeSmall}ms linear`,
        MozTransition:`all ${animationTimeSmall}ms linear`,
        OTransition:`all ${animationTimeSmall}ms linear`,
        MsTransition:`all ${animationTimeSmall}ms linear`,
        transition:`all ${animationTimeSmall}ms linear`,
      }
      return (
        <div>
          <div style={ styleSeatSmallShow } className={ styles.seatSmallShow}>
            <div className={ styles.seatSmallShowBg }></div>
            <div style={ styleSeatSmallWrapperList }>
              {listSmall}
            </div>
            <div style={ styleSeatSmallWrapperBorder } className={ styles.seatSmallBorder }></div>
          </div>
          <div  className={ styles.seatWrapper }
                onTouchStart={ this.onTouchStartWrapper.bind(this) }>
            <ul className={ styles.numIndexWrapper } style={ styleNumIndexWrapper }>{ listNum }</ul>
            <div  className={ styles.seatItemWrapper }
                  style={ style }
                  onTouchStart={ this.onTouchStart.bind(this) }
                  onTouchMove={ this.onTouchMove.bind(this) }
                  onTouchEnd={ this.onTouchEnd.bind(this) }>
              <div className={ styles.roomWrapper }>
                <p className={ styles.roomName }>{filmSeatList.roomName}</p>
                <p className={ styles.roomCenter }>银幕中央</p>
              </div>
              <div style={ styleListWrapper}>
                <span style={ styleSplitLine }></span>
                { list }
              </div>
            </div>
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
