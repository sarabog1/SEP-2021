import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import Application from './components/application/Application';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
