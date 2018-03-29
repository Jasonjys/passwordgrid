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

    this.state = {
      emailPassword
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

  render () {
    const { emailPassword } = this.state

    return (
      <div style={{height: '100%', width: '100%'}}>
        <GivenPassword
          passwordType={'emailPassword'}
          password={emailPassword}
        />
        {/* <GivenPassword
            passwordType={'bankPassword'}
            password={bankPassword}
          />
          <GivenPassword
            passwordType={'shoppingPassword'}
            password={shoppingPassword}
          /> */}
        <Password
          type={'email'}
          password={emailPassword}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
