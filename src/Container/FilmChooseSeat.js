import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmSeat from '../Components/FilmSeat/FilmSeat'

class FilmChooseSeat extends Component {
  constructor(props){
     super(props);
  }
  componentWillMount() {
    const { getFilmSeatList } = this.props
    getFilmSeatList("./data/filmSeat.json", "")
  }
  render() {
    let { filmSeatList } = this.props
    return  (
              <div>
                <FilmSeat filmSeatList={ filmSeatList } animationTime={ 200 }></FilmSeat>
              </div>
            )
  }
}

const FilmChooseSeatC = connect(mapStateToProps,mapDispatchToProps)(FilmChooseSeat)
export default FilmChooseSeatC;
