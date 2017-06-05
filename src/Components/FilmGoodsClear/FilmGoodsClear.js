import React, { Component } from 'react'
import styles from './style'
import classNames from 'classnames/bind'

class FilmGoodsClear extends Component {
	constructor (props) {
		super(props);
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	render () {
		let { filmGoodsListResult, filmGoodsListCounter} = this.props
		let totalPrice = 0
		let totalfimlGoodsCount = 0
		let boolValue = true 
		for (let i = 0; i < filmGoodsListCounter.length; i++) {
			totalPrice += filmGoodsListResult[i].salePrice * filmGoodsListCounter[i]
			totalfimlGoodsCount += filmGoodsListCounter[i]
		}

		if ( totalfimlGoodsCount > 0) {
			boolValue = false
		}
		let tempChange = classNames.bind(styles)
		let classTemp = tempChange({
			mainContentShow: !boolValue,
			mainContentHidden: boolValue
		})

		return (
			<div>
				<div className = { classTemp }>
					<div className = { styles.leftContent }>
						<span className = { styles.price}>￥{ totalPrice }</span>
						<span className = { styles.counter}>共{ totalfimlGoodsCount }件</span>
					</div>
					<div className = { styles.btn }>
						去结算
					</div>
				</div>
			</div>
		)
	}
}

export default FilmGoodsClear
