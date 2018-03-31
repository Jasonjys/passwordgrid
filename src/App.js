import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Login from './components/Login'
import data from './components/Data'
import Practice from './components/Practice'

class App extends Component {
  constructor (props) {
    super(props)

    this.chooseUniquePassword = this.chooseUniquePassword.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
    this.handlePreviousButton = this.handlePreviousButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleGenerateNew = this.handleGenerateNew.bind(this)
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
      passwordArray: [
        {pw: emailPassword, type: 'email'},
        {pw: bankPassword, type: 'bank'},
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

  handleLogin (username) {
    this.setState({
      username,
      login: true
    })
  }

  render () {
    const {index, passwordArray, login} = this.state
    const {type, pw} = passwordArray[index]

    if (login) {
      return (
        <Practice
          type={type}
          pw={pw}
          index={index}
          nextButtonFunc={this.handleNextButton}
          previousButtonFunc={this.handlePreviousButton}
          newPasswordFunc={this.handleGenerateNew}
        />
      )
    } else {
      return <Login handleLogin={this.handleLogin} />
    }
  }
}

export default DragDropContext(HTML5Backend)(App)
