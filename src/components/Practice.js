import React, { Component } from 'react'
import GivenPassword from './GivenPassword'
import Password from './Password'

class Practice extends Component {

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
            />
          </div>
      )
  }
}

export default Practice
