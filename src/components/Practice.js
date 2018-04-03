import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Password from './Password'

class Practice extends Component {
  constructor (props) {
    super(props)
    this.testStart = this.testStart.bind(this)
    this.state = {
      start: Date.now(),
      dialogOpen: false
    }
  }

  testStart () {
    const elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    this.props.goToTestFunc((elapsed / 10).toFixed(1))
  }

  render () {
    const {type, pw, user, switchPassword, generateNew} = this.props
    const {dialogOpen} = this.state

    const actions = [
      <FlatButton
        primary
        label='Cancel'
        onClick={() => this.setState({dialogOpen: false})}
      />,
      <FlatButton
        primary
        label='Go to test'
        onClick={() => this.testStart()}
      />
    ]
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test={false}
          user={user}
          pwType={type}
          password={pw}
          testStart={this.testStart}
          switchPassword={switchPassword}
          generateNew={generateNew}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={dialogOpen}
          onRequestClose={() => this.setState({dialogOpen: false})}
        >
          You cannot view your passwords during the test. Are you sure you want to proceed?
        </Dialog>
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <RaisedButton
            label='I am done practicing, take me to test!'
            style={{margin: 5}}
            labelColor='#ffffff'
            onClick={() => this.setState({dialogOpen: true})}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            backgroundColor='#88bc5e'
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '0px 30px'}}>
          <h3 style={{marginTop: 10, marginBottom: 5}}>Guide:</h3>
          <p style={{margin: 0}}>You are given three sets of passwords: email, banking, and shopping. Please try to memorize them.</p>
          <p style={{margin: 0}}>You can proceed to the test once you memorized them by clicking 'I AM DONE PRACTICING,
            TAKE ME TO THE TEST'.</p>
        </div>
      </div>
    )
  }
}

export default Practice
