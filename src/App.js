import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
import Login from './components/Login'
import data from './components/Data'
import Practice from './components/Practice'
import Test from './components/Test'

class App extends Component {
  constructor (props) {
    super(props)

    this.chooseUniquePassword = this.chooseUniquePassword.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
    this.handlePreviousButton = this.handlePreviousButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleGenerateNew = this.handleGenerateNew.bind(this)
    this.handleGoToTest = this.handleGoToTest.bind(this)

    const emailPassword = this.generatePassword(4)
    const bankPassword = this.generatePassword(4)
    const shoppingPassword = this.generatePassword(4)
    const login = false

    this.state = {
      login: true,
      index: 0,
      practice: true,
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

  handleGoToTest () {
    debugger
    this.setState({practice: false})
  }
  

  render () {
    const {index, passwordArray, login, practice} = this.state
    const {type, pw} = passwordArray[index]
    if (login) {
      if (practice){
        return (
          <Practice
            type={type}
            pw={pw}
            index={index}
            nextButtonFunc={this.handleNextButton}
            previousButtonFunc={this.handlePreviousButton}
            newPasswordFunc={this.handleGenerateNew}
            goToTestFunc={this.handleGoToTest}
          />
        )} else{
          <Test
            type={type}
            pw={pw}
            index={index}
          />
        }
    } else {
      return <Login handleLogin={() => this.setState({login: true})} />
    }
  }
}

export default DragDropContext(HTML5Backend)(App)
