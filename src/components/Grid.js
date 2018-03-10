import React, { Component } from 'react';
import Square from './Square'

export default class Grid extends Component {
  renderSquare(i) {
    const x = i % 3;
    const y = Math.floor(i / 3);
    const black = (x + y) % 2 === 1;

    return (
      <div key={i}
            style={{width: '33.3333%', height: '33.3333%'}}>
        <Square />
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
