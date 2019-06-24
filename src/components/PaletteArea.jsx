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
                <div className="palette-header">
                    <span>custom palette</span>
                    <div className="palette-action-icons">
                        <i className="material-icons" onClick={this.addBlock.bind(this)}>library_add</i>
                        <i className="material-icons" onClick={this.clearPalette.bind(this)}>delete_forever</i>
                    </div>
                </div>
                <div className="palette-elements-container">
                    {palette.map((el, i) => <div key={i} className="palette-element" onContextMenu={this.setColour.bind(this, i)} onClick={this.copyColour.bind(this, i)} style={ el ? { backgroundColor: el } : {} }></div>)}
                </div>
            </div>
        )
    }

    setColour(i, event) {
        event.preventDefault()
        let { palette } = this.state
        if(palette[i]) {
            palette[i] = false
        } else {
            palette[i] = this.props.hex
        }
        this.setState({ palette })
    }

    copyColour(i, event) {
        let { palette } = this.state
        var hex = palette[i]
        if(hex) {
            copycol(hex, hex)
        }
    }

    addBlock() {
        let { palette } = this.state
        this.setState({ palette: [...palette, false] })
    }

    clearPalette() {
        let { palette } = this.state
        this.setState({ palette: Array(palette.length).fill(false) })
    }
}
