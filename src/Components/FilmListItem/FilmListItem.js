import React, { Component } from 'react';
import classNames from 'classnames/bind'
import styles from './style'

class FilmListItem extends Component {
  constructor(props){
     super(props);
  }
  render() {
    // 'name': '刺客信条',
    // 'filmShortCode': 0,
    // 'releaseTime': '2016-01-23',
    // 'director': 'someone',
    // 'starring': '迈克尔·法斯宾德,玛丽昂·歌迪亚',
    // 'phrase': '穿越黑科技，法鲨炫腹肌',
    // 'posterUrl': 'http://static.wepiao.com/movie/2016/9/7_0/201609070940573548.jpg',
    // 'userFilmInterestCount': 10,
    // 'saleStatus': 0, //售卖状态，0不可售，1可售，2预售
    // 'is2D': true,
    // 'is3D': false,
    // 'isImax': true,
    // 'isDmax': false
    let { name, phrase, starring, saleStatus, url, filmType } = this.props
    let posterImgStyle = {
      background: 'url(' + url + ') center center no-repeat',
      width: '1.5rem',
      height: '2.05rem',
      backgroundSize: 'contain'
    }
    let cx = classNames.bind(styles);
    let filmTypeList = []

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
        <div style = { posterImgStyle }></div>
        <div className = { styles.filmContent }>
          <p className = { styles.title }>{ name }</p>
          <div className = { styles.subTitle }>
            <p className = { styles.sub}>{ phrase }</p>
            <p className = { styles.sub}>{ starring }</p>
            <p className={ styles.tip }>{ filmTypeList }</p>
          </div>
        </div>
        <div className = { styles.buyBtn }>
          {
            (() => {
              let status
              if(saleStatus === 1) {
                return (<span className={ styles.btn_type_1 }>购票</span>)
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
