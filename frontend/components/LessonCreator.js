import React from 'react';
import axios from 'axios';//use in functions
import SlideCreator from './SlideCreator.js';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class LessonCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      createdBy: '',
      description: '',
      slides: [],
      creatingSlide: false
    };
  }
  onSubmit (event) {
    event.preventDefault();
    var lessonObj = {
      name: this.state.name,
      createdBy: this.state.createdBy,
      description: this.state.description,
      slides: this.state.slides
    };
    axios.post('/lessons', this.state)
    .then((result) => {
      console.log('result is',result);
    })
  }
  changeName (event) {
    this.setState({
      name: event.target.value
    });
  }
  changeCreatedBy (event) {
    this.setState({
      createdBy: event.target.value
    });
  }
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
  fetchSlideFromSlideCreator (slide) {
    var slidedata = slide.config.data; 
    console.log('this is the slide', slide.config.data);
    this.setState({
      slides: this.state.slides.concat(slidedata)
    })
  }
  render () {
    if (!this.state.creatingSlide) {
      return (
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Col smOffset={2} sm={2}>
             <ControlLabel>Lesson Creator</ControlLabel>
              <Button onClick={this.changeCreateState.bind(this)}>Go To Slide Creator</Button>
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
            <Col componentClass={ControlLabel} sm={2}>Creator Name</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide Creator'
                value={this.state.createdBy}
                onChange={this.changeCreatedBy.bind(this)}
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
        <SlideCreator fetch={this.fetchSlideFromSlideCreator.bind(this)} changeCreateState={this.changeCreateState.bind(this)}></SlideCreator>
      )
    }
  }   
}

export default LessonCreator;
