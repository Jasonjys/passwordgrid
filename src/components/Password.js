import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import update from 'immutability-helper'
import Grid from './Grid'
import data from './Data'
import { firestore } from '../index'
import IconsContainer from './IconsContainer'
import GivenPassword from './GivenPassword'
import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
  margin: 5,
  width: 100
}

let actionCnt = 0

class Password extends Component {
  constructor (props) {
    super(props)
    this.moveIcon = this.moveIcon.bind(this)
    this.selectIcon = this.selectIcon.bind(this)
    this.dropIcon = this.dropIcon.bind(this)
    this.comparePassword = this.comparePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearGrid = this.clearGrid.bind(this)
    this.generateButtons = this.generateButtons.bind(this)

    const icons = this.generateIcons()
    const droppedIcons = new Array(4).fill(null)
    const actions = []

    this.state = {
      actions,
      droppedIcons,
      attempts: 0,
      submitEnabled: true,
      nextEnabled: false,
      lastAttempt: false,
      ...icons
    }
  }

  componentDidUpdate ({pwType}) {
    if (pwType !== this.props.pwType) {
      actionCnt = 0
      this.clearGrid()
      this.setState({
        attempts: 0,
        nextEnabled: false,
        submitEnabled: true
      })
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
    const {user, test} = this.props
    const type = test ? 'test' : 'practice'

    if (!droppedIcons.includes(null) && !dropped) {
      return
    }

    if (dropped) {
      const oldIconStatus = {...actions[actions.length - 1]}

      firestore.collection(user).doc(type).collection('actions').add({
        actionCnt: ++actionCnt,
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        icon,
        action: `remove icon at index${index}`
      })

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

      firestore.collection(user).doc(type).collection('actions').add({
        actionCnt: ++actionCnt,
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        icon,
        action: `add icon by clicking at index${nullIndex}`
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
  }

  dropIcon (index, icon) {
    this.setState({message: ''})
    const {id, dropped, category} = icon
    const { actions, droppedIcons } = this.state
    const {user, test} = this.props
    const type = test ? 'test' : 'practice'

    if (dropped && droppedIcons[index]) {
      return
    }

    // move icon to empty square(within grid)
    if (dropped && !droppedIcons[index]) {
      const newDroppedIcons = droppedIcons.slice()
      newDroppedIcons[icon.index] = null
      newDroppedIcons[index] = {...droppedIcons[icon.index]}
      this.setState({droppedIcons: newDroppedIcons})

      firestore.collection(user).doc(type).collection('actions').add({
        actionCnt: ++actionCnt,
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        icon: icon.icon,
        action: `move icon at index${icon.index} to an empty square at index${index}`
      })
    }

    // drop icon to empty square
    if (!dropped && !droppedIcons[index]) {
      const draggingIcon = this.state[category].find((element) => {
        return element.id === id
      })

      firestore.collection(user).doc(type).collection('actions').add({
        actionCnt: ++actionCnt,
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        icon: icon.icon,
        action: `add icon by drag and drop at index${index}`
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

  handleSubmit (password) {
    const {isLastPW, user, test, pwType} = this.props
    const {attempts} = this.state
    const type = test ? 'test' : 'practice'
    const isCorrect = this.comparePassword(password)

    if (isCorrect) {
      this.setState({
        nextEnabled: true,
        submitEnabled: false,
        message: 'Success!!'
      })
      if (isLastPW) {
        this.setState({lastAttempt: true})
      }
    } else {
      if (attempts === 2) {
        if (isLastPW) {
          this.setState({lastAttempt: true})
        }
        this.setState({
          attempts: 0,
          submitEnabled: false,
          nextEnabled: true
        })
      }
      if (test) {
        this.setState({
          attempts: attempts + 1,
          message: `Wrong Password! Remaining attempts: ${2 - attempts}`
        })
      } else {
        this.setState({message: 'Wrong Password'})
      }
    }

    firestore.collection(user).doc(type).update({
      [pwType]: `${isCorrect ? 'success' : 'failure'}`,
      [`${pwType}Attempts`]: attempts + 1
    })

    firestore.collection(user).doc(type).collection('actions').add({
      actionCnt: ++actionCnt,
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      action: `submit ${isCorrect ? 'correct' : 'wrong'} ${pwType} password`
    })
  }

  comparePassword (password) {
    const {droppedIcons} = this.state
    let identical = true
    droppedIcons.forEach((icon, i) => {
      if (!_.isEqual(icon, password[i])) {
        identical = false
      }
    })
    return password.length === droppedIcons.length && identical
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

  generateButtons () {
    const {submitEnabled, nextEnabled, lastAttempt} = this.state
    const {password, test, testOver, nextButtonFunc} = this.props
    if (!test) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <RaisedButton
            primary
            label='Validate'
            style={buttonStyle}
            buttonStyle={{width: 100}}
            labelColor='#ffffff'
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={() => this.handleSubmit(password)}
          />
          <RaisedButton
            secondary
            label='Clear'
            style={buttonStyle}
            buttonStyle={{width: 100}}
            backgroundColor='#f94d89'
            labelColor='#ffffff'
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={this.clearGrid}
          />
        </div>
      )
    } else {
      if (lastAttempt) {
        return (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <RaisedButton
              primary
              label='End Test!'
              labelColor='#ffffff'
              labelStyle={{fontSize: 15, fontWeight: 500}}
              onClick={() => testOver()}
            />
          </div>
        )
      }
      return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <RaisedButton
            primary
            label='SUBMIT'
            style={{...buttonStyle}}
            labelColor='#ffffff'
            disabled={!submitEnabled}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={() => this.handleSubmit(password)}
          />
          <RaisedButton
            secondary
            label='Clear'
            style={{...buttonStyle}}
            labelColor='#ffffff'
            disabled={!submitEnabled}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={this.clearGrid}
          />
          <RaisedButton
            label='NEXT PASSWORD'
            style={{margin: 5}}
            backgroundColor='#88bc5e'
            labelColor='#ffffff'
            disabled={!nextEnabled}
            onClick={() => nextButtonFunc()}
            labelStyle={{fontSize: 15, fontWeight: 500}}
          />
        </div>
      )
    }
  }

  render () {
    const {country, landmark, food, animal, droppedIcons, message} = this.state
    const {test, pwType, password, switchPassword, generateNew} = this.props
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
        <div style={{display: 'flex', width: '100%', padding: 15, justifyContent: 'center'}}>
          {!test
            ? <GivenPassword
              passwordType={pwType}
              icons={password}
              switchPassword={switchPassword}
              generateNew={generateNew}
              />
            : null
          }
          <div style={{flexDirection: 'column'}}>
            <Grid
              fixed={false}
              icons={droppedIcons}
              passwordType={pwType}
              moveIcon={this.moveIcon}
              selectIcon={this.selectIcon}
              onDrop={this.dropIcon}
            />
            <div
              style={{
                textAlign: 'center',
                fontSize: 12,
                height: 10,
                color: message === 'Success!!' ? '#00a023' : 'red'
              }}
            >
              {message}
            </div>
          </div>
          {this.generateButtons()}
        </div>
      </div>
    )
  }
}

export default Password
