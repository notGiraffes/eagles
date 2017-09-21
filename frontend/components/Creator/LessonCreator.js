import React from 'react';
import axios from 'axios';//use in functions
import SlideCreator from './SlideCreator.js';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class LessonCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      userRef: "59c2ce2af424e2541cb7b508",
      description: '',
      slides: [],
      creatingSlide: false,
      lessonid: 'No ID Yet',
      keyWords: []
    };
  }
  onSubmit (event) {
    event.preventDefault();
    var lessonObj = {
      name: this.state.name,
      userRef: this.state.userRef,
      description: this.state.description,
      slides: this.state.slides

    };
    // axios.post('/lessons', lessonObj)
    fetch('/lessons', {
      method: "POST",
      body: JSON.stringify(lessonObj),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((result) => {
      console.log('result is',result);
      this.setState({
        lessonid: result.data._id // setting lessonid to the lesson object's id
      })
      console.log('state now is ', this.state);
    })
  }
  changeName (event) {
    this.setState({
      name: event.target.value
    });
  }

  // changeUserRef (event) {
  //   this.setState({
  //     userRef: event.target.value
  //   });
  // }
  changeDescription (event) {
    this.setState({
      description: event.target.value
    });
  }
  changeSlides (event) {
    this.setState({
      slides: event.target.value
    });
  }
  changeCreateState (event) {
    console.log('changingcreatestate')
    this.setState({
      creatingSlide: !this.state.creatingSlide
    })
  }
  fetchSlideFromSlideCreator (result) {
    var slideID = result.data._id; 
    console.log('this is the slide', slideID);
    this.setState({
      slides: this.state.slides.concat(slideID) //pushing in slide object's id into slides;
    })
  }
  render () {
    if (!this.state.creatingSlide) {
      return (
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Col smOffset={1} sm={2}>
              <ControlLabel>Lesson Creator</ControlLabel>
            </Col>
            <Col smOffset={1} sm={4}>
              {this.state.lessonid === 'No ID Yet' ? "You can make a slide after you make a lesson" : <Button onClick={this.changeCreateState.bind(this)}>Go To Slide Creator</Button>}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={6}>
              <ControlLabel>Lesson ID: {this.state.lessonid}</ControlLabel>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Lesson Name</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Lesson Name'
                value={this.state.name}
                onChange={this.changeName.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>userRef:</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide Creator'
                value={this.state.userRef}
                // onChange={this.changeUserRef.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Lesson description</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Lesson Description'
                value={this.state.description}
                onChange={this.changeDescription.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={2}>
              <ControlLabel>Has The Following Slides</ControlLabel>
            </Col>
            <Col smOffset={2} sm={2}>
              <ControlLabel>{this.state.slides.length === 0 ? "No Slides Yet" : this.state.slides}</ControlLabel>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button type="submit">
                Make Lesson
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )
    } else {
      return (
        <SlideCreator lessonRef={this.state.lessonid} fetch={this.fetchSlideFromSlideCreator.bind(this)} changeCreateState={this.changeCreateState.bind(this)}></SlideCreator>
      )
    }
  }   
}

export default LessonCreator;
