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
    let theContent = '';
    let coverImg = null;
    let altText = null;
    let author = '';
    let inventoryNum = null;
    let inventory = null;

    if (this.state.book !== undefined && this.state.book !== false) {
      if (this.state.book.title !== undefined) {
       theTitle = this.state.book.title.rendered;
      }
      if (this.state.book.content !== undefined) {
        theContent = this.state.book.content.rendered;
        theContent = theContent.replace('<p>', '').replace('</p>', '');
        theContent = <p className="content">{theContent}</p>
       }
      if (this.state.book._embedded && this.state.book._embedded['wp:featuredmedia']['0'].source_url !== 'undefined' && this.state.book._embedded['wp:featuredmedia']['0'].source_url !== false) {
        coverImg = this.state.book._embedded['wp:featuredmedia']['0'].source_url;
      }
      if (this.state.book._embedded && this.state.book._embedded['wp:featuredmedia']['0'].alt_text !== 'undefined' && this.state.book._embedded['wp:featuredmedia']['0'].alt_text !== false) {
        altText = this.state.book._embedded['wp:featuredmedia']['0'].alt_text;
      }
      if (this.state.book._embedded && this.state.book._embedded.author !== 'undefined' && this.state.book._embedded.author !== false) {
        author = this.state.book._embedded.author[0].name;
      }
      if (this.state.book.acf.inventory && this.state.book.acf.inventory !== 'undefined' && this.state.book.acf.inventory !== false) {
        inventoryNum = this.state.book.acf.inventory;
      }
      inventoryNum = parseInt(inventoryNum);
      if (inventoryNum > 0) {
        inventory = `${inventoryNum} Available`;
      } else {
        inventory = 'Sorry, this book is out of stock.';
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
                    <p className="author">{`by: ${author}`}</p>
                    {theContent}
                    <p className="inventory">{inventory}</p>
                    <Image src={coverImg} alt={altText} className="fullCover"/>
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
