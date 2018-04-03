/* 
    This component is used to render the practice session, allowing user to practice three set of password, it will
  render the Password component.
    The testStart() function is used to calculate the time that user spend on practicing.
*/
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
      </div>
    )
  }
}

export default Practice
