import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmSeat from '../Components/FilmSeat/FilmSeat'
import FilmSeatSale from '../Components/FilmSeatSale/FilmSeatSale'

class FilmChooseSeat extends Component {
  constructor(props){
     super(props);
  }
  componentWillMount() {
    const { getFilmSeatList } = this.props
    getFilmSeatList("./data/filmSeat.json", "")
  }
  addSeat(item) {
    const { addFilmBuySeat } = this.props
    addFilmBuySeat(item)
    console.log(item);
  }
  render() {
    let { filmSeatList, filmBuyList } = this.props
    console.log('filmBuyList', filmBuyList);
    return  (
              <div>
                <FilmSeat filmSeatList={ filmSeatList } animationTime={ 200 } addSeat={ this.addSeat.bind(this) }/>
                <FilmSeatSale filmBuyList= { filmBuyList }/>
              </div>
            )
  }
}

const FilmChooseSeatC = connect(mapStateToProps,mapDispatchToProps)(FilmChooseSeat)
export default FilmChooseSeatC;
