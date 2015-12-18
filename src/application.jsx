import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Component from 'react-es6-component';
import WindowFrame from './components/WindowFrame';

class Application extends Component {
  static propTypes = { }
  state = {theme: 'light'}
  render(){
    const color = this.state.theme === 'dark' ? 'white' : 'black';
    return (
      <WindowFrame title="Window Frame Demo" theme={this.state.theme}>
        <div style={{marginTop:50, marginLeft: 50}}>
          <a href="#" style={{color,display:'block', margin: 5}} onClick={this._onToggleTheme}>Toggle Theme</a>
        </div>
      </WindowFrame>
    );
  }

  _onToggleTheme(){
    if(this.state.theme === 'dark'){
      this.setState({
        theme: 'light'
      });
    } else {
      this.setState({
        theme: 'dark'
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
