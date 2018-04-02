import React, { Component } from 'react'
import Password from './Password'

class Test extends Component {
  constructor (props) {
    super(props)
    this.testOver = this.testOver.bind(this)
    this.state = {
      start: Date.now()
    }
  }

  testOver () {
    const elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    this.props.testOver((elapsed / 10).toFixed(1))
  }

  render () {
    const {type, pw, user, nextButtonFunc} = this.props
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test
          user={user}
          pwType={type}
          password={pw}
          calculateTime={this.calculateTime}
          nextButtonFunc={nextButtonFunc}
          testOver={this.testOver}
        />
      </div>
    )
  }
}

export default Test
