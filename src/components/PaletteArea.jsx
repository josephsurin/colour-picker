import React, { Component } from 'react'
import { copycol } from '../util/util'

export default class PaletteArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            palette: Array(120).fill(false)
        }
    }
    
    render() {
        let { palette } = this.state
        return(
            <div className="palette-area">
                <div className="palette-header">custom palette</div>
                <div className="palette-elements-container">
                    {palette.map((el, i) => <div key={i} className="palette-element" onContextMenu={this.setColour.bind(this, i)} onClick={this.copyColour.bind(this, i)} style={ el ? { backgroundColor: el } : {} }></div>)}
                </div>
            </div>
        )
    }

    setColour(i, event) {
        event.preventDefault()
        let { palette } = this.state
        palette[i] = this.props.hex
        this.setState({ palette })
    }

    copyColour(i, event) {
        let { palette } = this.state
        var hex = palette[i]
        if(hex) {
            copycol(hex, hex)
        }
    }
}
