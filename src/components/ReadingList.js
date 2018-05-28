import React, { Component } from 'react';
import { Col, Image, Glyphicon, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

class ReadingList extends Component {

  render() {

  {/* This component has no functionality */}

  const tooltip = (
    <Tooltip id="tooltip">
      Add to Reading List
    </Tooltip>
  );

  return (
    <div className="likeRow">
      <OverlayTrigger placement="right" overlay={tooltip}>
        <Button className="addBtn">
          <Glyphicon glyph="plus" />
        </Button>
      </OverlayTrigger>
    </div>
  );

  }
}

export default ReadingList;
