import React, { Component } from 'react';
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import styles from './style'

class FilmDetailMsg extends Component {
  constructor(props){
     super(props);
     this.state = {
       top: 3.56,
       animationType: 'ease-out',
       position: 'down', //弹窗标志方向,
       positionSummary: 'down',
       heightSummary: '1.3rem',
       animationDown: 800,
       animationUp: 100,
       absoluteOrFix: 'absolute'
     }
  }
  summaryDownUp() {
    let { positionSummary } = this.state
    if(positionSummary === 'down') {
      this.setState({
        heightSummary: 'auto',
        positionSummary: 'up'
      })
    } else {
      this.setState({
        heightSummary: '1.3rem',
        positionSummary: 'down'
      })
    }
  }
  slideDownUp() {
    let { changeFilmDetailMsgPosition } = this.props
    let { position, animationUp, animationDown } = this.state
    if(position === 'down') {
      changeFilmDetailMsgPosition('down')
      this.setState({
        top: 11.77,
        animationTime: animationDown,
        animationType: 'ease-out',
        position: 'down'
      },
      () => {
        setTimeout(() => {
          this.setState({
            position: 'up',
            absoluteOrFix: 'fixed',
            animationTime: 0
          })
        }, animationDown)
      }
    )
    } else {
      changeFilmDetailMsgPosition('up')
      this.setState({
        top: 11.77,
        absoluteOrFix: 'absolute',
        animationTime: 0,
      }
      , () => {
        this.setState({
          top: 3.56,
          position: 'down',
          animationType: 'linear',
          animationTime: animationUp,
        })
      }
    )
    }

  }
  render() {
    let { posterUrl, keyword, name, duration, language, releaseTime, summary, crews } = this.props
    let { top, animationTime, animationType, position, positionSummary, heightSummary, absoluteOrFix } = this.state
    let style = {
      width: '7.5rem',
      position: `${absoluteOrFix}`,
      zIndex: 1,
      top: `${top}rem`,
      WebkitTransition:`all ${animationTime}ms ${animationType}`,
      MozTransition:`all ${animationTime}ms ${animationType}`,
      OTransition:`all ${animationTime}ms ${animationType}`,
      MsTransition:`all ${animationTime}ms ${animationType}`,
      transition:`all ${animationTime}ms ${animationType}`,
    }
    let styleIcon = {
      backgroundImage: `url(./images/icon_arrow${position}.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '0.36rem 0.24rem'
    }
    let stylePostImg = {
      width: '2.2rem',
      height: '3.06rem',
      background: `url(${ posterUrl }) center no-repeat`,
      backgroundSize: 'cover',
    }
    let styleSummary = {
      height: `${ heightSummary }`,
    }
    let styleIconSummary = {
      backgroundImage: `url(./images/icon_arrow${ positionSummary }1.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '0.36rem 0.24rem'
    }
    let peopleList = crews.map((item, index) => {
      let style = {
        backgroundImage: `url(${ item.imageUrl })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '1.8rem',
        height: '2.5rem',
        margin: '0 0.01rem'
      }
      return (
        <div key={ 'crews' + index }>
          <div style={ style }></div>
          <p className={ styles.crewsTitle }>{ item.realName }</p>
          <p className={ styles.crewsSub}>{ item.roleName }</p>
        </div>
      )
    })
    let slideUpList = ((position) => {
      if(position === 'down') {
        return (
          <div>
          <div  className={ styles.iconLine }
                onTouchTap={ this.slideDownUp.bind(this)}>
            <span style={ styleIcon }
                  className={ styles.icon }
                  ></span>
          </div>
          <div  className={ styles.content }>
            <div  style={ stylePostImg }
                  className={ styles.posterUrl }></div>
            <div className={ styles.profileWrapper }>
              <p className={ styles.profileTitle }>{name}</p>
              <div className={ styles.profileSub }>
                <p>{keyword}</p>
                <p>{language}/{duration}分钟</p>
                <p>{releaseTime}</p>
              </div>
            </div>
            <div  className={ styles.summary }
                  style={ styleSummary }>{summary}</div>
            <div  className={ styles.iconLineSummary }
                  onTouchTap={ this.summaryDownUp.bind(this)}>
              <span style={ styleIconSummary }
                    className={ styles.icon }
                    ></span>
            </div>
            <div>
              <p className={ styles.crews }><img className={ styles.crewsImg } src='./images/crew_cion.png'></img>演职人员</p>
              <div className={ styles.peopleListFlex }>
                { peopleList }
              </div>
            </div>
          </div>
          <div className={ styles.bottomBtn }>
            <div className={ styles.bottomItem }><img className={ styles.bottomItemImg } src='./images/icon_want2_default.png'></img>想看</div>
            <div className={ styles.bottomItem }><img className={ styles.bottomItemImg } src='./images/icon_share_default.png'></img>分享</div>
            <Link className={ styles.bottomItemBuy }
                  to={{ pathname: '/filmScheduleList',
                        state: {name: name}}}>选座购票</Link>
          </div>
          </div>
        )
      } else {
        return (
          <div className={ styles.bottom }>
            <div  className={ styles.iconLine }
                  onTouchTap={ this.slideDownUp.bind(this)}>
            <span style={ styleIcon }
                  className={ styles.icon }></span>
            </div>
            <div className={ styles.bottomBtnS }>
              <div className={ styles.bottomItem }><img className={ styles.bottomItemImg } src='./images/icon_want2_default.png'></img>想看</div>
              <div className={ styles.bottomItem }><img className={ styles.bottomItemImg } src='./images/icon_share_default.png'></img>分享</div>
              <Link className={ styles.bottomItemBuy }
                    to={{ pathname: '/filmScheduleList',
                          state: {}}}>选座购票</Link>
            </div>
          </div>
        )
      }

    })(position)
    return (
      <div  style={ style }>
        { slideUpList }
      </div>
    )
  }
}
export default FilmDetailMsg;
