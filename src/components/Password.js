import React, { Component } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import Grid from './Grid'
import IconsContainer from './IconsContainer'
import data from './Data'
import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
  margin: 5
}

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
      testTime: 0,
      submitEnabled: true,
      nextEnabled: false,
      ...icons
    }
  }

  componentDidUpdate ({type}) {
    if (type !== this.props.type) {
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

  handleSubmit (password) {
    if(this.comparePassword(password)){
      this.setState({
        nextEnabled: true,
        submitEnabled: false
      })
      if(this.props.type === 'shopping'){
        this.setState({done: true})
      }
    } else {
      if(this.state.attempts === 2){
        this.setState({
          attempts: 0,
          submitEnabled: false,
          nextEnabled: true
        })
        if(this.props.type === 'shopping'){
          this.setState({
            testTime: this.props.totalTime})
          this.props.checkFinish(true)
        }
      }
    }
  }

  comparePassword (password) {
    const { droppedIcons, attempts } = this.state

    //this.setState({attempts: this.state.attempts + 1})
    let identical = true
    droppedIcons.forEach((icon, i) => {
      if (!_.isEqual(icon, password[i])) {
        identical = false
      }
    })

    if (password.length === droppedIcons.length && identical) {
      this.setState({message: 'Success!!'})
      return true
    } else {
      if(this.props.test){
        this.setState({
          attempts: attempts + 1,
          message: `Wrong Password! Remaining attempts: ${2 - attempts}`
        })
      } else {
        this.setState({message: 'Wrong Password'})
      }
      return false
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
  // componentDidMount (){
  //   this.timer = setInterval(this.calculateTime, 50)
  // }

  // calculateTime = () => {
  //   this.setState({time: ((new Date()-this.props.start)/10).toFixed(1)})
  // }

  generateButtons () {
    const {submitEnabled, nextEnabled} = this.state
    const {password, test, type, comparePassword, goToTest, nextButtonFunc} = this.props
    if(!test){
      return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <RaisedButton 
          label="Submit"
          style={buttonStyle}
          backgroundColor='#32c3e0'
          labelColor='#ffffff'
          labelStyle={{fontSize: 15, fontWeight: 500}}
          onClick={() => this.comparePassword(password)}/>
        <RaisedButton 
          label="Clear"
          style={buttonStyle}
          backgroundColor='#f94d89'
          labelColor='#ffffff'
          labelStyle={{fontSize: 15, fontWeight: 500}}
          onClick={this.clearGrid}/>
        <RaisedButton 
          label="I am done practicing, take me to test!"
          style={buttonStyle}
          labelColor='#ffffff'
          onClick={() => goToTest()}
          labelStyle={{fontSize: 15, fontWeight: 500}}
          backgroundColor='#88bc5e'/>
      </div>)
    } else {
      return ( 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <RaisedButton 
            label="SUBMIT"
            style={{...buttonStyle, width: 110}}
            labelColor='#ffffff'
            disabled={!submitEnabled}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={()=>{this.handleSubmit(password)}}
            backgroundColor='#88bc5e'
          />
          <RaisedButton 
            label="Clear"
            style={{...buttonStyle, width: 110}}
            backgroundColor='#f94d89'
            labelColor='#ffffff'
            disabled={!submitEnabled}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            onClick={this.clearGrid}
          />
          <RaisedButton 
            label="NEXT PASSWORD"
            style={{...buttonStyle}}
            backgroundColor='#32c3e0'
            labelColor='#ffffff'
            disabled={!nextEnabled || (this.props.type === 'shopping')}
            onClick={() => nextButtonFunc()}
            labelStyle={{fontSize: 15, fontWeight: 500}}
          />
         </div>
      )
    }
  }


  render () {
    const { country, landmark, food, animal, droppedIcons, message, done } = this.state
    // var elapsed = Math.round(this.state.time / 10);
    // var seconds = (elapsed / 10).toFixed(1);
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
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{flexDirection: 'column'}}>
            <div style={{width: 400, textAlign: 'center'}}>
              Please {this.props.test? 'enter': 'practice'} your {this.props.type} password here:
            </div>
            <Grid
              droppedIcons={droppedIcons}
              moveIcon={this.moveIcon}
              selectIcon={this.selectIcon}
              onDrop={this.dropIcon}
            />
            <div 
            style={{
              textAlign: 'center',
              fontSize: 12,
              padding: 5,
              height: 10,
              color: message==='Success!!'? '#00a023': 'red'}}>{message}</div>
          </div>
          {this.generateButtons()}
        </div>
      </div>
    )
  }
}

export default Password
