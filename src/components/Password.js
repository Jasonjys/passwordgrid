import React, { Component } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import Grid from './Grid'
import IconsContainer from './IconsContainer'
import data from './Data'

const buttonStyle = {
  width: 100,
  fontSize: 15,
  border: 'none',
  margin: 5,
  padding: 10,
  fontWeight: 600,
  backgroundColor: '#33dae0',
  color: 'white',
  borderRadius: 6,
  boxShadow: '2px 3px 3px 0px rgba(176,176,176,1)'
}

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
      time: this.props.start,
      ...icons
    }
  }

  componentDidUpdate ({type}) {
    if (type !== this.props.type) {
      this.clearGrid()
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
  // componentDidMount () {
  //   this.timer = setInterval(this.calculateTime, 50)
  // }

  // calculateTime () {
  //   this.setState({time: ((new Date() - this.props.start) / 10).toFixed(1)})
  // }

  render () {
    const { country, landmark, food, animal, droppedIcons, message } = this.state
    // var elapsed = Math.round(this.state.time / 10)
    // var seconds = (elapsed / 10).toFixed(1)
    return (
      <div style={{maxHeight: '80%', width: '100%'}}>
        {/* <div>{seconds}</div> */}
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
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{flexDirection: 'column'}}>
            <div>Please practice your {this.props.type} password here:</div>
            <Grid
              droppedIcons={droppedIcons}
              moveIcon={this.moveIcon}
              selectIcon={this.selectIcon}
              onDrop={this.dropIcon}
            />
            <div style={{textAlign: 'center', fontSize: 12, padding: 5, height: 10}}>{message}</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#32c3e0'
              }}
              onClick={() => this.comparePassword(this.props.password)}
            >
              Submit
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#f94d89'}}
              onClick={this.clearGrid}
            >
              Clear
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#88bc5e',
                width: 300
              }}
              onClick={this.clearGrid}
            >
              I am done practicing, take me to test!
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Password
