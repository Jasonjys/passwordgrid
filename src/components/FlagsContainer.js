import React, { Component } from 'react'
import Flag from './Flag'

const style = {
  minHeight: '30%',
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
  flexWrap: 'wrap'
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
            text={flag.text}
            moveFlag={this.props.moveFlag}
            selectFlag={this.props.selectFlag}
          />
        ))}
      </div>
    )
  }
}

export default FlagsContainer
