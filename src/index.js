import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route} from 'react-router-dom'
import HomePage from './containers/HomePage';
import ArchivePage from './containers/ArchivePage';
import SingleBookPage from './containers/SingleBookPage';


ReactDOM.render((
    <BrowserRouter>
      <div>
        <Route path="/" component={HomePage} exact />
        <Route path="/archives" component={ArchivePage} exact/>
        <Route path="/book/:id" component={SingleBookPage} />
      </div>
    </BrowserRouter>
  ), document.getElementById('root')
);
