import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';
import FilmListItem from '../Components/FilmListItem/FilmListItem'

class FilmList extends Component {
  constructor(props){
     super(props);
     this.state = {
       listType: 'online'
     }
  }
  componentWillMount() {
    const { getFilmList } = this.props
    getFilmList("./data/filmList.json", "")
  }
  render() {
    let { filmList } = this.props
    let { listType } = this.state
    if(filmList[listType]) {
      let list = filmList[listType].map((item, index) => {
        let filmType = []
        if(item['is2D']) filmType.push('2D')
        if(item['is3D']) filmType.push('3D')
        if(item['isImax']) filmType.push('IMAX')
        if(item['isDmax']) filmType.push('DMAX')
        return (
            <FilmListItem key={ 'filemListItem' + index}
                          name={ item.name }
                          phrase={ item.phrase }
                          starring={ item.starring }
                          saleStatus={ item.saleStatus }
                          url={ item.posterUrl }
                          filmType={ filmType } />
        )
      })
      let style = {
        marginLeft: '0.2rem'
      }
      return  (
                <div style={ style }>
                { list }
                </div>
              )
    } else {
      return (<div></div>)
    }


  }
}



const FilmListC = connect(mapStateToProps,mapDispatchToProps)(FilmList)
export default FilmListC;
