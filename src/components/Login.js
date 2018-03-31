import React, { Component } from 'react'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uid: ''
    }
  }

  render () {
    return (
      <div style={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        userID:
        <input
          type='text'
          name='userId'
          onChange={(text) => this.setState({uid: text})}
        />
        <button onClick={() => this.props.handleLogin()}>
          Login
        </button>
      </div>
    )
  }
}

export default Login
