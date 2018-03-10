import React, { Component } from 'react';
import Square from './Square'

export default class Grid extends Component {
  render() {
    return (
      <div style={{display: 'flex', height: '100%', width: '100%'}}>
        <Square />
      </div>
    );
  }
}
