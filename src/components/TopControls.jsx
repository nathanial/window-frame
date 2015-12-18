import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-es6-component';
import WindowControls from './WindowControls';

import remote from 'remote';

const BrowserWindow = remote.require('browser-window');
const app = remote.require('app');

export default class TopControls extends Component {

  constructor(){
    super(...arguments);
    this.win = BrowserWindow.getAllWindows()[0];
  }

  render(){
    return (
      <div className="top-controls"
           onMouseDown={this._onTitleBarMouseDown}
           onDoubleClick={this._onTitleBarDoubleClick}>
        <div className="upper-section">
          <div className="title-bar">
            <img className="app-icon" src="images/application.png"></img>
            <span className="title">Application</span>
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


  _onTitleBarDoubleClick(event){
    if(this._isBackgroundEventTarget(event.target)){
      if(!this.win.isMaximized()){
        this.win.maximize();
      } else {
        this.win.restore();
      }
    }
  }

  _onTitleBarMouseDown(event){
    if(this.win.isMaximized()){
      return;
    }
    if(this._isBackgroundEventTarget(event.target)){
      const [x,y] = this.win.getPosition();
      this.dragging = true;

      this.startDiffX = event.screenX - x;
      this.startDiffY = event.screenY - y;

      this._addDragListeners();
    }
  }

  _onDocumentMouseUp(){
    this.dragging = false;
    this._removeDragListeners();
  }

  _onDocumentMouseMove(event){
    if(this.dragging){
      this.win.setPosition(event.screenX - this.startDiffX, event.screenY - this.startDiffY);
    }
  }

  _addDragListeners(){
    $(document).on('mousemove', this._onDocumentMouseMove);
    $(document).on('mouseup', this._onDocumentMouseUp);
  }

  _removeDragListeners(){
    $(document).off('mousemove', this._onDocumentMouseMove);
    $(document).off('mouseup', this._onDocumentMouseUp);
  }

  _isBackgroundEventTarget(target){
    return (
      ReactDOM.findDOMNode(this).contains(target) &&
      !ReactDOM.findDOMNode(this.refs.windowControls).contains(target)
    );
  }

}
