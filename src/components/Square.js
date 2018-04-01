import React, { Component } from 'react'
import ItemTypes from './ItemTypes'
import { DropTarget } from 'react-dnd'

const hoverStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  zIndex: 1,
  opacity: 0.5,
  backgroundColor: 'green'
}

const squareStyle = {
  backgroundColor: 'white',
  position: 'relative',
  width: '100%',
  height: '100%',
  border: '0.5px solid black'
}

const squareTarget = {
  drop (props, monitor) {
    if (props.onDrop) {
      props.onDrop(props.index, monitor.getItem())
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Square extends Component {
  render () {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div style={squareStyle}>
        {this.props.children}
        {isOver && <div style={hoverStyle} />}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.ICON, squareTarget, collect)(Square)
