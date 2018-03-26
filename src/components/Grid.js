import React, { Component } from 'react'
import Square from './Square'
import Icon from './Icon'

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
    const { droppedIcons } = this.props
    const squares = []

    droppedIcons.forEach((droppedIcon, index) => {
      squares.push(this.renderSquare(index, droppedIcon))
    })
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', height: '30%', width: '28%', margin: 'auto'}}>
        {squares}
      </div>
    )
  }
}

export default Grid
