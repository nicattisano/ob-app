import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SingleArchiveBox from './SingleArchiveBox.js';
import Header from './Header.js';
import Loading from './Loading.js';

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
              .map((book) => <SingleArchiveBox key={book.id} id={book.id} title={book.title.rendered} imgsrc={book._embedded['wp:featuredmedia']['0'].source_url} imgalt={book._embedded['wp:featuredmedia']['0'].alt_text} isbn={book.acf.isbn} subjects={book.subject}></SingleArchiveBox>
          )}
        </div>
    )
  }
};

class TaxonomyPage extends React.Component {

  constructor () {
    super();

    this.state = {
      books: [],
      taxonomy_id: null,
      taxonomy_slug: null,
      filter: '',
      loading: true
    };
  }

  componentDidMount() {
    let taxID = this.props.match.params.taxID;
    let taxSlug = this.props.match.params.taxSlug;
    taxSlug = taxSlug.replace('-', ' ');
    taxSlug = taxSlug.charAt(0).toUpperCase() + taxSlug.slice(1);
    fetch(`http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed&subject=${taxID}`)
    .then(response => response.json())
    .then(response => {
      this.setState({
        books: response,
        taxonomy_id: taxID,
        taxonomy_slug: taxSlug,
        loading: false
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

    if (this.state.loading == true) {
      return (<Loading />)
    }

    let theTaxTerm = this.state.taxonomy_slug;
    return (
      <div>
        <Header title={theTaxTerm} back_visible={true} />
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

export default TaxonomyPage;
