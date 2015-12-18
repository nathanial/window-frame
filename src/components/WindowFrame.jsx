import React from 'react';
import Component from 'react-es6-component';
import TopControls from './TopControls';

export default class WindowFrame extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    theme: React.PropTypes.oneOf(['light','dark']).isRequired
  }

  render(){
    const classes = ["window-frame", this.props.theme].join(' ');
    return (
      <div className={classes}>
        <TopControls title={this.props.title} />
        <div className="window-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
