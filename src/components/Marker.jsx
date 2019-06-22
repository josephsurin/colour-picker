import React from 'react'

const Marker = props => {
    return(
        <div style={{
            width: '3px',
            height: props.height,
            border: '1px solid white',
            outline: '1px solid black',
            position: 'absolute',
            top: '-1px',
            left: props.left+'px',
            pointerEvents: 'none'
        }}/>
    )
}

export default Marker
