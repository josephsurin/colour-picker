import React, { Component } from 'react'
import { copycol, notify } from '../util/util'

export default class PaletteArea extends Component {
    constructor(props) {
        super(props)

        // check for palette in localStorage
        var savedPalette = window.localStorage.getItem('palette')
        var palette = savedPalette ? decodePalette(savedPalette) : Array(120).fill(false)

        this.state = { palette }
    }
    
    render() {
        let { palette } = this.state
        return(
            <div className="palette-area">
                <div className="palette-header">
                    <span>custom palette</span>
                    <div className="palette-action-icons">
                        <i className="material-icons" onClick={this.savePalette.bind(this)}>save</i>
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

    copyColour(i) {
        let { palette } = this.state
        var hex = palette[i]
        if(hex) {
            copycol(hex, hex)
        }
    }

    savePalette() {
        let { palette } = this.state
        var encodedPalette = encodePalette(palette)
        window.localStorage.setItem('palette', encodedPalette)
        notify('Palette saved!')
    }

    addBlock() {
        let { palette } = this.state
        this.setState({ palette: [...palette, false] })
    }

    clearPalette() {
        let { palette } = this.state
        this.setState({ palette: Array(palette.length).fill(false) })
        window.localStorage.removeItem('palette')
        notify('Palette cleared!')
    }
}

function encodePalette(palette) {
    //base64("length|i:#xxxxxx|...")
    var encoded = `${palette.length}`
    palette.forEach((el, i) => {
        if(el) {
            encoded += `|${i}:${el}`
        }
    })
    return btoa(encoded)
}

function decodePalette(encoded) {
    //returns a palette array
    try {
        encoded = atob(encoded) //base64 decode
        var l = parseInt(encoded.split('|')[0])
        var palette = Array(l).fill(false)
        encoded.split('|').slice(1).forEach(el => {
            let [i, col] = el.split(':')
            palette[i] = col
        })
        return palette
    } catch {
        return false
    }
}
