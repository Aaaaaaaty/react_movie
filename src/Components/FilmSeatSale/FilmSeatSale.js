import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style'

class FilmSeatSale extends Component {
  constructor(props){
     super(props)
     this.state = {
     }
  }
  render() {
    let seatList = [{
      "seatId":"0000002-1-1","rowId": 1,"columnId": 1,"xAxis":3,"yAxis":1,"type":0,"isDamage":false,"isSold":false
    },{
      "seatId":"0000002-1-2","rowId": 1,"columnId": 2,"xAxis":4,"yAxis":1,"type":0,"isDamage":false,"isSold":false
    },{
      "seatId":"0000002-1-3","rowId": 1,"columnId": 3,"xAxis":5,"yAxis":1,"type":0,"isDamage":false,"isSold":false
    },{
      "seatId":"0000002-1-4","rowId": 1,"columnId": 4,"xAxis":6,"yAxis":1,"type":0,"isDamage":false,"isSold":false
    }]
    let list = seatList.map((item, index) => {
      return (
        <span key={'seatSalePosition' + index}
              className={ styles.seatSalePositionItem }>{item.rowId}排{item.columnId}座<i className={ styles.seatIcon }></i></span>
      )
    })
      return (
        <div className={ styles.seatSaleWrapper }>
          <div className={ styles.seatSalePosition }>{list}</div>
          <div className={ styles.seatSaleBtn }></div>
        </div>
      )
  }
}
export default FilmSeatSale
