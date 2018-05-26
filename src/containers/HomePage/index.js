import React, { Component } from 'react';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(){
    super();
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    let booksURL = "http://api-biblio.officebureau.ca/wp-json/wp/v2/posts";
    fetch(booksURL)
    .then(response => response.json())
    .then(response => {
      this.setState({
        books: response
      })
    })
  }
  render() {
    let books = this.state.books.map((book, i) => {
      return (
        <div key={i}>
          {book.title.rendered}
        </div>
      )
    })
    return (
      <div className="App">
          <h1>Home</h1>
          <Link to="/archives">Archives</Link>
      </div>
    );
  }
}

export default HomePage;
