import React, { Component } from 'react';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ArchivePage extends Component {
  constructor(){
    super();
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    let booksURL = "http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed";
    fetch(booksURL)
    .then(response => response.json())
    .then(response => {
      this.setState({
        books: response
      })
    })
  }
  render() {
    let subjcts = [];
    let books = this.state.books.map((book, i) => {
    let count = i + 1;


      return (
        <div key={i} className={i}>
          <Col md={3} sm={4}>
            <div className="anArchive full">
              <Link to={`/book/${book.id}`}>
                <Image src={book._embedded['wp:featuredmedia']['0'].source_url} alt={book._embedded['wp:featuredmedia']['0'].alt_text} className="featuredArchiveImage" />
                <h1 className="bookTitle full" dangerouslySetInnerHTML={{__html:book.title.rendered}}></h1>
                <p>ISBN #: {book.acf.isbn}</p>
              </Link>
            </div>
          </Col>
          {count % 4 === 0 ? <Clearfix visibleLgBlock visibleMdBlock/> : ''}
          {count % 3 === 0 ? <Clearfix visibleSmBlock/> : ''}
        </div>
      )

     })
    return (
      <div>
        <Grid fluid className="archiveBookBg">
          <Row className="show-grid">
            <Col md={12}>
              <h1 className="text-center">OfficeBureau Books</h1>
            </Col>
          </Row>
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
