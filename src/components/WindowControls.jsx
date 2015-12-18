import React from 'react';
import Component from 'react-es6-component';

export default class WindowControls extends Component {

  static propTypes = {
    onMinimize: React.PropTypes.func.isRequired,
    onMaximize: React.PropTypes.func.isRequired,
    onExit: React.PropTypes.func.isRequired
  }

  render(){
    return (
      <div className="window-controls" ref="windowControls">
        <div className="minimize" onClick={this._onMinimize}>_</div>
        <div className="maximize" onClick={this._onMaximize}>
          <div className="square"></div>
        </div>
        <div className="exit" onClick={this._onExit}>x</div>
      </div>
    );
  }

  _onMinimize(){
    this.props.onMinimize();
  }

  _onMaximize(){
    this.props.onMaximize();
  }

  _onExit(){
    this.props.onExit();
  }
}
