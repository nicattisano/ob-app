import React, { Component } from 'react';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SingleArchiveBox extends Component {

  render() {
      return (

          <Col key={this.props.key} md={3} sm={4}>
            <div className="anArchive full">
              <Link to={`/book/${this.props.id}`}>
                <Image src={this.props.imgsrc} alt={this.props.imgalt} className="featuredArchiveImage" />
                <h1 className="bookTitle full" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
                <p>ISBN #: {this.props.isbn}</p>
              </Link>
            </div>
          </Col>

      )

  }
}

export default SingleArchiveBox;
