import React from 'react';
import axios from 'axios';

class SlideCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      youTubeUrl: '',
      text: '',
      quizUrl: ''
    }
  }
  onSubmit (event) {
    event.preventDefault();
    axios.post('/slides', this.state)
    .then(result => {
      console.log(result);
      this.props.fetch(result);
    });
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
    <div className='SlideCreator'>
    SLIDE CREATOR
      <form onSubmit={this.onSubmit.bind(this)}>
        Enter Slide name<input type='text' value={this.state.name} onChange={this.changeName.bind(this)}/>
        Enter Slide youTubeUrl<input type='text' value={this.state.name} onChange={this.changeYouTubeUrl.bind(this)}/>
        Enter Slide text<input type='text'/ value={this.state.text} onChange={this.changeText.bind(this)}/>
        Enter Slide quizUrl<input type='text'/ value={this.state.quizUrl} onChange={this.changeQuizUrl.bind(this)}/>
        <input type='submit' value='SubmitAll'/>
      </form>
      <button type="button" onClick={this.props.changeCreateState}>Stop Creating</button>
    </div>
  }

}

export default SlideCreator;