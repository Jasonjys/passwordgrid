import React, { Component } from 'react'
import Grid from './Grid'
import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
  margin: 5
}

const passwordArray = [
  {type: 'email'},
  {type: 'banking'},
  {type: 'shopping'}
]

class GivenPassword extends Component {
  render () {
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
            label='generate new'
            labelColor='#ffffff'
            style={buttonStyle}
            backgroundColor='#f94d89'
            onClick={() => generateNew(passwordType)}
          />
        </div>
        <Grid
          fixed
          passwordType={passwordType}
          icons={icons}
        />
      </div>
    )
  }
}

export default GivenPassword
