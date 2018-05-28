import React, { Component } from 'react';
import { Col, Image, Glyphicon, Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';

class ReadingList extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      title: null,
      id: null
    };
  }
  componentDidMount() {
      this.setState({
        title: this.props.title,
        id: this.props.id
      })
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {

  const tooltip = (
    <Tooltip id="tooltip">
      Add to Reading List
    </Tooltip>
  );

  return (
    <div>
      <div className="likeRow">
        <OverlayTrigger placement="right" overlay={tooltip}>
          <Button className="addBtn" onClick={this.handleShow}>
            <Glyphicon glyph="plus" />
          </Button>
        </OverlayTrigger>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h1>{this.state.title}</h1>
          <p>was added to your reading list</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  }
}

export default ReadingList;
