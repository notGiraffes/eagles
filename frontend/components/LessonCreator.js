import React from 'react';
import axios from 'axios';//use in functions
import SlideCreator from './SlideCreator.js';

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
      console.log(result);
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
    this.setState({
      slides: this.state.slides.push(slide)
    })
  }
  render () {
    if (!this.state.creatingSlide) {
      return (
        <div className='LessonCreator'>
        LESSON CREATOR
        <button type='button' onClick={this.changeCreateState.bind(this)}>Go To SlideCreator</button>
          <form onSubmit={this.onSubmit.bind(this)}>
            Enter Lesson name<input type='text' value={this.state.name} onChange={this.changeName.bind(this)}/>
            Enter Lesson createdBy<input type='text' value={this.state.createdBy} onChange={this.changeCreatedBy.bind(this)}/>
            Enter Lesson description<input type='text' value={this.state.description} onChange={this.changeDescription.bind(this)}/>
            Enter Lesson slides<input type='text' value={this.state.slides} onChange={this.changeSlides.bind(this)}/>
            Make Lesson<input type="submit" value="SubmitAll"/>
          </form>
        </div>
      )
    } else {
      return (
        <SlideCreator fetch={this.fetchSlideFromSlideCreator.bind(this)} changeCreateState={this.changeCreateState.bind(this)}></SlideCreator>
      )
    }
  }   
}

export default LessonCreator;
