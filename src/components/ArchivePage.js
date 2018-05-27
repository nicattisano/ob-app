import React, { Component } from 'react';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SingleArchiveBox from './SingleArchiveBox.js';
import Header from './Header.js';

class ArchivePage extends Component {
  constructor(){
    super();
    this.state = {
      displayedBooks: []
    }
  }
  componentDidMount() {
    let booksURL = "http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed";
    fetch(booksURL)
    .then(response => response.json())
    .then(response => {
      this.setState({
        displayedBooks: response
      })
    })
  }

  render() {

    let books = this.state.displayedBooks.map((book, i) => {
    let count = i + 1;
      return (
        <div>
          <SingleArchiveBox key={i} id={book.id} imgsrc={book._embedded['wp:featuredmedia']['0'].source_url} imgalt={book._embedded['wp:featuredmedia']['0'].alt_text} title={book.title.rendered} isbn={book.acf.isbn} />
          {count % 4 === 0 ? <Clearfix visibleLgBlock visibleMdBlock/> : ''}
          {count % 3 === 0 ? <Clearfix visibleSmBlock/> : ''}
        </div>
      )

     })
    return (
      <div>
        <Header title="Books" />
        <Grid>
        </Grid>
        <Grid className="App">
          <Row className="show-grid">
              {books}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ArchivePage;
