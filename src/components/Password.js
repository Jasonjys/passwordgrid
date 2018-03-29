import React, { Component } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import Grid from './Grid'
import IconsContainer from './IconsContainer'
import data from './Data'

class Password extends Component {
  constructor (props) {
    super(props)
    this.moveIcon = this.moveIcon.bind(this)
    this.selectIcon = this.selectIcon.bind(this)
    this.dropIcon = this.dropIcon.bind(this)
    this.comparePassword = this.comparePassword.bind(this)
    this.clearGrid = this.clearGrid.bind(this)

    const icons = this.generateIcons()
    const droppedIcons = new Array(4).fill(null)
    const actions = []

    this.state = {
      actions,
      droppedIcons,
      ...icons
    }
  }

  generateIcons () {
    return {
      country: [...data.slice(0, 10)],
      landmark: [...data.slice(10, 20)],
      food: [...data.slice(20, 30)],
      animal: [...data.slice(30, 40)]
    }
  }

  selectIcon (selectedicon) {
    this.setState({message: ''})
    const {index, id, icon, category, dropped} = selectedicon
    const {actions, droppedIcons} = this.state
    if (!droppedIcons.includes(null) && !dropped) {
      return
    }

    if (dropped) {
      const oldIconStatus = {...actions[actions.length - 1]}

      this.setState({
        actions: [...actions.slice(0, actions.length - 1)],
        [category]: [
          ...this.state[category].slice(0, oldIconStatus.index),
          {id, icon, category},
          ...this.state[category].slice(oldIconStatus.index, this.state[category].length)
        ],
        droppedIcons: [
          ...droppedIcons.slice(0, index),
          null,
          ...droppedIcons.slice(index + 1, droppedIcons.length)
        ]
      })
    } else {
      const nullIndex = droppedIcons.findIndex((item) => {
        return !item
      })

      this.setState({
        [category]: [
          ...this.state[category].slice(0, index),
          ...this.state[category].slice(index + 1, this.state[category].length)
        ],
        droppedIcons: [
          ...droppedIcons.slice(0, nullIndex),
          {id, icon, category},
          ...droppedIcons.slice(nullIndex + 1, droppedIcons.length)
        ],
        actions: [...actions, selectedicon]
      })
    }
  }

  moveIcon (category, dragIndex, hoverIndex, sourceDropped, draggingIntoGrid) {
    this.setState({message: ''})
    const { droppedIcons } = this.state
    let dragIcon = sourceDropped ? droppedIcons[dragIndex] : this.state[category][dragIndex]

    if (sourceDropped && !draggingIntoGrid) {
      this.setState(
        update(this.state, {
          droppedIcons: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragIcon]]
          }
        })
      )
    }

    if (!sourceDropped && !draggingIntoGrid) {
      this.setState(
        update(this.state, {
          [category]: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragIcon]]
          }
        })
      )
    }
  }

  dropIcon (index, icon) {
    this.setState({message: ''})
    const {id, dropped, category} = icon
    const { actions, droppedIcons } = this.state

    if (dropped && droppedIcons[index]) {
      return
    }

    // move icon to empty square(within grid)
    if (dropped && !droppedIcons[index]) {
      const newDroppedIcons = droppedIcons.slice()
      newDroppedIcons[icon.index] = null
      newDroppedIcons[index] = {...droppedIcons[icon.index]}
      this.setState({droppedIcons: newDroppedIcons})
    }

    // drop icon to empty square
    if (!dropped && !droppedIcons[index]) {
      const draggingIcon = this.state[category].find((element) => {
        return element.id === id
      })
      this.setState({
        actions: [...actions, icon],
        [category]: this.state[category].filter((item) => {
          return item.id !== id
        }),
        droppedIcons: droppedIcons.map((element, i) => {
          if (i === index) {
            return {...draggingIcon}
          }
          return element
        })
      })
    }
  }

  comparePassword (password) {
    const { droppedIcons } = this.state

    let identical = true
    droppedIcons.forEach((icon, i) => {
      if (!_.isEqual(icon, password[i])) {
        identical = false
      }
    })

    if (password.length === droppedIcons.length && identical) {
      this.setState({message: 'Success'})
    } else {
      this.setState({message: 'Wrong Password'})
    }
  }

  clearGrid () {
    this.setState({
      message: '',
      droppedIcons: new Array(4).fill(null),
      country: [...data.slice(0, 10)],
      landmark: [...data.slice(10, 20)],
      food: [...data.slice(20, 30)],
      animal: [...data.slice(30, 40)]
    })
  }

  render () {
    const { country, landmark, food, animal, droppedIcons, message } = this.state

    return (
      <div style={{maxHeight: '80%', width: '100%'}}>
        <IconsContainer
          icons={country}
          category={'country'}
          moveIcon={this.moveIcon}
          selectIcon={this.selectIcon}
        />
        <IconsContainer
          icons={landmark}
          category={'landmark'}
          moveIcon={this.moveIcon}
          selectIcon={this.selectIcon}
        />
        <IconsContainer
          icons={food}
          category={'food'}
          moveIcon={this.moveIcon}
          selectIcon={this.selectIcon}
        />
        <IconsContainer
          icons={animal}
          category={'animal'}
          moveIcon={this.moveIcon}
          selectIcon={this.selectIcon}
        />
        <Grid
          droppedIcons={droppedIcons}
          moveIcon={this.moveIcon}
          selectIcon={this.selectIcon}
          onDrop={this.dropIcon}
        />
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {message ? <div style={{marginTop: 10}}>{message}</div> : null}
          <div style={{display: 'flex', width: '100%', justifyContent: 'center', margin: 10}}>
            <button
              style={{width: 100}}
              onClick={() => this.comparePassword(this.props.password)}
            >
              Submit
            </button>
            <button
              style={{width: 100}}
              onClick={this.clearGrid}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Password
