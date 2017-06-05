import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmDetailImgList from '../Components/FilmDetailImgList/FilmDetailImgList'
import FilmDetailMsg from '../Components/FilmDetailMsg/FilmDetailMsg'

class FilmDetail extends Component {
  constructor(props){
     super(props);
     this.state = {
       showSign: 'relative',
     }
  }
  componentWillMount() {
    const { getFilmList, filmDetailMsgPosition } = this.props
    getFilmList("./data/filmList.json", "")
  }

  render() {
    let { filmList, location, changeFilmDetailMsgPosition, filmDetailMsgPosition } = this.props
    let { showSign, detailImgScroll } = this.state
    let { videoStills, name, crews, keyword, language, duration, releaseTime, summary, posterUrl } = location.state
    let style = {
      position: 'absolute',
      height: '100%'
    }
    return(
      <div style={ style }>
        <FilmDetailImgList  videoStills={ videoStills }
                            showSign={ showSign }
                            detailImgScroll={ filmDetailMsgPosition }/>
        <FilmDetailMsg  name={ name }
                        keyword={ keyword }
                        duration={ duration }
                        language={ language }
                        releaseTime={ releaseTime }
                        summary={ summary }
                        posterUrl={ posterUrl }
                        crews={ crews }
                        changeFilmDetailMsgPosition={ changeFilmDetailMsgPosition }/>
      </div>
    )
  }
}



const FilmDetailC = connect(mapStateToProps,mapDispatchToProps)(FilmDetail)
export default FilmDetailC;
