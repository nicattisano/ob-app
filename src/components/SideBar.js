import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SideBar extends Component {
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

    let listOfBooks = this.state.displayedBooks.map((book, i) => {
      return (
        <li key={i}>
          <Link to={`/book/${book.id}`} replace="true">
              {book.title.rendered}
          </Link>
        </li>
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
            <ul className="sideBarBooks">
                {listOfBooks}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SideBar;
