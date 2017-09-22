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
      slidesId: [],
      creatingSlide: false,
      lessonid: 'No ID Yet',
      keyWords: [],
      clientShownKeyWords: '',
      editingOldSlide: false,
      oldSlide: ''
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
  seeOldSlide (slide) {
    console.log('this is the event after clicking ', slide);
    var indexOfSlideId = this.state.slides.indexOf(slide);
    var slideId = this.state.slidesId[indexOfSlideId];
    console.log(slideId,indexOfSlideId);
    var url = '/slides/' + slideId;
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then(result => result.json())
    .then((result) => {
      console.log('result of retrieving slide by id',result[0])
      var oldSlide = result[0];
      oldSlide.old = true;
      this.setState({
        oldSlide: oldSlide,
        editingOldSlide: !this.state.editingOldSlide
      });
    });
  }

  keyWordSubmit (event) {
    event.preventDefault();
    console.log('keyWordSubmit triggered keyWords look like ', this.state.clientShownKeyWords);
    var keyWords = this.state.clientShownKeyWords.trim();
    this.setState({
      keyWords: [...this.state.keyWords, keyWords]
    })
    var body = { keyWords: this.state.keyWords, lessonid: this.state.lessonid };
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

  changeDescription (event) {
    this.setState({
      description: event.target.value
    });
  }
  
  changeCreateState (event) {
    console.log('changingcreatestate')
    this.setState({
      creatingSlide: !this.state.creatingSlide
    })
  }
  changeEditingOldSlide (event) {
    console.log('changeEditingOldSlide')
    this.setState({
      creatingSlide: !this.state.creatingSlide,
      editingOldSlide: !this.state.editingOldSlide
    });
  }
  fetchSlideFromSlideCreator (result) {
    console.log(result);
    var slideName = result.name; 
    var slideId = result._id;
    console.log('this is the result line119 lessoncreator', result);
    this.setState({
      slides: this.state.slides.concat(slideName), //pushing in slide object's id into slides;
      slidesId: this.state.slidesId.concat(slideId)
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
          {this.state.slides.length === 0 ? (<div>No Slides Yet</div>) : (<div>Lesson Slides: {this.state.slides.join(', ')}</div>)}
        </Form>
      )
    } else if (this.state.creatingSlide && !this.state.editingOldSlide) {
      return (
        <div>
          <div>Lesson Name: {this.state.name}</div>
          <div>Lesson Description: {this.state.description}</div>
          <div>Lesson Tags: {this.state.keyWords.join(', ')}</div>
          <SlideCreator 
            slide={{}} 
            lessonRef={this.state.lessonid} 
            fetch={this.fetchSlideFromSlideCreator.bind(this)} 
            changeCreateState={this.changeCreateState.bind(this)} 
            changeEditingOldSlide={this.changeEditingOldSlide.bind(this)}>
          </SlideCreator>
          <div>Lesson Slides: 
            {
              this.state.slides.map((slide,i) => {
                return <div key={i} onClick={this.seeOldSlide.bind(this,slide)}>{slide}</div>
              })
            }
          </div>
        </div>
      )
    } else if (this.state.creatingSlide && this.state.editingOldSlide) {
      return (
        <div>
          <div>Editing An Old Slide</div>
          <div>Lesson Name: {this.state.name}</div>
          <div>Lesson Description: {this.state.description}</div>
          <div>Lesson Tags: {this.state.keyWords.join(', ')}</div>
          <SlideCreator 
            slide={this.state.oldSlide} 
            lessonRef={this.state.lessonid} 
            fetch={this.fetchSlideFromSlideCreator.bind(this)} 
            changeCreateState={this.changeCreateState.bind(this)} 
            changeEditingOldSlide={this.changeEditingOldSlide.bind(this)}>
          </SlideCreator>
        </div>
      )
    }
  }   
}

export default LessonCreator;