import React, { Component } from 'react';
import { render } from 'react-dom';
import App from "./components/App";
import './style.css';

const DATA = [

];

render(<App tasks={DATA}/>, document.getElementById('root'));
