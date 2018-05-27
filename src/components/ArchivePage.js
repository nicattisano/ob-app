import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SingleArchiveBox from './SingleArchiveBox.js';
import Header from './Header.js';

class BookFilter extends React.Component {

  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type="text" placeholder="Search a Book Title" className="inputSearch" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
    )
  }
}
class BookList extends React.Component {

  filter (books) {
    if (!this.props.filter) {
      return books
    }
    return books.filter((book) => book.title.rendered.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
  }
  render () {
    return (
        <div>
          { this.filter(this.props.books)
              .map((book) => <SingleArchiveBox key={book.id} id={book.id} imgsrc={book._embedded['wp:featuredmedia']['0'].source_url} imgalt={book._embedded['wp:featuredmedia']['0'].alt_text} title={book.title.rendered} isbn={book.acf.isbn} subjects={book.subject}></SingleArchiveBox>
          )}
        </div>
    )
  }
};

class ArchivePage extends React.Component {

  constructor () {
    super();

    this.state = {
      books: [],
      filter: ''
    };
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

  updateSearch (inputValue) {
    let filter = this.state.filter;

    this.setState({
      filter: inputValue
    });
  }

  render () {
    return (
<div>
  <Header title="Books" />
  <Grid>
    <Row className="show-grid searchRow">
      <Col md={6} mdOffset={3}>
        <BookFilter updateSearch={this.updateSearch.bind(this)} searchText={this.state.filter} />
      </Col>
    </Row>
  </Grid>
  <Grid className="App">
    <Row className="show-grid">
      <BookList filter={this.state.filter} books={this.state.books}></BookList>
    </Row>
  </Grid>
</div>
    );
  }
}

export default ArchivePage;
