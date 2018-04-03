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
      guideDialogOpen: true,
      testDialogOpen: false
    }
  }

  testStart () {
    const elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    this.props.goToTestFunc((elapsed / 10).toFixed(1))
  }

  render () {
    const {type, pw, user, switchPassword, generateNew} = this.props
    const {testDialogOpen, guideDialogOpen} = this.state

    const testDialogActions = [
      <FlatButton
        primary
        label='Cancel'
        onClick={() => this.setState({testDialogOpen: false})}
      />,
      <FlatButton
        primary
        label='Go to test'
        onClick={() => this.testStart()}
      />
    ]
    const GuideDialogActions = [
      <FlatButton
        primary
        label='Ok'
        onClick={() => this.setState({guideDialogOpen: false})}
      />
    ]
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Dialog
          actions={testDialogActions}
          modal={false}
          open={testDialogOpen}
          onRequestClose={() => this.setState({testDialogOpen: false})}
        >
          You cannot view your passwords during the test. Are you sure you want to proceed?
        </Dialog>
        <Dialog
          title='Guide'
          actions={GuideDialogActions}
          modal={false}
          open={guideDialogOpen}
          onRequestClose={() => this.setState({guideDialogOpen: false})}
        >
          <p style={{margin: 5}}>You are given three sets of passwords: email, banking, and shopping. Please try to memorize them.</p>
          <p style={{margin: 5}}>Proceed to the test once you memorized them by clicking 'I AM DONE PRACTICING, TAKE ME TO TEST'.</p>
        </Dialog>
        <Password
          test={false}
          user={user}
          pwType={type}
          password={pw}
          testStart={this.testStart}
          switchPassword={switchPassword}
          generateNew={generateNew}
        />
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <RaisedButton
            label='I am done practicing, take me to test!'
            style={{margin: 5}}
            labelColor='#ffffff'
            onClick={() => this.setState({testDialogOpen: true})}
            labelStyle={{fontSize: 15, fontWeight: 500}}
            backgroundColor='#88bc5e'
          />
        </div>
      </div>
    )
  }
}

export default Practice
