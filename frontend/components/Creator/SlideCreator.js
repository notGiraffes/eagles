import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SlideCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      youTubeUrl: '',
      youTubeThumbnailUrl: '',
      youTubeTags: '',
      text: '',
      quizUrl: '',
      lessonRef: props.lessonRef
    }
  }
  onSubmit (event) {
    event.preventDefault();
    var sliceFrom = this.state.youTubeUrl.indexOf('=');
    var youTubeUrl = this.state.youTubeUrl.slice(sliceFrom + 1);
    if (this.state.youTubeUrl !== '') {
      youTubeQueryToServer(youTubeUrl, (youTubeDataObj) => {
        this.setState({
          youTubeThumbnailUrl: youTubeDataObj.snippet.thumbnails.default.url,
          youTubeTags: youTubeDataObj.snippet.tags
        })
        // youtubeDataObj.id;
        // youTubeDataObj.snippet.title
        // axios.post('/slides', this.state)
        fetch('/slides', {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        })
        .then((something) => something.json())
        .then(result => {
        console.log(result, ' that was result this.state is', this.state);
        this.props.fetch(result);
        })
      });
    } else {
      // axios.post('/slides', this.state)
      fetch('/slides', {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      .then((something) => something.json())
      .then(result => {
      console.log(result, ' that was result this.state is', this.state);
      this.props.fetch(result);
      })
    }
  }

  changeName (event) {
    this.setState({
      name: event.target.value
    })
  }

  changeYouTubeUrl (event) {
    this.setState({
      youTubeUrl: event.target.value
    })
  }

  changeText (event) {
    this.setState({
      text: event.target.value
    })
  }

  changeQuizUrl (event) {
    this.setState({
      quizUrl: event.target.value
    })
  }

  render () {
    return (
      <Form horizontal onSubmit={this.onSubmit.bind(this)}>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <ControlLabel>Slide Creator</ControlLabel>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide Name</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide Name'
              value={this.state.name}
              onChange={this.changeName.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide youTubeUrl</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide youTube Url'
              value={this.state.youTubeUrl}
              onChange={this.changeYouTubeUrl.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide Text</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide Text'
              value={this.state.text}
              onChange={this.changeText.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide QuizUrl</Col>
          <Col sm={10}>
            <FormControl type='Quiz Url' placeholder='Quiz Url'
              value={this.state.quizUrl}
              onChange={this.changeQuizUrl.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <FormControl type="submit" value='Create The Slide' />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <Button onClick={this.props.changeCreateState}>
              Go Back
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

}

function youTubeQueryToServer(searchString, cb) {
  // axios.get('/query', { params: { string: searchString } })
  fetch('/query?string=' + searchString, {
    method: "GET",
     headers: {
        "Content-Type": "application/json",
      },
    credentials: "include"
  })
  .then((something) => something.json())
  .then((result) => {
    console.log(result);
    console.log('Youtube query sent to server', result[0]);
    cb(result[0]);
  })
  .catch((err) => {
    console.log('Error: youtube query not sent to server', err);
  })
}

export default SlideCreator;