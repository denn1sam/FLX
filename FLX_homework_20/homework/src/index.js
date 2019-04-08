import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './scss/index.scss';

const rootNode = document.querySelector('#root');

render(<App />, rootNode);
