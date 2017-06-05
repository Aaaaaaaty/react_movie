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
    let { filmScheduleList, filmList, location } = this.props
    let { listType } = this.state
    let filmListResult = filmList[listType]
    let filmName = location.state.name
    filmListResult.forEach((item, index) => {
      if(item.name === filmName) {
        let firstItem = filmListResult.splice(index, 1)[0]
        console.log('firstItem', filmListResult)
        filmListResult.splice(1, 0, firstItem)
      }
    })
    if(filmScheduleList.length) {
      let style = {
        position: 'fixed',
        bottom: 0
      }
        return  (
                  <div style = { style }>
                    <FilmScheduleImg data={ filmListResult } animationTime={300} requestList={this.requestList.bind(this)} />
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
