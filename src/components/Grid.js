/*
    Grid is a basic component in this system. It can either showing the given passwords with the 'fixed={true}' props,
  or showing the empty grid to allow user drag and drop icons into it with the 'fixed={false}' props.
*/

import React, { Component } from 'react'
import Square from './Square'
import Icon from './Icon'

const defaultStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  height: 160,
  width: 160
}

const textStyle = {
  textAlign: 'center',
  padding: 5,
  width: 250
}

class Grid extends Component {
  renderSquare (i, icon, fixed) {
    const piece = icon
      ? <Icon
        dropped
        fixed={fixed}
        index={i}
        key={icon.id}
        id={icon.id}
        icon={icon.icon}
        height={'70%'}
        width={'70%'}
        category={icon.category}
        moveIcon={this.props.moveIcon}
        selectIcon={this.props.selectIcon}
        />
      : null

    return (
      <div
        key={i}
        style={{width: '50%', height: '50%'}}
      >
        <Square onDrop={this.props.onDrop} index={i}>
          {piece}
        </Square>
      </div>
    )
  }

  render () {
    const { icons, passwordType, fixed } = this.props
    const squares = []

    icons.forEach((droppedIcon, index) => {
      squares.push(this.renderSquare(index, droppedIcon, fixed))
    })
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5}}>
        {fixed
          ? <div style={textStyle}>{`Given ${passwordType} password`}</div>
          : <div style={textStyle}>{`Enter ${passwordType.toUpperCase()} password here:`}</div>
        }
        <div style={defaultStyle}>
          {squares}
        </div>
      </div>
    )
  }
}

export default Grid
