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
        position: 'relative',
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'black'
      }}>
        {this.props.children}
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'green'
          }} />
        }
      </div>
    )
  }
}

export default DropTarget(ItemTypes.FLAG, squareTarget, collect)(Square)
