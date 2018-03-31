import React, { Component } from 'react'
import GivenPassword from './GivenPassword'
import Password from './Password'

class Test extends Component {

  render () {
    const {type, pw, index} = this.props
      return (
          <div style={{height: '100%', width: '100%'}}>
            <Password
              type={type}
              password={pw}
              test={true}
            />
          </div>
      )
  }
}

export default Test
