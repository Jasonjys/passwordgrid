import React, { Component } from 'react'
import GivenPassword from './GivenPassword'
import Password from './Password'

class Practice extends Component {
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
    const {type, pw, index} = this.props
      return (
          <div style={{height: '100%', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <GivenPassword
                passwordType={type}
                password={pw}
              />
              <div>
                <button
                  disabled={index === 0}
                  onClick={() => this.props.previousButtonFunc()}
                >
                    Previous password
                </button>
                <button onClick={() => this.props.newPasswordFunc(index, type)}>
                    Generate new password
                </button>
                <button
                  disabled={index === 2}
                  onClick={() => this.props.nextButtonFunc()}
                >
                  Next password
                </button>
              </div>
            </div>
            <Password
              type={type}
              password={pw}
              test={false}
              goToTest={()=>{
                  this.props.goToTestFunc(this.totalTime())
                }}
            />
          </div>
      )
  }
}

export default Practice
