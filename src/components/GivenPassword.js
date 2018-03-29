import React, { Component } from 'react'
import Grid from './Grid'

const passwordGridtStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '10%'
}

class GivenPassword extends Component {
  render () {
    const { passwordType, password } = this.props
    return (
      <Grid
        style={passwordGridtStyle}
        passwordType={passwordType}
        droppedIcons={password}
      />
    )
  }
}

export default GivenPassword
