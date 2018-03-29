import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import components from './svgs'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 5
}

const textStyle = {
  width: '100%',
  textAlign: 'center',
  flexWrap: 'wrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontSize: 10
}

const IconSource = {
  beginDrag ({id, index, icon, category, dropped}) {
    return {
      id: id,
      index: index,
      icon: icon,
      category: category,
      dropped: !!dropped
    }
  }
}

const iconTarget = {
  hover (props, monitor, component) {
    const draggingDroppedIcon = monitor.getItem().dropped
    const dragIndex = monitor.getItem().index
    console.log('draggingDropIcon: ', draggingDroppedIcon)

    const sourceDropped = props.dropped
    console.log('targetDropped: ', sourceDropped)
    const hoverIndex = props.index
    const draggingIntoGrid = !draggingDroppedIcon && sourceDropped

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
    if (props.moveIcon) {
      props.moveIcon(props.category, dragIndex, hoverIndex, sourceDropped, draggingIntoGrid)
    }
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const collectDrop = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Icon extends Component {
  render () {
    const {
      id,
      index,
      icon,
      height,
      width,
      dropped,
      category,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const SpecificIcon = components[icon]
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div
          style={{...style, opacity}}
          onClick={() => {
            if (this.props.selectIcon) {
              this.props.selectIcon({index, id, icon, category, dropped})
            }
          }}
        >
          <SpecificIcon style={{cursor: 'move'}} height={height} width={width} />
          <div style={textStyle}>{icon}</div>
        </div>
      )
    )
  }
}

const dropTargetHOC = DropTarget(ItemTypes.ICON, iconTarget, collectDrop)
const dragSourceHOC = DragSource(ItemTypes.ICON, IconSource, collectDrag)

export default dropTargetHOC(dragSourceHOC(Icon))
