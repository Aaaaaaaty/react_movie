import React, { Component } from 'react';
import { connect, Provider} from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../Redux/Store/Store';
import FilmGoodsListItem from '../Components/FilmGoodsListItem/FilmGoodsListItem';
import FilmGoodsClear from '../Components/FilmGoodsClear/FilmGoodsClear';
import FilmSlideShow from '../Components/FilmSlideShow/FilmSlideShow';

class FilmGoodsList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			listType: 'online'
		}
	}
	componentWillMount () {
		const { getFilmGoodsList, getFilmScheduleList, getFilmList} = this.props
		getFilmGoodsList("./data/filmGoodsList.json", "")
    	getFilmList("./data/filmList.json", "")
    	getFilmScheduleList("./data/filmScheduleList.json", "")
	}
	
	render () {
		let { filmGoodsList, filmGoodsListCounter, getFilmGoodsCount, filmList } = this.props
		let { listType } = this.state
		let filmGoodsListResult = filmGoodsList[listType]
		let filmImgListSliderArrResult = filmList[listType]
		let sliderImgWidth = 2        //单位是rem
		let sliderImgHeight = 3.22
		let animationTime = 200       //动画事件，单位是ms

		if (filmGoodsListResult && filmImgListSliderArrResult) {
			let filmImgListSliderArr = []
			filmImgListSliderArrResult.map( (item, index) => {
				filmImgListSliderArr.push(item.posterUrl)
			})
			return (
				<div>
					<FilmGoodsListItem filmGoodsListResult = { filmGoodsListResult } filmGoodsListCounter = { filmGoodsListCounter } getFilmGoodsCount = { getFilmGoodsCount }/>
					<FilmGoodsClear filmGoodsListCounter = { filmGoodsListCounter } filmGoodsListResult = { filmGoodsListResult } />
					<FilmSlideShow filmImgListSliderArr = { filmImgListSliderArr } sliderImgWidth = { sliderImgWidth } sliderImgHeight = { sliderImgHeight } animationTime = { animationTime }/>
				</div>
			)
		} else {
			return (
				<div>

				</div>
			)
		}
	}
}

const FilmGoodsListC = connect(mapStateToProps, mapDispatchToProps)(FilmGoodsList)
export default FilmGoodsListC