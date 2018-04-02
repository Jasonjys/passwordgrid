import React, { Component } from 'react'
import Password from './Password'

class Practice extends Component {
  constructor (props) {
    super(props)
    this.calculateTime = this.calculateTime.bind(this)
    this.totalTime = this.totalTime.bind(this)
  }

  componentDidMount () {
    this.timer = setInterval(this.calculateTime, 50)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  calculateTime () {
    this.time = ((new Date() - this.props.start) / 10).toFixed(1)
  }

  totalTime () {
    var elapsed = Math.round(this.time / 10)
    return (elapsed / 10).toFixed(1)
  }

  render () {
    const {type, pw, user, goToTestFunc, switchPassword, generateNew} = this.props
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test={false}
          user={user}
          pwType={type}
          password={pw}
          goToTest={() => goToTestFunc(this.totalTime())}
          switchPassword={switchPassword}
          generateNew={generateNew}
        />
      </div>
    )
  }
}

export default Practice
