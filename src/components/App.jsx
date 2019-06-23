import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Map } from 'coloreact'
import tinycolor from 'tinycolor2'
import Hue from './Hue.jsx'
import RGBSlider from './RGBSlider.jsx'
import HueSlider from './HueSlider.jsx'
import SatSlider from './SatSlider.jsx'
import ValSlider from './ValSlider.jsx'
import NumericInput from 'react-numeric-input'
import PreviewArea from './PreviewArea.jsx'
import SchemesArea from './SchemesArea.jsx'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            h: 0,
            s: 0,
            v: 0,
            r: 0,
            g: 0,
            b: 0,
            hex: '#000000',
            hexinput: '#000000'
        }
    }

    render() {
        let { s, v, h, r, g, b, hex, hexinput } = this.state
        return (
            <div className="wrapper">
                <div className="colour-area">
                    <div className="colour-area-picker">
                        <Map
                            x={s}
                            y={v}
                            backgroundColor={tinycolor(`hsv(${h}, 100, 100)`).toHexString()}
                            max={100}
                            onChange={this.handleSaturationValue.bind(this)}
                            className="sat-val-map"
                            pointerStyle={{
                                color: (s > 50 || v < 70) ? 'white' : 'black'
                            }}
                        />
                        <Hue onHueChange={this.handleHue.bind(this)} hue={h} className="hue-circle"/>
                        <div className="pseudo-border-hue"/>
                        <div className="pseudo-border-hue2"/>
                    </div>
                    <div className="colours-sliders">
                        <div className="colours-slider">
                            <span className="colour-labels">red</span>
                            <RGBSlider onSlide={this.handleRGB.bind(this, 'r')} change="r" r={r} g={g} b={b} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleRGB.bind(this, 'r')} min={0} max={255} value={r} className="colours-numinputs" style={false}/>
                            </div>
                        <div className="colours-slider">
                            <span className="colour-labels">green</span>
                            <RGBSlider onSlide={this.handleRGB.bind(this, 'g')} change="g" r={r} g={g} b={b} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleRGB.bind(this, 'g')} min={0} max={255} value={g} className="colours-numinputs" style={false}/>
                            </div>
                        <div className="colours-slider">
                            <span className="colour-labels">blue</span> 
                            <RGBSlider onSlide={this.handleRGB.bind(this, 'b')} change="b" r={r} g={g} b={b} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleRGB.bind(this, 'b')} min={0} max={255} value={b} className="colours-numinputs" style={false}/>
                            </div>
                        <div className="colours-slider">
                            <span className="colour-labels">hue</span>
                            <HueSlider onHueSlide={this.handleHue.bind(this)} hue={h} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleHue.bind(this)} min={0} max={360} value={Math.round(h)} className="colours-numinputs" style={false}/>
                            </div>
                        <div className="colours-slider">
                            <span className="colour-labels">saturation</span>
                            <SatSlider onSatSlide={this.handleSat.bind(this)} hue={h} sat={s} val={v} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleSat.bind(this)} min={0} max={100} value={Math.round(s)} className="colours-numinputs" style={false}/>
                            </div>
                        <div className="colours-slider">
                            <span className="colour-labels">value</span>
                            <ValSlider onValSlide={this.handleVal.bind(this)} hue={h} sat={s} val={v} className="slider" width={360} height={30}/>
                            <NumericInput onChange={this.handleVal.bind(this)} min={0} max={100} value={Math.round(v)} className="colours-numinputs" style={false}/>
                            </div>
                    </div>
                </div>
                <PreviewArea h={h} s={s} v={v} r={r} g={g} b={b} hex={hex} hexinput={hexinput} handleHex={this.handleHex.bind(this)} />
                <SchemesArea seed={hex} />
                <ToastContainer />
            </div>
        )
    }

    handleRGB(change, val) {
        let { r, g, b } = this.state
        var newhex = Object.assign({ r, g, b }, { [change]: val })
        var hex = tinycolor(newhex).toHexString()
        let { h, s, v } = tinycolor(hex).toHsv()
        s *= 100; v *= 100
        this.setState(Object.assign({ hexinput: hex, hex, h, s, v }, tinycolor(hex).toRgb()))
    }

    handleHue(h) {
        var hex = tinycolor(`hsv(${h}, ${this.state.s}%, ${this.state.v}%)`).toHexString()
        let { r, g, b } = tinycolor(hex).toRgb()
        this.setState({ h, hexinput: hex, hex, r, g, b })
    }

    handleSat(s) {
        var hex = tinycolor(`hsv(${this.state.h}, ${s}%, ${this.state.v}%)`).toHexString()
        let { r, g, b } = tinycolor(hex).toRgb()
        this.setState({ s, hexinput: hex, hex, r, g, b })
    }

    handleVal(v) {
        var hex = tinycolor(`hsv(${this.state.h}, ${this.state.s}%, ${v}%)`).toHexString()
        let { r, g, b } = tinycolor(hex).toRgb()
        this.setState({ v, hexinput: hex, hex, r, g, b })
    }

    handleSaturationValue(s, v) {
        var hex = tinycolor(`hsv(${this.state.h}, ${s}%, ${v}%)`).toHexString()
        let { r, g, b } = tinycolor(hex).toRgb()
        this.setState({ s, v, hexinput: hex, hex, r, g, b })
    }

    handleHex(event) {
        if(event.type == 'change') {
            this.setState({ hexinput: event.target.value })
            return
        }
        if(event.type == 'keydown' && event.key != 'Enter') return
        // if hex is valid, get tinycolor to parse it and update ALL values
        var tc = tinycolor(event.target.value)
        if(tc.isValid()) {
            let { r, g, b } = tc.toRgb()
            let { h, s, v } = tc.toHsv()
            s *= 100; v *= 100
            let hex = tc.toHexString()
            this.setState({ h, s, v, r, g, b, hex })
        } else {
            this.setState({ hexinput: this.state.hex })
        }
    }

}
