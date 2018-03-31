import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
import Login from './components/Login'
import data from './components/Data'

class App extends Component {
  constructor (props) {
    super(props)

    this.chooseUniquePassword = this.chooseUniquePassword.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
    this.handlePreviousButton = this.handlePreviousButton.bind(this)
    this.handleGenerateNew = this.handleGenerateNew.bind(this)

    const emailPassword = this.generatePassword(4)
    const bankPassword = this.generatePassword(4)
    const shoppingPassword = this.generatePassword(4)
    const login = false

    this.state = {
      login,
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

  render () {
    const {index, passwordArray, login} = this.state
    const {type, pw} = passwordArray[index]
    if (login) {
      return (
        <div style={{height: '100%', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <GivenPassword
              passwordType={type}
              password={pw}
            />
            <div>
              <button
                disabled={index === 0}
                onClick={() => this.handlePreviousButton()}
              >
                  Previous password
              </button>
              <button onClick={() => this.handleGenerateNew(index, type)}>
                  Generate new password
              </button>
              <button
                disabled={index === passwordArray.length - 1}
                onClick={() => this.handleNextButton(type)}
              >
                 Next password
              </button>
            </div>
          </div>
          <Password
            type={type}
            password={pw}
          />
        </div>
      )
    } else {
      return <Login handleLogin={() => this.setState({login: true})} />
    }
  }
}

export default DragDropContext(HTML5Backend)(App)
