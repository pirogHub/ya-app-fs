import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
// import './yandex/css/btn.scss'
import "./yandex/css/my-bootstrap.scss"


import App from './App';
import { Router } from 'react-router-dom';
import customHistory from './yandex/services/history.service';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    {/* <BrowserRouter > */}
    <Router history={customHistory}>
      <App />
    </Router>
    {/* </BrowserRouter> */}
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
