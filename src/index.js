import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import HomePage from './containers/HomePage';
import ArchivePage from './containers/ArchivePage';
import SingleBookPage from './containers/SingleBookPage';

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/archives" component={ArchivePage} exact/>
        <Route path="/book/:bookID" component={SingleBookPage} exact />
      </Switch>
    </BrowserRouter>
  ), document.getElementById('root')
);
