import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmScheduleItem from '../Components/FilmScheduleItem/FilmScheduleItem'
import FilmScheduleTitle from '../Components/FilmScheduleTitle/FilmScheduleTitle'

class FilmScheduleList extends Component {
  constructor(props){
     super(props);
  }
  componentWillMount() {
    const { getFilmScheduleList } = this.props
    getFilmScheduleList("./data/filmScheduleList.json", "")
  }
  render() {
    let { filmScheduleList } = this.props
    if(filmScheduleList.length) {
        return  (
                  <div>
                    <FilmScheduleItem data={ filmScheduleList } animationTime={300}  />
                  </div>
                )
    } else {
      return (<div></div>)
    }

  }
}



const FilmScheduleListC = connect(mapStateToProps,mapDispatchToProps)(FilmScheduleList)
export default FilmScheduleListC;
