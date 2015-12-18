import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Component from 'react-es6-component';

class Application extends Component {
  static propTypes = { }
  render(){
    return (
      <div></div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
