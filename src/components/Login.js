import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uid: '',
      error: false,
    }
  }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <div><p style={{fontSize: 65}}> PASSWORD GRID</p></div>
        <div>Please Enter Your Name Below:</div>
        <TextField
          style={{height: 50}}
          hintText="First Name, Last Name"
          errorText={this.state.error? "This field is required": ''}
          onChange={(text) => this.setState({uid: text})}
        />
        <RaisedButton onClick={() => {
          if(!this.state.uid){
            this.setState({error: true})
          }else{
            this.setState({error: false})
            this.props.handleLogin()
          }
        }}
          style={{marginTop: 20}}
          backgroundColor='#2ab6f7' label='START!' labelColor='white'/>
      </div>
    )
  }
}

export default Login
