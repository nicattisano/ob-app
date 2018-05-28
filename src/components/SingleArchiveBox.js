import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class SingleArchiveBox extends Component {
  constructor () {
    super();
    this.state = {
      taxonomies: []
    };
  }

  componentDidMount() {
    fetch(`http://api-biblio.officebureau.ca/wp-json/wp/v2/subject/`)
    .then(response => response.json())
    .then(response => {
      this.setState({
        taxonomies: response
      })
    })
  }

  getSubjects(subjectArray) {
    let subNames = [];
    this.state.taxonomies.forEach(function(taxonomy, i) {
      subjectArray.forEach(function(sub){
        if (sub === taxonomy.id) {
          subNames.push(<a href={`/subject/${taxonomy.id}/${taxonomy.slug}`} className="subject">{taxonomy.name},</a>)
        }
        console.log(subNames);
      })
    })
    return subNames;
  }

  render() {
    let subjectArray = [];
    let taxonomy = this.state.taxonomies.map((taxonomy, i) => {
      if (this.props.subjects[i] === taxonomy.id) {
        subjectArray.push(taxonomy);
      }
    })

      return (
          <Col md={3} sm={4} xs={6} className="singlePostBox">
            <div className="anArchive full">
              <Link to={`/book/${this.props.id}`}>
                <Image src={this.props.imgsrc} alt={this.props.imgalt} className="featuredArchiveImage" />
                <h1 className="bookTitle full" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
                <p className="boldedHeading">ISBN #: <span>{this.props.isbn}</span></p>
                <p className="boldedHeading">Subjects: {this.getSubjects(this.props.subjects)}</p>
              </Link>
            </div>
          </Col>
      )

  }
}

export default SingleArchiveBox;
