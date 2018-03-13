import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import update from 'immutability-helper'
import HTML5Backend from 'react-dnd-html5-backend'
import Grid from './components/Grid'
import FlagsContainer from './components/FlagsContainer'

class App extends Component {
  constructor (props) {
    super(props)
    this.moveFlag = this.moveFlag.bind(this)
    this.selectFlag = this.selectFlag.bind(this)
    this.dropFlag = this.dropFlag.bind(this)

    const flags = this.generateFlags()
    const droppedFlags = new Array(9).fill(null)

    this.state = { flags, droppedFlags }
  }

  generateFlags () {
    const countries = ['Canada', 'China', 'America', 'Japan', 'UK', 'Brazil', 'Germany', 'France', 'Sweden', 'Korean']
    return countries.map((flag, index) => {
      return {id: index, text: flag}
    })
  }

  selectFlag (index, id, flag, dropped) {
    const {flags, droppedFlags} = this.state
    if (flags.length === 1 && !dropped) {
      return
    }

    if (dropped) {
      this.setState(
        update(this.state, {
          flags: {
            $push: [{id: id, text: flag}]
          },
          droppedFlags: {
            $splice: [[index, 1, null]]
          }
        })
      )
    } else {
      const nullIndex = droppedFlags.findIndex((item) => {
        return !item
      })
      this.setState({
        flags: [
          ...flags.slice(0, index),
          ...flags.slice(index + 1, flags.length)
        ],
        droppedFlags: [
          ...droppedFlags.slice(0, nullIndex),
          {id: id, text: flag},
          ...droppedFlags.slice(nullIndex + 1, droppedFlags.length)
        ]
      })
    }
  }

  moveFlag (dragIndex, hoverIndex, sourceDropped, draggingIntoGrid) {
    const { flags, droppedFlags } = this.state
    let dragFlag = sourceDropped ? droppedFlags[dragIndex] : flags[dragIndex]

    if (sourceDropped && !draggingIntoGrid) {
      this.setState(
        update(this.state, {
          droppedFlags: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragFlag]]
          }
        })
      )
    }

    if (!sourceDropped && !draggingIntoGrid) {
      this.setState(
        update(this.state, {
          flags: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragFlag]]
          }
        })
      )
    }
  }

  dropFlag (index, flag) {
    const { droppedFlags, flags } = this.state

    if (flag.dropped && droppedFlags[index]) {
      return
    }

    // move flag to empty square(within grid)
    if (flag.dropped && !droppedFlags[index]) {
      const newDroppedFlags = droppedFlags.slice()
      newDroppedFlags[flag.index] = null
      newDroppedFlags[index] = {...droppedFlags[flag.index]}
      this.setState({droppedFlags: newDroppedFlags})
    }

    // drop flag to empty square
    if (!flag.dropped && !droppedFlags[index]) {
      const draggingFlag = flags.find((element) => {
        return element.id === flag.id
      })

      this.setState({
        flags: flags.filter((item) => {
          return item.id !== flag.id
        }),
        droppedFlags: droppedFlags.map((element, i) => {
          if (i === index) {
            return {...draggingFlag}
          }
          return element
        })
      })
    }
  }

  render () {
    const { flags, droppedFlags } = this.state
    return (
      <div style={{height: '100%', width: '100%'}}>
        <FlagsContainer
          flags={flags}
          moveFlag={this.moveFlag}
          selectFlag={this.selectFlag}
        />
        <Grid
          droppedFlags={droppedFlags}
          moveFlag={this.moveFlag}
          selectFlag={this.selectFlag}
          onDrop={this.dropFlag}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
