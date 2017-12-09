import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './js/components/Routes';
import SetTokenHeader from './js/utils/SetTokenHeader';
import './scss/style.scss';

if (localStorage.token) {
  SetTokenHeader(localStorage.token);
}

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);

