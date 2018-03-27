import React, { Component } from 'react'
import Grid from './Grid'

const passwordGridtStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  height: '45%',
  width: '45%'
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
