import React from 'react';
import { Button } from 'react-bootstrap';
import SlideVideo from './SlideVideo.js';


class Slide extends React.Component { 
  constructor(props) {
  super(props);
  this.state = {
    editing: false
  }
  this.editMode = this.editMode.bind(this);
}
  editMode(){
    this.setState({editing : true});
  }
  render() {
    return (
    <div>
      <h1>{ this.props.slideData.name || 'No Slide Name' }</h1>
      <div className="youtubeVideoContainer">
      { this.props.videoIdOfClickedOnVideo ? (
        <SlideVideo currentVideoURL={this.props.videoIdOfClickedOnVideo} annotations={this.props.slideData.annotations}/>
      ) : (
        <div></div>
      )}
        <p className="slideText">{this.props.slideData.text}</p>
      </div>
      <div className="articleSlide"> 
          <button onClick={this.editMode}>EDIT</button>
          {this.state.editing ?
           <iframe height= '1000px' width= '1000px' src={`${this.props.slideData.articleUrl}`} ></iframe> 
          : <img src={`https://screenshotapi.s3.amazonaws.com/captures/${this.props.slideData.articleImage}.png`}/>
          }
      </div>
      <div> 
          <p>{this.props.slideData.quizUrl}</p>
      </div>
      <div className="slideButtons"  style={{float: "right"}}>
        <Button type="button" onClick={() => this.props.previousSlideClick(this.props.index)}>Previous Slide</Button>
        <Button type="button" onClick={() => this.props.nextSlideClick(this.props.index)}>Next Slide</Button>
        <Button type="button" onClick={() => this.props.exitClick()}>Exit</Button>
      </div>
    </div>
    );
  }
}


export default Slide;