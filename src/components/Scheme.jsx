import React, { Component } from 'react'
import { copycol } from '../util/util.js'

export default class Scheme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
    }

    render() {
        let { name, colours } = this.props
        let { hidden } = this.state
        var hiddenClass = hidden ? ' schemes-hidden' : ''
        return(
            <div className="schemes-container">
                <div onClick={this.toggleHidden.bind(this)} className="schemes-name">{name}</div>
                <div className={'schemes-elements-container' + hiddenClass}>
                    {colours.map((el, i) => <div key={i} className="schemes-element" style={{ backgroundColor: el }} onClick={copycol.bind(this, el, el)}></div>)}
                </div>
            </div>
        )
    }

    toggleHidden() {
        let { hidden } = this.state
        this.setState({ hidden: !hidden })
    }
}
