import React, { Component } from 'react'
import styles from './style'

class FilmSlideShow extends Component {
	constructor (props) {
		super(props);
		this.lock = false; 
	}

	componentWillUnmount(){  
        this.lock = true;  
    }  

	componentWillMount () {
		let { filmImgListSliderArr, animationTime, sliderImgWidth, sliderImgHeight} = this.props
		if(!this.lock){  
			this.setState({
				filmImgListSliderArr: filmImgListSliderArr,
				startX: 0,
				distance: 0,
				animationTime: animationTime,
				sliderImgWidth: sliderImgWidth,
				sliderImgHeight: sliderImgHeight
			})
		}
	}
	componentWillUpdate () {

	}
	componentDidMount() {
		let { animationTime } = this.state
		this.sliderAutoMove(animationTime)
	}
	prev (filmImgListSliderArr) {
		let tempArr = []
		tempArr = this.leftMove(filmImgListSliderArr)
		this.setState({
			distance: 0,
			animationTime: 0,        //这一步比较关键，可以不设置为0看看存在的问题
			filmImgListSliderArr: tempArr
		})
	}
	next (filmImgListSliderArr) {
		let tempArr = []
		tempArr = this.rightMove(filmImgListSliderArr)
		this.setState({
			distance: 0,
			animationTime: 0,
			filmImgListSliderArr: tempArr
		})
	}
	sliderAutoMove (animationTime) {
		this.timer = setTimeout( () => {
			let { filmImgListSliderArr, distance, sliderImgWidth } = this.state
			this.setState({
				distance: -1*sliderImgWidth,
				animationTime: animationTime      //在prev执行了animation为0之后，必须重设这个值
			}, () => {
				setTimeout( () => {
					this.prev(filmImgListSliderArr)
				}, animationTime)
			})
			this.sliderAutoMove(animationTime)
		}, 3000)
	}
	onTouchStart (e) {
		clearTimeout(this.timer)
		let startX = e.touches[0].clientX
		this.setState({
			startX : startX
		})
	}
	onTouchMove (e) {
		let { startX, distance, animationTime } = this.state
		let moveX = e.touches[0].clientX
		distance = -(startX - moveX)/50   //px转换为rem
		this.setState({
			distance: distance,
			animationTime: 0
		})
	}
	onTouchEnd (e) {
		let { startX, distance, animationTime, sliderImgWidth } = this.state
		animationTime = 200
		let distanceTempValue
		if (Math.abs(distance) < sliderImgWidth/4) {
			distanceTempValue = 0
		} else if (distance < 0 && Math.abs(distance) > sliderImgWidth/4) {
			distanceTempValue = -1*sliderImgWidth
		} else if (distance > 0 && Math.abs(distance) > sliderImgWidth/4) {
			distanceTempValue = 1*sliderImgWidth
		}
		this.setState({
			distance: distanceTempValue,
			animationTime: animationTime
		}, () => {
			setTimeout( () => {                              //增加200ms的延时作用，让数组结构的改变在distance(动画)改变之后
				let { distance, filmImgListSliderArr, sliderImgWidth } = this.state
				if (distance == -1*sliderImgWidth) {
					this.prev(filmImgListSliderArr)
				}
				if (distance == 1*sliderImgWidth) {
					this.next(filmImgListSliderArr)
				}
			}, animationTime)
			this.sliderAutoMove(animationTime)
		})
	}
	leftMove (arr) {
		let arrLength = arr.length
		let copyArr = []
		copyArr = arr.slice()
		let firstArrValue = copyArr.shift()
		copyArr.push(firstArrValue)
		return copyArr
	}
	rightMove (arr) {
		let arrLength = arr.length
		let copyArr = []
		copyArr = arr.slice()
		let lastArrValue = copyArr.pop()
		copyArr.unshift(lastArrValue)
		return copyArr
	}
	render() {
		let { distance, startX, filmImgListSliderArr, animationTime, sliderImgHeight, sliderImgWidth } = this.state
		let absoluteLeft = distance - sliderImgWidth
		let filmImgList = filmImgListSliderArr.map( (item, index) => {
			let style = {
		        backgroundImage: `url(${item})`,
		        backgroundRepeat: 'no-repeat',
		        backgroundSize: 'cover',
		        width: `${sliderImgWidth}rem`,
		        height: `${sliderImgHeight}rem`,
		        marginTop: '0rem',
		        float: 'left'
	      	}
	      	return (
	      		<div style={ style }  key = { "key" + index }></div>
	      	)
		})
		let containerOuter = {
			width: `${sliderImgWidth}rem`,
			height: `${sliderImgHeight}rem`,
			position: 'relative',
			overflow: 'hidden',
			margin: '0 auto'
		}
		let containerInner = {
			//width: `${sliderImgWidth}*5rem`,
			width: `${sliderImgWidth*5}rem`,
			height: `${sliderImgHeight}rem`,
			position: 'absolute',
			left: `${absoluteLeft}rem`,
			transition:`all ${animationTime}ms linear`,
		}
		return (
			<div>
				<div style = { containerOuter } >
					<div style = { containerInner } 
					onTouchStart = { this.onTouchStart.bind(this) } 
					onTouchMove={ this.onTouchMove.bind(this) } 
					onTouchEnd={ this.onTouchEnd.bind(this) }>
						{ filmImgList }
					</div>
				</div>
			</div>
		)
	}
}

export default FilmSlideShow