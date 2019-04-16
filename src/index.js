import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import CalculatorApp from './components/CalculatorApp';
import 'normalize.css/normalize.css';
import './styles/style.scss';

WebFont.load({
  google: {
    families: ['Mukta']
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}

ReactDOM.render(<CalculatorApp />, document.getElementById('app'));
