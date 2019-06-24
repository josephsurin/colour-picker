import React from 'react'
import { Observable } from 'rxjs'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/concatMap'
import Marker from './Marker.jsx'

export default class HueSlider extends React.Component {
    constructor(props) {
        super(props)
        this.hueslider = null
        this.state = {
            hue: this.props.hue
        }
    }
  
    render() {
        return (   
            <div className={this.props.className} style={{position: 'relative', width: this.props.width+'px', height: this.props.height+'px' }} >
                <div className="hue-slider" ref={slider => { this.hueslider = slider }} style={{
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                    width: this.props.width+'px',
                    height: this.props.height+'px',
                    position: 'absolute',
                    userFocus: 'none'
                }}>
                    <Marker left={this.props.hue*this.props.width/360 > this.props.width-4 ? this.props.width-4:this.props.hue*this.props.width/360} height={this.props.height}/> 
                </div>  
            </div>
        )
    }
  
    componentDidMount() {
        let mouseDown = Observable.fromEvent(this.hueslider, 'mousedown')
        mouseDown.subscribe(clickEvent => {
            const hue = Math.round(360*(clickEvent.offsetX/this.props.width)) > 360 ? 360 : Math.round(360*(clickEvent.offsetX/this.props.width))
            this.setState({
                hue: hue
            })
            this.props.onHueSlide(hue)

        })

        let mouseMoves = Observable.fromEvent(document.body, 'mousemove')
        let mouseUps = Observable.fromEvent(document.body, 'mouseup')

        let mouseDrags = mouseDown.concatMap(clickEvent => {
            const xMouseShouldBe = this.state.hue
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
            const hue = Math.round(360*(leftNorm/this.props.width))
            this.setState({
                hue: hue
            })
            this.props.onHueSlide(hue)
        })

    }
  
}

