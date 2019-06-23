import React, { Component } from 'react'
import tinycolor from 'tinycolor2'
import { copycol } from '../util/util.js'

export default class PreviewArea extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { h, s, v, r, g, b, hex, handleHex, hexinput } = this.props
        var tc = tinycolor(hex)
        var rgbstring = tc.toString('rgb')
        var hsvstring = tc.toString('hsv')
        var hslstring = tc.toString('hsl')
        return(
            <div className="preview-area">
                <div className="preview-block preview-block-dark" style={{ backgroundColor: '#222222' }}>
                    <div className="preview-block-content" style={{ backgroundColor: hex, borderColor: '#111111' }}></div>
                </div>
                <div className="preview-block preview-block-dark" style={{ backgroundColor: '#eeeeee' }}>
                    <div className="preview-block-content" style={{ backgroundColor: hex, borderColor: '#bbbbbb' }}></div>
                </div>
                <div className="preview-block-full" style={{ backgroundColor: hex }} onClick={copycol.bind(this, hex, hex)}></div>
                <input className="hex-input" type="text" name="hex" value={hexinput} onChange={handleHex} onKeyDown={handleHex} onBlur={handleHex} />
                <div className="preview-formatted" onClick={copycol.bind(this, rgbstring, hex)}>{rgbstring}</div>
                <div className="preview-formatted" onClick={copycol.bind(this, hsvstring, hex)}>{hsvstring}</div>
                <div className="preview-formatted" onClick={copycol.bind(this, hslstring, hex)}>{hslstring}</div>
            </div>
        )
    }

}
