import React from 'react';
import axios from 'axios';//use in functions
import SlideCreator from './SlideCreator.js';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class LessonCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      userRef: this.props.userRef,
      description: '',
      slides: [],
      creatingSlide: false,
      lessonid: 'No ID Yet',
      keyWords: [],
      clientShownKeyWords: ''
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
    .then((anything) => anything.json())
    .then((result) => {
      console.log('result is',result);
      this.setState({
        lessonid: result._id // setting lessonid to the lesson object's id
      })
      console.log('state now is ', this.state);
    })
  }
  keyWordSubmit (event) {
    event.preventDefault();
    console.log('keyWordSubmit triggered keyWords look like ', this.state.clientShownKeyWords);
    var keyWords = this.state.clientShownKeyWords.split(',').map(item => item.trim()).filter(item => item !== '');
    this.setState({
      keyWords: keyWords
    })
    var body = { keyWords: keyWords, lessonid: this.state.lessonid };
    fetch('/lessons', {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(function(result) {
      return result.json();
    })
    .then(function(result) {
      console.log('from line62 lessoncreator result after keyword update is', result);
    })
    .catch(function(err) {
      console.log('line 70 err', err);
    })
  }
  changeClientKeyWords (event) {
    var keyWords = event.target.value;
    this.setState({
      clientShownKeyWords: keyWords
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
    console.log(result);
    var slideID = result._id; 
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
          </FormGroup>

          { this.state.lessonid === 'No ID Yet' ? null : 
            (<div>
              <div>Lesson Name: {this.state.name}</div>
              <div>Lesson Description: {this.state.description}</div>
              <div>Lesson Tags: {this.state.keyWords.join(', ')}</div>
            </div>) 
          }
{/*
          <FormGroup>
            <Col smOffset={1} sm={6}>
              <ControlLabel>Lesson ID: {this.state.lessonid}</ControlLabel>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>userRef:</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide Creator'
                value={this.state.userRef || 'no user ref!'}
                // onChange={this.changeUserRef.bind(this)}
              />
            </Col>
          </FormGroup>
*/}
          { this.state.lessonid === 'No ID Yet' ? (<FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Lesson Name</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Lesson Name'
                value={this.state.name}
                onChange={this.changeName.bind(this)}
              />
            </Col>
          </FormGroup>) : null }
          
          { this.state.lessonid === 'No ID Yet' ? (<FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Lesson description</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Lesson Description'
                value={this.state.description}
                onChange={this.changeDescription.bind(this)}
              />
            </Col>
          </FormGroup>) : null }
          

          {this.state.lessonid === 'No ID Yet' ? null : <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Add Tags To Lesson</Col>
            <Col sm={10}>
                <FormControl type='text' 
                  value={this.state.clientShownKeyWords}
                  onChange={this.changeClientKeyWords.bind(this)}
                />
                <Button onClick={this.keyWordSubmit.bind(this)}> Set Tags </Button>
            </Col>
          </FormGroup>}

          
          {/*
            <FormGroup>
            <Col smOffset={1} sm={2}>
              <ControlLabel>Has The Following Slides</ControlLabel>
            </Col>
            <div>
              <ControlLabel>{this.state.slides.length === 0 ? "No Slides Yet, You can create slides after making a lesson" : this.state.slides.join(', ')}</ControlLabel>
            </div>
            </FormGroup>
          */}
            <FormGroup>
            { this.state.lessonid === 'No ID Yet' ? 
              (<Col smOffset={2} sm={6}>
                <Button type="submit">
                  Make Lesson
                </Button>
              </Col>) :
              (<Col smOffset={1} sm={4}>
                <Button onClick={this.changeCreateState.bind(this)}>Go To Slide Creator</Button>
              </Col>)
            }
          </FormGroup>
        </Form>
      )
    } else {
      return (
        <div>
          <div>Lesson Name: {this.state.name}</div>
          <div>Lesson Description: {this.state.description}</div>
          <div>Lesson Tags: {this.state.keyWords.join(', ')}</div>
          <div>Lesson Slides: {this.state.slides.join(', ')}</div>
          <SlideCreator lessonRef={this.state.lessonid} fetch={this.fetchSlideFromSlideCreator.bind(this)} changeCreateState={this.changeCreateState.bind(this)}></SlideCreator>
        </div>
      )
    }
  }   
}

export default LessonCreator;
