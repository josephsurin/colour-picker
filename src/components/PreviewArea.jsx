import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import { css } from 'glamor'
import tinycolor from 'tinycolor2'
import 'react-toastify/dist/ReactToastify.min.css'

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
                <div className="preview-block-full" style={{ backgroundColor: hex }} onClick={this.copycol.bind(this, hex)}></div>
                <input className="hex-input" type="text" name="hex" value={hexinput} onChange={handleHex} onKeyDown={handleHex} onBlur={handleHex} />
                <div className="preview-formatted" onClick={this.copycol.bind(this, rgbstring)}>{rgbstring}</div>
                <div className="preview-formatted" onClick={this.copycol.bind(this, hsvstring)}>{hsvstring}</div>
                <div className="preview-formatted" onClick={this.copycol.bind(this, hslstring)}>{hslstring}</div>
                <ToastContainer />
            </div>
        )
    }

    copycol(val) {
        copy(val)
        toast(`${val} copied to clipboard!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: `${css({ borderLeft: '8px solid ' + this.props.hex })} copy-toast`,
            hideProgressBar: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            closeButton: false,
            autoClose: 1500
        })
    }
}
