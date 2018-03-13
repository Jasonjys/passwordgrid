import React, { Component } from 'react'
import Flag from './Flag'

const style = {
  display: 'flex',
  minHeight: '35%',
  width: '100%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly'
}

class FlagsContainer extends Component {
  render () {
    const { flags } = this.props

    return (
      <div style={style}>
        {flags.map((flag, i) => (
          <Flag
            dropped={false}
            key={flag.id}
            index={i}
            id={flag.id}
            country={flag.country}
            moveFlag={this.props.moveFlag}
            selectFlag={this.props.selectFlag}
          />
        ))}
      </div>
    )
  }
}

export default FlagsContainer
