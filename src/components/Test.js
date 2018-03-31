import React, { Component } from 'react'
import GivenPassword from './GivenPassword'
import Password from './Password'

class Test extends Component {
  constructor (props) {
    super(props)
    this.calculateTime = this.calculateTime.bind(this)
    this.totalTime = this.totalTime.bind(this)
    this.state = {
      time: 0
    }
  }
  componentDidMount () {
    this.timer = setInterval(this.calculateTime, 50)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  calculateTime () {
    this.setState({time: ((new Date()-this.props.start)/10).toFixed(1)})
  }

  totalTime () {
    var elapsed = Math.round(this.state.time / 10)
    return (elapsed / 10).toFixed(1)
  }

  render () {
    const {type, pw, index, nextButtonFunc, checkFinish} = this.props
      return (
          <div style={{height: '100%', width: '100%'}}>
            <Password
              type={type}
              password={pw}
              test={true}
              totalTime={this.totalTime()}
              nextButtonFunc={nextButtonFunc}
              checkFinish={checkFinish}
            />
          </div>
      )
  }
}

export default Test
