import React, { Component } from 'react'
import Square from './Square'
import Flag from './Flag'

const flagStyle = {
  height: '100%',
  width: '100%',
  cursor: 'move'
}

class Grid extends Component {
  renderSquare (i, flag) {
    const piece = flag
      ? <Flag
        dropped
        flagStyle={flagStyle}
        index={i}
        key={flag.id}
        id={flag.id}
        country={flag.country}
        selectFlag={this.props.selectFlag}
        moveFlag={this.props.moveFlag}
      />
      : null

    return (
      <div
        key={i}
        style={{width: '33.3333%', height: '33.3333%'}}
      >
        <Square onDrop={this.props.onDrop} index={i}>
          {piece}
        </Square>
      </div>
    )
  }

  render () {
    const { droppedFlags } = this.props
    const squares = []

    droppedFlags.forEach((droppedFlag, index) => {
      squares.push(this.renderSquare(index, droppedFlag))
    })
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', height: '50%', width: '50%', margin: 'auto'}}>
        {squares}
      </div>
    )
  }
}

export default Grid
