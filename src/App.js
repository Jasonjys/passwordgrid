import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import GivenPassword from './components/GivenPassword'
import Password from './components/Password'
import { emailPassword, bankPassword, shoppingPassword } from './components/Passwords'

class App extends Component {
  render () {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div style={{display: 'flex', height: '10%'}}>
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
        </div>
        <Password
          password={emailPassword}
          type={'email'}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
