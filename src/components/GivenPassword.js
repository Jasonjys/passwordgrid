/*
    This component is used as the grid containing the given passwords in the password practice session.
    The type of the passwords, the given passwords, and functions of switching passwords and generating new
  passwords are all passed to this component as props. Therefore, the buttons that allow users to switch between
  different passwords and generate new passwords are rendered in this component.
    This component also renders a toggle component, allowing users to hide or show the given password.
    If the given passwords is shown, this component will render the grid component with the given icons that passed
  by its parent.
*/
import React, { Component } from 'react'
import Grid from './Grid'
import RaisedButton from 'material-ui/RaisedButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Toggle from 'material-ui/Toggle'
import generateHint from './StoryHelper'

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
    this.renderGrid = this.renderGrid.bind(this)

    this.state = {
      hide: false
    }
  }

  renderGrid () {
    const {passwordType, icons} = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Grid
          fixed
          passwordType={passwordType}
          icons={icons}
        />
        <div style={{fontSize: 11, textAlign: 'center', height: 25, width: 220}}>
          Hint: {generateHint(icons, passwordType)}
        </div>
      </div>
    )
  }

  render () {
    const { hide } = this.state
    const { passwordType, switchPassword, generateNew } = this.props
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
        {!hide ? this.renderGrid() : null}
      </div>
    )
  }
}

export default GivenPassword
