/*
  src/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/index';
import './index.css';
import Layout from './components/Layout';

const rootElement = document.getElementById("root");

ReactDOM.render(
 <Provider store={store}>
  <Layout />
 </Provider>,
 rootElement
);


