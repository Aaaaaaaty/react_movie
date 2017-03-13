import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmScheduleItem from '../Components/FilmScheduleItem/FilmScheduleItem'
import FilmScheduleImg from '../Components/FilmScheduleImg/FilmScheduleImg'

class FilmScheduleList extends Component {
  constructor(props){
     super(props);
     this.state = {
       listType: 'online',
     }
  }
  componentWillMount() {
    const { getFilmScheduleList, getFilmList } = this.props
    getFilmList("./data/filmList.json", "")
    getFilmScheduleList("./data/filmScheduleList.json", "")
  }
  requestList(name) {
    const { getFilmScheduleList } = this.props
    getFilmScheduleList("./data/filmScheduleList1.json", "")
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps.filmScheduleList);
  // }
  render() {
    let { filmScheduleList, filmList } = this.props
    let { listType } = this.state
    if(filmScheduleList.length) {
      let style = {
        position: 'fixed',
        bottom: 0
      }
        return  (
                  <div style = { style }>
                    <FilmScheduleImg data={ filmList[listType] } animationTime={300} requestList={this.requestList.bind(this)} />
                    <FilmScheduleItem data={ filmScheduleList } animationTime={300} />
                  </div>
                )
    } else {
      return (<div></div>)
    }
  }
}



const FilmScheduleListC = connect(mapStateToProps,mapDispatchToProps)(FilmScheduleList)
export default FilmScheduleListC;
