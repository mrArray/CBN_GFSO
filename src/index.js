import React from 'react';
import ReactDOM from 'react-dom';
import 'react-form-builder2/dist/app.css';
import App from './app';
// import DemoBar from './components/demobar';
import * as serviceWorker from './serviceWorker';
// import * as variables from './components/variables';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <App />,
  document.getElementById('form-builder'),
);

// ReactDOM.render(
//   <DemoBar variables={variables} />,
//   document.getElementById('demo-bar'),
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
