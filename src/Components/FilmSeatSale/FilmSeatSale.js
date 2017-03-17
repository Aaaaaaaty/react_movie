import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style'

class FilmSeatSale extends Component {
  constructor(props){
     super(props)
     this.state = {
     }
  }
  deleteBuySeat(data) {
    let { changeSeatConf, filmBuyList, filmSeatList } = this.props
    let isSoldUrl = filmBuyList.isSoldUrl.map((item, index) => {return item})
    let index = 0
    filmSeatList.seatArr.forEach((item, i) => {
      if(item.seatId === data.seatId) {
        index = i
      }
    })
    isSoldUrl[index] = 'seat_white'
    changeSeatConf(data, isSoldUrl, 'delete')
  }
  render() {
    let { filmBuyList } = this.props
    if(filmBuyList.item.length) {
      let list = filmBuyList.item.map((item, index) => {
        return (
          <span key={'seatSalePosition' + index}
                className={ styles.seatSalePositionItem }>{item.rowId}排{item.columnId}座
                <i  onTouchTap={ this.deleteBuySeat.bind(this, item) }
                    className={ styles.seatIcon }></i>
          </span>
        )
      })
      return (
        <div className={ styles.seatSaleWrapper }>
          <div className={ styles.seatSalePosition }>{list}</div>
          <div className={ styles.seatSaleBtn }></div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }


  }
}
export default FilmSeatSale
