import React, { Component } from 'react'
import Grid from './Grid'
import RaisedButton from 'material-ui/RaisedButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Toggle from 'material-ui/Toggle'

const buttonStyle = {
  margin: 2.5
}

const passwordArray = [
  {type: 'email'},
  {type: 'banking'},
  {type: 'shopping'}
]

class GivenPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hide: false
    }
  }

  render () {
    const { hide } = this.state
    const { passwordType, icons, switchPassword, generateNew } = this.props
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'}}>
          {passwordArray.map((pw, i) => (
            <RaisedButton
              key={i}
              label={pw.type}
              labelColor='#ffffff'
              style={buttonStyle}
              backgroundColor='#32c3e0'
              onClick={() => switchPassword(pw.type)}
            />
          ))}
          <RaisedButton
            label='Regenerate'
            labelPosition='before'
            icon={<Refresh />}
            style={{...buttonStyle}}
            onClick={() => generateNew(passwordType)}
          />
          <Toggle
            label='Hide password'
            onToggle={() => this.setState({hide: !hide})}
          />
        </div>
        {!hide
          ? <Grid
            fixed
            passwordType={passwordType}
            icons={icons}
            />
          : null
        }
      </div>
    )
  }
}

export default GivenPassword
