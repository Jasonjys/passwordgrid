import React, { Component } from 'react'
import Square from './Square'
import Icon from './Icon'

const defaultStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  height: 180,
  width: 180,
  margin: 'auto'
}

class Grid extends Component {
  renderSquare (i, icon) {
    const piece = icon
      ? <Icon
        dropped
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
    const { droppedIcons, passwordType, style } = this.props
    const squares = []

    droppedIcons.forEach((droppedIcon, index) => {
      squares.push(this.renderSquare(index, droppedIcon))
    })
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '15%', marginTop: 8}}>
        {passwordType ? <div style={{padding: 5}}>{passwordType}</div> : null}
        <div style={style || defaultStyle}>
          {squares}
        </div>
      </div>
    )
  }
}

export default Grid
