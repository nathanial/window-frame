import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-es6-component';
import WindowControls from './WindowControls';

import remote from 'remote';

const BrowserWindow = remote.require('browser-window');
const app = remote.require('app');


export default class TopControls extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired
  }

  constructor(){
    super(...arguments);
    this.win = BrowserWindow.getAllWindows()[0];
  }

  render(){
    return (
      <div className="top-controls">
        <div className="upper-section">
          <div className="title-bar">
            <img className="app-icon" src="images/application.png"></img>
            <span className="title">{this.props.title}</span>
          </div>
          <WindowControls ref="windowControls"
                          onMinimize={this._onMinimize}
                          onMaximize={this._onMaximize}
                          onExit={this._onExit}/>
        </div>
      </div>
    );
  }

  _onMinimize(){
    this.win.minimize();
  }

  _onMaximize(){
    if(this.win.isMaximized()){
      this.win.restore()
    } else {
      this.win.maximize();
    }
  }

  _onExit(){
    app.quit();
  }

}
