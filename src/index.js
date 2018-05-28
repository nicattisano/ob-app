import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import ArchivePage from './components/ArchivePage.js';
import SingleBookPage from './components/SingleBookPage.js';
import TaxonomyPage from './components/TaxonomyPage.js';

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ArchivePage} exact />
        <Route path="/book/:bookID" component={SingleBookPage} exact />
        <Route path="/subject/:taxID/:taxSlug" component={TaxonomyPage} exact />
      </Switch>
    </BrowserRouter>
  ), document.getElementById('root')
);
