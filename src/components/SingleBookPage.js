import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SideBar from './SideBar.js';
import Loading from './Loading.js';

class SingleBookPage extends Component {
  constructor(){
    super();
    this.state = {
      book: {},
      loading: true
    }
  }

    loadBook = (bookID = this.props.match.params.bookID) => {
      fetch(`http://api-biblio.officebureau.ca/wp-json/wp/v2/posts/${bookID}?_embed`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          book: response,
          loading: false
        })
      })
    }

    componentWillMount() {
      this.loadBook();
    }


  render() {

    if (this.state.loading == true) {
      return (<Loading />)
    }

    let theTitle = '';
    let coverImg = null;
    let altText = null;
    let author = '';

    if (this.state.book !== undefined && this.state.book !== false) {
      if (this.state.book.title !== undefined) {
       theTitle = this.state.book.title.rendered;
      }

      if (this.state.book._embedded && this.state.book._embedded['wp:featuredmedia']['0'].source_url !== undefined && this.state.book._embedded['wp:featuredmedia']['0'].source_url !== false) {
        coverImg = this.state.book._embedded['wp:featuredmedia']['0'].source_url;
      }

      if (this.state.book._embedded && this.state.book._embedded['wp:featuredmedia']['0'].alt_text !== undefined && this.state.book._embedded['wp:featuredmedia']['0'].alt_text !== false) {
        altText = this.state.book._embedded['wp:featuredmedia']['0'].alt_text;
      }

      if (this.state.book._embedded && this.state.book._embedded.author !== undefined && this.state.book._embedded.author !== false) {
        author = this.state.book._embedded.author[0].name;
      }

    }


    return (
      <div>
        <Grid className="margTop">
          <Row className="show-grid">
            <Col md={10} mdOffset={1}>
              <Row>
                <Col md={12}>
                  <Link to="/" className="back">Back</Link>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <div className="singleBookInfo">
                    <h1>{theTitle}</h1>
                    <p className="author">{`Author: ${author}`}</p>
                    <Image src={coverImg} alt={altText} className="full"/>
                  </div>
                </Col>
                <Col md={4}>
                  <SideBar />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SingleBookPage;
