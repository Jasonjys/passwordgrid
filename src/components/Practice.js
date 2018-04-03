import React, { Component } from 'react'
import Password from './Password'

class Practice extends Component {
  constructor (props) {
    super(props)
    this.testStart = this.testStart.bind(this)
    this.state = {
      start: Date.now()
    }
  }

  testStart () {
    const elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    this.props.goToTestFunc((elapsed / 10).toFixed(1))
  }

  render () {
    const {type, pw, user, switchPassword, generateNew} = this.props
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test={false}
          user={user}
          pwType={type}
          password={pw}
          testStart={this.testStart}
          switchPassword={switchPassword}
          generateNew={generateNew}
        />
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '0px 30px'}}>
          <h3 style={{marginTop: 10, marginBottom: 5}}>Guide:</h3>
          <p style={{margin: 0}}>You are given three sets of passwords: email, banking, and shopping.</p>
          <p style={{margin: 0}}>Please try to memorize them. You can proceed to the test once you memorized them by clicking 'I AM DONE PRACTICING,
            TAKE ME TO THE TEST'.</p>
          <h4 style={{marginTop: 10, marginBottom: 5}}>TIPS:</h4>
          <p style={{margin: 0}}>1. You can regenerate new password by clicking on the 'REGENERATE' button if you do not like the current given password.</p>
          <p style={{margin: 0}}>2. You can practice entering password by using the empty grid provided besides the given password.</p>
          <p style={{margin: 0}}>3. You can toggle to hide the given password to help you practise.</p>
        </div>
      </div>
    )
  }
}

export default Practice
