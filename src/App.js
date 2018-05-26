import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
        {books}
      </div>
    );
  }
}

export default App;
