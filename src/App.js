import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
import data from './components/Data'
// import { emailPassword, bankPassword, shoppingPassword } from './components/Passwords'

const random = []

console.log(random)
class App extends Component {
  constructor (props) {
    super(props)

    const emailPassword = this.generatePassword(4)

    this.state = {
      emailPassword
    }
  }

  generatePassword (length) {
    const random = []
    for (let i = 0; i < length; i++) {
      random.push(data[Math.floor(Math.random() * data.length)])
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
