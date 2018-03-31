import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Login from './components/Login'
import data from './components/Data'
import Practice from './components/Practice'
import Test from './components/Test'
import EndScreen from './components/EndScreen'

class App extends Component {
  constructor (props) {
    super(props)

    this.chooseUniquePassword = this.chooseUniquePassword.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
    this.handlePreviousButton = this.handlePreviousButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleGenerateNew = this.handleGenerateNew.bind(this)
    this.handleGoToTest = this.handleGoToTest.bind(this)
    this.checkFinish = this.checkFinish.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    const emailPassword = this.generatePassword(4)
    const bankPassword = this.generatePassword(4)
    const shoppingPassword = this.generatePassword(4)
    const login = false
    const username = ''

    this.state = {
      login,
      username,
      index: 0,
      finish: false,
      practiceTime: 0,
      practice: true,
      testStartTime: 0,
      passwordArray: [
        {pw: emailPassword, type: 'email'},
        {pw: bankPassword, type: 'banking'},
        {pw: shoppingPassword, type: 'shopping'}
      ]
    }
  }

  chooseUniquePassword (elm, array, length) {
    while (array.includes(elm) || !elm) {
      elm = data[Math.floor(Math.random() * data.length)]
    }
    return elm
  }

  generatePassword (length) {
    const random = []
    let randomIcon
    for (let i = 0; i < length; i++) {
      random.push(this.chooseUniquePassword(randomIcon, random, length))
    }
    return random
  }

  handlePreviousButton () {
    this.setState({index: this.state.index - 1})
  }

  handleNextButton () {
    this.setState({index: this.state.index + 1})
  }

  handleGenerateNew (index, type) {
    const {passwordArray} = this.state
    this.setState({
      passwordArray: [
        ...passwordArray.slice(0, index),
        {pw: this.generatePassword(4), type},
        ...passwordArray.slice(index + 1, passwordArray.length)
      ]
    })
  }

  handleGoToTest (time) {
    this.setState({
      practice: false,
      practiceTime: time,
      testStartTime: Date.now()
    })
  }

  checkFinish (done) {
    this.setState({finish: done})
  }

  handleLogin (username) {
    this.setState({
      username,
      login: true
    })
  }

  render () {
    const {index, passwordArray, login, practice, testStartTime, finish, username} = this.state
    const {type, pw} = passwordArray[index]

    if (login) {
      if (practice) {
        return (
          <Practice
            pw={pw}
            type={type}
            index={index}
            user={username}
            nextButtonFunc={this.handleNextButton}
            previousButtonFunc={this.handlePreviousButton}
            newPasswordFunc={this.handleGenerateNew}
            goToTestFunc={this.handleGoToTest}
            start={Date.now()}
          />
        )
      } else {
        if (finish) {
          return <EndScreen />
        } else {
          return (
            <Test
              pw={pw}
              user={username}
              type={type}
              index={index}
              start={testStartTime}
              nextButtonFunc={this.handleNextButton}
              checkFinish={this.checkFinish}
              />
          )
        }
      }
    } else {
      return <Login handleLogin={this.handleLogin} />
    }
  }
}

export default DragDropContext(HTML5Backend)(App)
