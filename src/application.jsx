import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Component from 'react-es6-component';
import WindowFrame from './components/WindowFrame';

class Application extends Component {
  static propTypes = { }
  render(){
    return (
      <WindowFrame />
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
