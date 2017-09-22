import React from 'react';
import { Button } from 'react-bootstrap';

class Slide extends React.Component { 
  constructor(props) {
  super(props);
  this.state = {
  }
}
  render() {
    return (
    <div>
      <h1>{ this.props.slideData.name || 'No Slide Name' }</h1>
      <div className="youtubeVideoContainer">
      { this.props.videoIdOfClickedOnVideo ? (
        <iframe style={{width: 500, height: 350, float: "left"}} className="youtubeVideo" src={ 'https://www.youtube.com/embed/' + this.props.videoIdOfClickedOnVideo} allowFullScreen></iframe>
      ) : (
        <div></div>
      )}
        <p className="slideText">{this.props.slideData.text}</p>
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




// const Slide = (props) => (
//   <div>
//     <h1>{ props.slideData.name || 'No Slide Name' }</h1>
//     <div className="youtubeVideoContainer">
//       <iframe style={{width: 500, height: 350, float: "left"}} className="youtubeVideo" src={ props.videoIdOfClickedOnVideo ? 'https://www.youtube.com/embed/' + props.videoIdOfClickedOnVideo : 'https://www.youtube.com/embed/pNtbkiYsrRI'} allowFullScreen></iframe>
//       <p className="slideText">{props.slideData.text}</p>
//     </div>
//     <div> 
//         <p>{props.slideData.quizUrl}</p>
//     </div>
//     <div className="slideButtons"  style={{float: "right"}}>
//       <Button type="button" onClick={() => props.previousSlideClick(props.index)}>Previous Slide</Button>
//       <Button type="button" onClick={() => props.nextSlideClick(props.index)}>Next Slide</Button>
//       <Button type="button" onClick={() => props.exitClick()}>Exit</Button>
//     </div>
//   </div>

// );