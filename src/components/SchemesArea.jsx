import React from 'react'
import Scheme from './Scheme.jsx'
import { schemeGenerators } from '../util/schemesGenerator.js'

const SchemesArea = (props) => {
    let { seed } = props
    var schemes = schemeGenerators.map(fn => fn(seed))
    return(
        <div className="schemes-area">
            {schemes.map(([schemeName, scheme]) => <Scheme key={schemeName} name={schemeName} colours={scheme} />)}
        </div>
    )
}

export default SchemesArea
