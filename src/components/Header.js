import React, { Component } from 'react';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {

    return (
        <Grid fluid className="archiveBookBg">
          <Row className="show-grid">
            <Col md={12}>
              <h1 className="text-center">{this.props.title}</h1>
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default Header;
