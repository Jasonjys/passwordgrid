import React, { Component } from 'react';
import Square from './Square'
import Flag from './Flag'

class Grid extends Component {
  constructor(props) {
    super(props)
    const squares = this.generateSquares()
    const flags = this.generateFlags()
    const droppedFlagCountries = []

    this.state = { squares, flags, droppedFlagCountries }
  }

  generateSquares() {
    let squares = []
    for(let i = 0; i < 9; i++) {
      squares.push({lastDroppedFlag: null})
    }
    return squares;
  }

  generateFlags() {
    let countries = ['Canada', 'China', 'America', 'Japan', 'UK', 'Basil', 'Germany', 'France', 'Sweden', 'Korean']
    return countries.map((flag) => {
      return {flag}
    })
  }

  renderSquare(i) {
    const x = i % 3;
    const y = Math.floor(i / 3);

    const {flagPosition} = this.props

    let flagX, flagY

    if(flagPosition.length) {
      [flagX, flagY] = flagPosition
    }

    const piece = ((flagX !== undefined) && (x === flagX && y === flagY)) ?
      <Flag /> :
      null;

    return (
      <div
        key={i}
        style={{width: '33.3333%', height: '33.3333%'}}
      >
        <Square >
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', height: '50%', width: '50%'}}>
        {squares}
      </div>
    );
  }
}

export default Grid;