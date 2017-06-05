import React, { Component } from 'react';
import classNames from 'classnames/bind'
import styles from './style'

class FilmDetailImgList extends Component {
  constructor(props){
     super(props);
     this.state = {
       showSign: 'relative'
     }
  }
  onTouchStartImgList(e) {
    // let startY = e.touches[0].clientY
    // this.setState({
    //   startY: startY
    // })
  }
  onTouchMoveImgList(e) {
    // e.stopPropagation()
    // let { startY } = this.state
    // let moveY = e.touches[0].clientY - startY
    // if(moveY > 0) {
    //   this.setState({
    //     showSign: 'fixed'
    //   })
    // }
    // else {
      this.setState({
        showSign: 'relative'
      })
    // }
  }
  onTouchEndImgList(e) {
  }
  render() {
    let { videoStills, detailImgScroll } = this.props
    let { showSign } = this.state
    let imgLIst = videoStills.map((item, index) => {
      let style = {}
      let styleIn = {}
      if(index === 0 ) {
        style = {
          width: '7.5rem',
          height: '4.16rem',
          background: `url(${item.thumbnailUrl})`,
          backgroundSize: 'cover',
        }
      }
      else if(index === 1 && showSign === 'relative') {
        style = {
          width: '3.75rem',
          height: '3.75rem',
          backgroundColor: 'black'
        }
        styleIn = {
          width: '3.71rem',
          height: '3.71rem',
          background: `url(${item.thumbnailUrl})`,
          backgroundSize: 'cover'
        }
      }else if(showSign === 'relative') {
        style = {
          width: '1.875rem',
          height: '1.875rem',
          backgroundColor: 'black'
        }
        styleIn = {
          width: '1.835rem',
          height: '1.835rem',
          background: `url(${item.thumbnailUrl})`,
          backgroundSize: 'cover'
        }
      }
      return(
        <div  key={ 'FilmDetailImgList' + index }
              style={ style }
              className={ styles.imgListWrapper }><div style={ styleIn }></div></div>
      )
    })
    let styleWrapper = {
      position: `${ showSign }`,
      height: detailImgScroll
    }
    return (
      <div  className={ styles.wrapper }
            style={ styleWrapper }
            onTouchStart={ this.onTouchStartImgList.bind(this)}
            onTouchMove={ this.onTouchMoveImgList.bind(this)}
            onTouchEnd={ this.onTouchEndImgList.bind(this)}>{ imgLIst }</div>
    )
  }
}
export default FilmDetailImgList;
