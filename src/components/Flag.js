import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import ReactCountryFlag from 'react-country-flag'

const style = {
  height: 100,
  width: '18%',
  position: 'relative',
  margin: '.5rem',
  cursor: 'move'
}

const flagSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index,
      dropped: !!props.dropped
    }
  }
}

const flagTarget = {
  hover (props, monitor, component) {
    const draggingDroppedFlag = monitor.getItem().dropped
    const dragIndex = monitor.getItem().index
    console.log('draggingDroppedFlag: ', draggingDroppedFlag)

    const sourceDropped = props.dropped
    console.log('targetDropped: ', sourceDropped)
    const hoverIndex = props.index
    const draggingIntoGrid = !draggingDroppedFlag && sourceDropped

    console.log('draggingIntoGrid: ', draggingIntoGrid)
    // Don't replace items with themselves
    if (!draggingIntoGrid && (dragIndex === hoverIndex)) {
      console.log("Don't replace items with themselves")
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      console.log('downwards')
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      console.log('upwards')
      return
    }

    console.log('dragIndex: ', dragIndex)
    console.log('hoverIndex: ', hoverIndex)
    // Time to actually perform the action
    props.moveFlag(dragIndex, hoverIndex, sourceDropped, draggingIntoGrid)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

function collectDrop (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

function collectDrag (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Flag extends Component {
  render () {
    const {
      id,
      index,
      country,
      dropped,
      flagStyle,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div
          style={flagStyle ? {...flagStyle, opacity} : { ...style, opacity }}
          onClick={() => this.props.selectFlag(index, id, country, dropped)}
        >
          <ReactCountryFlag
            code={country}
            style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
            svg
          />
        </div>
      )
    )
  }
}

const dropTargetHOC = DropTarget(ItemTypes.FLAG, flagTarget, collectDrop)
const dragSourceHOC = DragSource(ItemTypes.FLAG, flagSource, collectDrag)

export default dropTargetHOC(dragSourceHOC(Flag))
