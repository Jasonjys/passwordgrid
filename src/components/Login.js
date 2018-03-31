import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      text: '',
      error: false
    }
  }

  handleSubmit () {
    const { text } = this.state
    if (!this.state.text) {
      this.setState({error: true})
    } else {
      this.setState({error: false})
      this.props.handleLogin(text)
    }
  }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{fontSize: 65, padding: 30}}>PASSWORD GRID</div>
        <div>Please Enter Your Name Below:</div>
        <TextField
          style={{height: 50}}
          hintText='First Name, Last Name'
          errorText={this.state.error ? 'This field is required' : ''}
          onChange={(evt, text) => this.setState({text})}
        />
        <RaisedButton
          style={{marginTop: 20}}
          backgroundColor='#2ab6f7' label='START!' labelColor='#ffffff'
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Login
