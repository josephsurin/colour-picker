import React from 'react'
import { Observable } from 'rxjs'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/concatMap'
import tinycolor from 'tinycolor2'
import Marker from './Marker.jsx'

export default class RGBSlider extends React.Component {
    constructor(props) {
        super(props)
        this.rgbslider = null
        this.state = {
            r: this.props.r,
            g: this.props.g,
            b: this.props.b
        }
    }
  
    render() {
        let { r, g, b } = this.props
        var gradpoint1 = tinycolor(Object.assign({r, g, b}, { [this.props.change]: 0 })).toHexString()
        var gradpoint2 = tinycolor(Object.assign({r, g, b}, { [this.props.change]: 255 })).toHexString()
        return (   
            <div className={this.props.className} style={{position: 'relative', width: this.props.width+'px', height: this.props.height+'px' }} >
                <div className="rgb-slider" ref={slider => { this.rgbslider = slider }} style={{
                    background: `linear-gradient(to right, ${gradpoint1} 0%, ${gradpoint2} 100%)`,
                    width: this.props.width+'px',
                    height: this.props.height+'px',
                    position: 'absolute',
                    userFocus: 'none'
                }}>
                    <Marker left={this.props[this.props.change]*this.props.width/255 > this.props.width-4 ? this.props.width-4 : this.props[this.props.change]*this.props.width/255} height={this.props.height}/> 
                </div>  
            </div>
        )
    }
  
    componentDidMount() {
        let mouseDown = Observable.fromEvent(this.rgbslider, 'mousedown')
        mouseDown.subscribe(clickEvent => {
            const val = Math.round(255*(clickEvent.offsetX/this.props.width)) > 255 ? 255 : Math.round(255*(clickEvent.offsetX/this.props.width))
            this.setState({
                [this.props.change]: val
            })
            this.props.onSlide(val)

        })

        let mouseMoves = Observable.fromEvent(document.body, 'mousemove')
        let mouseUps = Observable.fromEvent(document.body, 'mouseup')

        let mouseDrags = mouseDown.concatMap(clickEvent => {
            const xMouseShouldBe = this.state[this.props.change]*this.props.width/255
            const xMouseIs = clickEvent.clientX
            const xMouseDelta = xMouseIs - xMouseShouldBe
            return mouseMoves.takeUntil(mouseUps).map(moveEvent => {
                let leftNorm = moveEvent.clientX - xMouseDelta
                if(leftNorm<0) {
                    leftNorm = 0
                } else if(leftNorm>this.props.width) {
                    leftNorm = this.props.width
                }
                return leftNorm
            })
        })

        mouseDrags.forEach(leftNorm => {
            const val = Math.round(255*(leftNorm/this.props.width))
            this.setState({
                [this.props.change]: val
            })
            this.props.onSlide(val)
        })

    }
  
}
