import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
import data from './components/Data'

class App extends Component {
  constructor (props) {
    super(props)

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
  chooseUniquePassword(elm,array,length) {
    while(array.includes(elm)||!elm){
      elm = data[Math.floor(Math.random() * data.length)]
    }
      return elm
  }

  generatePassword (length) {
    const random = []
    let randomIcon
    for (let i = 0; i < length; i++) {
      random.push(this.chooseUniquePassword(randomIcon,random,length))
    }
    return random
  }

  handlePreviousButton = (currentType) =>{
   this.setState({index: --this.state.index})
  }

  handleNextButton = (currentType) =>{
    this.setState({index: ++this.state.index})
   }

  render () {
    const {index, passwordArray} = this.state
    return (
      
      <div style={{height: '100%', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <GivenPassword
            passwordType={passwordArray[index].type}
            password={passwordArray[index].pw}
          />
          <div style={{flexDirection: 'row'}}>
            <button
              disabled={passwordArray[index].type==='email'}
              onClick={() => this.handlePreviousButton(passwordArray[index].type)}>
                Previous password
            </button>
            <button
              disabled={passwordArray[index].type==='shopping'}
              onClick={() => this.handleNextButton(passwordArray[index].type)}>
               Next password
            </button>
          </div>
        </div>
        <Password
          type={passwordArray[index].type}
          password={passwordArray[index].pw}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
