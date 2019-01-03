import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import CalculatorApp from './components/CalculatorApp';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Mukta']
  }
});

ReactDOM.render(<CalculatorApp />, document.getElementById('app'));


