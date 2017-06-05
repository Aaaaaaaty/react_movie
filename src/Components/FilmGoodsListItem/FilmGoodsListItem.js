import React, { Component } from 'react'
import styles from './style'
import classNames from 'classnames/bind'
import $ from 'jquery'

class FilmGoodsListItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
		}
	}
	componentWillMount() {
	}
	componentDidMount () {
		let { getFilmGoodsCount, filmGoodsListResult } = this.props
		let typeLength = filmGoodsListResult.length
		getFilmGoodsCount("FILM_GOODS_ACTION_INITIAL", 0 , typeLength)
	}
	getFilmGoodsCount (str, index) {
		let { getFilmGoodsCount, filmGoodsListCounter } = this.props
		// this.setState({
		// 	filmGoodsListCounter : filmGoodsListCounter
		// })
		// console.log(filmGoodsListCounter)

		getFilmGoodsCount(str, index)
	}
	render () {
		let { filmGoodsListResult, getFilmGoodsCount, filmGoodsListCounter} = this.props
		let tempChange = classNames.bind(styles)

		//临时定义的数组变量
		let boolValue = []
		let classTempMiddleNum = []
		let classTemp = []

		for (let i = 0; i < filmGoodsListCounter.length; i++) {
			boolValue[i] = true
			if (filmGoodsListCounter[i] >=1 ) {
				boolValue[i] = false
			}
			classTemp.push(tempChange({
				minusShow: !boolValue[i],
				minusHidden: boolValue[i]
			}))
			classTempMiddleNum.push(tempChange({
				middleNumShow:!boolValue[i],
			    middleNumHidden: boolValue[i]
			}))
		}
		
		let filmGoodsListContents = []
		let filmGoodsKindLength = filmGoodsListResult.length
		filmGoodsListResult.map( (item, index) =>  {
			filmGoodsListContents.push( 
				<div className = { styles.filmGoodsList}  key = { "key" + index }>
					<div className = { styles.leftItem}></div>
					<div className = { styles.rightItem}>
						<p className = { styles.title }>
							{ item.name }
						</p>
						<p className = { styles.desc }>
							{ item.desc }
						</p>
						<p className = { styles.price }>
							<span className = { styles.dollar}>￥</span>
							{ item.salePrice }
							<img src="./images/icon_add.png" className = { styles.add } onTouchTap = { this.getFilmGoodsCount.bind(this, "FILM_GOODS_ACTION_INCREMENT", index, filmGoodsKindLength) }/>
							<span className = { classTempMiddleNum[index] } >{ filmGoodsListCounter[index] }</span>
							<img src="./images/icon_minus.png" className = { classTemp[index] } onTouchTap = { this.getFilmGoodsCount.bind(this, "FILM_GOODS_ACTION_DECREMENT", index, filmGoodsKindLength) } />
						</p>
					</div>
				</div>
			)
		})
		return (
			<div>
				{ filmGoodsListContents  }
			</div>
		)
	}
}
export default FilmGoodsListItem