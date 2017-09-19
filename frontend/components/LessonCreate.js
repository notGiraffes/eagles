import React from 'react';
import axios from 'axios';//use in functions

class LessonCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ''
      createdBy: ''
      description: ''
      slides: ''
    };
  }
  onSubmit (event) {
    event.preventDefault();
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

  render () {
    return (
      <div className='lessonCreate'>
        <form onSubmit={this.onSubmit.bind(this)}>
          Enter Lesson name<input type='text' value={this.state.name} onChange={this.changeName.bind(this)}/>
          Enter Lesson createdBy<input type='text' value={this.state.createdBy} onChange={this.changeCreatedBy.bind(this)}/>
          Enter Lesson description<input type='text' value={this.state.description} onChange={this.changeDescription.bind(this)}/>
          Enter Lesson slides<input type='text' value={this.state.slides} onChange={this.changeSlides.bind(this)}/>
          Make Lesson<input type="submit" value="SubmitAll"/>
        </form>
      </div>
    )
  }   
}

export default LessonCreate;
