import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
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
    this.state = {
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
    this.setState({index: --this.state.index})
  }

  handleNextButton () {
    this.setState({index: ++this.state.index})
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
    const {index, passwordArray} = this.state
    const {type, pw} = passwordArray[index]
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <GivenPassword
            passwordType={type}
            password={pw}
          />
          <div style={{flexDirection: 'row'}}>
            <button
              disabled={type === 'email'}
              onClick={() => this.handlePreviousButton()}>
                Previous password
            </button>
            <button
              onClick={() => this.handleGenerateNew(index, type)}>
                Generate new password
            </button>
            <button
              disabled={type === 'shopping'}
              onClick={() => this.handleNextButton(type)}>
               Next password
            </button>
          </div>
        </div>
        <Password
          type={type}
          password={pw}
          start={Date.now()}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
