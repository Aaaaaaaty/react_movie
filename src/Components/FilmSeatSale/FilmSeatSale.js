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
    let { filmBuyList, filmSeatList } = this.props
    let price = filmSeatList.price
    let length = filmBuyList.item.length
    if(length) {
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
          <div className={ styles.seatSaleBtn }>
            <div className={ styles.seatPrice }>
              <p className={ styles.seatPriceTitle }>￥{price * length}</p>
              <p className={ styles.seatPriceSub}>￥{price}×{length}</p>
            </div>
            <div className={ styles.seatBtn }>确认选座</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={ styles.seatSaleWrapperC }>
          <div className={ styles.seatSalePositionC }>一次最多选择四个座位</div>
          <div className={ styles.seatSaleBtn }>
            <div className={ styles.seatPrice }>
              <p className={ styles.seatPriceTitle }>￥0</p>
              <p className={ styles.seatPriceSub}>￥{price}×0</p>
            </div>
            <div className={ styles.seatBtnC }>请先选座</div>
          </div>
        </div>
      )
    }


  }
}
export default FilmSeatSale
