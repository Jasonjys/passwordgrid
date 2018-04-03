/* 
    This component is used for displaying the login page, as the first page of the whole system. Which allows users
  to enter their username and start practicing passwords. It only contains two components: a text input field and
  a button.
    The handleSubmit function is called when the users click on the 'START button, it will allow user to proceed 
  to the password practice page.
*/
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
        <div>Please enter your name below:</div>
        <TextField
          style={{height: 50}}
          hintText='First Name, Last Name'
          errorText={this.state.error ? 'This field is required' : ''}
          onChange={(evt, text) => this.setState({text})}
        />
        <RaisedButton
          primary
          label='START!'
          style={{marginTop: 20}}
          labelColor='#ffffff'
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Login
