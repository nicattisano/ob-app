import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SideBar extends Component {
  constructor(){
    super();
    this.state = {
      displayedBooks: [],
      loading: true
    }
  }
  componentDidMount() {
    let booksURL = "http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed";
    fetch(booksURL)
    .then(response => response.json())
    .then(response => {
      this.setState({
        displayedBooks: response,
        loading: false
      })
    })
  }

  render() {

    if (this.state.loading == true) {
      return (
        <div className="sidebarLoading">Loading...</div>
      )
    }

    let listOfBooks = this.state.displayedBooks.map((book, i) => {
      return (
          <a href={`/book/${book.id}`} key={i}>
              {book.title.rendered}
          </a>
      )
    })
    return (
      <div>
        <Row>
          <Col md={12}>
            <h3 className="sidebarH3">More Books</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="sideBarBooks">
                {listOfBooks}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SideBar;
