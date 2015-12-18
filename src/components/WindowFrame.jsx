import React from 'react';
import Component from 'react-es6-component';
import TopControls from './TopControls';

export default class WindowFrame extends Component {
  render(){
    return (
      <div className="window-frame">
        <TopControls />
      </div>
    );
  }
}
