import React, { Component } from 'react'
import Password from './Password'

class Test extends Component {
  constructor (props) {
    super(props)
    this.calculateTime = this.calculateTime.bind(this)
    
    this.state = {
      start: Date.now()
    }
  }

  calculateTime () {
    var elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    return (elapsed / 10).toFixed(1)
  }

  render () {
    const {type, pw, user, nextButtonFunc, checkFinish} = this.props
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test
          user={user}
          pwType={type}
          password={pw}
          calculateTime={this.calculateTime}
          nextButtonFunc={nextButtonFunc}
          checkFinish={checkFinish}
        />
      </div>
    )
  }
}

export default Test
