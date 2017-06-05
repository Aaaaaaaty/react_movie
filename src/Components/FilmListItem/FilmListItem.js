import React, { Component } from 'react';
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import styles from './style'

class FilmListItem extends Component {
  constructor(props){
     super(props);
  }
  onTouchTap() {

  }
  render() {
    let { name, phrase, starring, saleStatus, url, filmType, crews, videoStills, keyword, language, duration, releaseTime, summary, posterUrl } = this.props
    let posterImgStyle = {
      background: `url(${ url }) center center no-repeat`,
      width: '1.5rem',
      height: '2.05rem',
      backgroundSize: 'contain'
    }
    let cx = classNames.bind(styles);
    let filmTypeList = []

    //console.log("yu test")

    for(let i = 0; i < filmType.length; i++) {
      let is2d3d, isMax
      let filmTypeListItem = (() => {
        if(filmType[i] === '2D' || filmType[i] === '3D') {
          is2d3d = true
        } else if(filmType[i] === 'IMAX' || filmType[i] === 'DMAX') {
          isMax = true
        }
        let className = cx({
          type_d: is2d3d,
          type_m: isMax
        })
        return (
          <span key={'filmType' + i} className = { className }>{ filmType[i] }</span>
        )
      })()
      filmTypeList.push(filmTypeListItem)
    }
    return (
      <div className = { styles.filmFlex  }>
        <Link className={ styles.filmDetailWrapper }
              to={{ pathname: '/filmDetail',
                    state: {
                      crews: crews,
                      videoStills: videoStills,
                      name: name,
                      keyword: keyword,
                      language: language,
                      duration: duration,
                      releaseTime: releaseTime,
                      summary: summary,
                      posterUrl: posterUrl
                    }}}>
          <div style = { posterImgStyle }></div>
          <div className = { styles.filmContent }>
            <p className = { styles.title }>{ name }</p>
            <div className = { styles.subTitle }>
              <p className = { styles.sub}>{ phrase }</p>
              <p className = { styles.sub}>{ starring }</p>
              <p className={ styles.tip }>{ filmTypeList }</p>
            </div>
          </div>
        </Link>
        <div className = { styles.buyBtn }>
          {
            (() => {
              let status
              if(saleStatus === 1) {
                return (<Link className={ styles.btn_type_1 }
                              to={{ pathname: '/filmScheduleList',
                                    state: {name: name}}}>购票</Link>)
              } else if (saleStatus === 2) {
                return (<span className={ styles.btn_type_2 }>预售</span>)
              }
            })()
          }
        </div>
      </div>
    )
  }
}
export default FilmListItem;
