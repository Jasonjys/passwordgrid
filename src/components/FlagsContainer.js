import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Flag from './Flag'

const style = {
  width: '100%',
  height: '30%',
  flexDirection: 'row',
  display: 'flex',
  flexWrap: 'wrap'
}

class FlagsContainer extends Component {
  constructor (props) {
    super(props)
    this.moveFlag = this.moveFlag.bind(this)
    this.state = {
      flags: [
        {
          id: 1,
          text: 'flag1'
        },
        {
          id: 2,
          text: 'flag2'
        },
        {
          id: 3,
          text: 'flag3'
        },
        {
          id: 4,
          text: 'flag4'
        },
        {
          id: 5,
          text: 'flag5'
        },
        {
          id: 6,
          text: 'flag6'
        },
        {
          id: 7,
          text: 'flag7'
        },
        {
          id: 8,
          text: 'flag8'
        },
        {
          id: 9,
          text: 'flag9'
        },
        {
          id: 10,
          text: 'flag10'
        }
      ]
    }
  }

  moveFlag(dragIndex, hoverIndex) {
    const { flags } = this.state
    const dragFlag = flags[dragIndex]

    this.setState(
      update(this.state, {
        flags: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragFlag]],
        },
      }),
    )
  }

  render() {
    const { flags } = this.state

    return (
      <div style={style}>
        {flags.map((flag, i) => (
          <Flag
            key={flag.id}
            index={i}
            id={flag.id}
            text={flag.text}
            moveFlag={this.moveFlag}
          />
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(FlagsContainer)
