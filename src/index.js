import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store.js";
import {Provider} from "./myReact-Redux/index.js";


ReactDOM.render(
  <Provider store={store}>  <App >2131</App></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
