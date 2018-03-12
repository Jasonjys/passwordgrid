import React, { Component } from 'react'
import ItemTypes from './ItemTypes'
import { DropTarget } from 'react-dnd'

const squareTarget = {
  drop (props, monitor) {
    props.onDrop(props.index, monitor.getItem())
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
      <div style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'red'
      }}>
        {this.props.children}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.FLAG, squareTarget, collect)(Square)
