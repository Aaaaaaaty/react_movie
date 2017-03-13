import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style'

class FilmSchedule extends Component {
  constructor(props){
     super(props)
     this.state = {
       diffX: 0,
       x: 0,
       chooseItemTitle: '',
       chooseItemSub: ''
     }
  }
  componentWillMount() {
    let { data, animationTime } = this.props
    data.forEach((item, index) =>{
      item['left'] = index * 2.5
    })
    this.setState({
      data: data,
      animationTime: animationTime
    })
  }
  componentDidMount() {
    let { data } = this.state
    let chooseInit = data.filter((item, index) => {
      return item.left === 2.5
    })
    this.setState({
      chooseItemTitle: chooseInit[0].name,
      chooseItemSub: chooseInit[0].starring
    })
  }
  onTouchStart(e) {
    //  e.preventDefault()
     let startX = e.touches[0].clientX
     this.setState({
       startX: startX,
     })
  }
  onTouchMove(maxLengthX, e) {
    //  e.preventDefault()
     let moveX = e.touches[0].clientX
     let { startX, x, data } = this.state
     let diffX = (startX - moveX) / 375 * 7.5
     let left = 0
     data.forEach((item, index) => {
       item.left = item.left - diffX % 10
       if(item.left > maxLengthX) {
         item.left = item.left - data.length * 2.5
       } else if(item.left < -2.5) {
         item.left = item.left + data.length * 2.5
       }
     })
     this.setState({
       animationTime: 0,
       data: data,
       startX: moveX
     })
  }
  onTouchEnd(e) {
    //  e.preventDefault()
    let { startX, data, diffX, chooseItemSub, chooseItemTitle } = this.state
    let { animationTime, requestList } = this.props
    data.forEach((item, index) => {
      item.left = 0 ? 0 : Math.round(item.left / 2.5) * 2.5
      if(item.left === 2.5) {
        chooseItemTitle = item.name
        chooseItemSub = item.starring
        requestList(item.name)
      }
    })
    this.setState({
      animationTime: animationTime,
      data: data,
      chooseItemSub: chooseItemSub,
      chooseItemTitle: chooseItemTitle
    })
  }
  render() {
    let { data, animationTime, diffX, chooseItemTitle, chooseItemSub } = this.state
    let length = data.length
    let maxLengthX = (length - 1) * 2.5
    let list = data.map((item, index) => {
      let style = {
        backgroundImage: `url(${item.posterUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '2.32rem',
        height: '3.22rem',
        margin: '0rem 0.09rem'
      }
      let scale = 1 - Math.abs(item.left - 2.5) / 20
      let styleItem = {
        left: `${item.left}rem`,
        transform: `scale(${scale})`,
        MsTransform:`scale(${scale})`, 	/* IE 9 */
        MozTransform:`scale(${scale})`, 	/* Firefox */
        WebkitTransform:`scale(${scale})`, /* Safari 和 Chrome */
        OTransform:`scale(${scale})`,
        WebkitTransition:`all ${animationTime}ms linear`,
        MozTransition:`all ${animationTime}ms linear`,
        OTransition:`all ${animationTime}ms linear`,
        MsTransition:`all ${animationTime}ms linear`,
        transition:`all ${animationTime}ms linear`,
      }
      return(
        <div  key={'filmelistImg' + index}
              className={ styles.slideItem }
              style={ styleItem }>
          <div style={ style }></div>
        </div>
      )
    })
    return (
      <div className={ styles.slideWrapper }>
        <div  className={ styles.slideContent }
              onTouchStart={ this.onTouchStart.bind(this)}
              onTouchMove={ this.onTouchMove.bind(this,maxLengthX)}
              onTouchEnd={ this.onTouchEnd.bind(this)}>
          { list }
        </div>
        <div className={ styles.slideText }>
          <p className={ styles.slideTitle }>{ chooseItemTitle }</p>
          <p className={ styles.slideSub }>{ chooseItemSub }</p>
        </div>
      </div>
    )
  }
}
export default FilmSchedule
