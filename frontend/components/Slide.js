<<<<<<< HEAD
const Slide = (props) => {
	<div>
    <h1>THIS IS THE SLIDE COMPONENT</h1>
    <div className="youtubeVideoContainer">
      <iframe className="youtubeVideo" src={props.slideData.youTubeUrl} allowFullScreen></iframe>
    </div>
    <div> 
      The quiz URL should go here.
=======
import React from 'react';

const Slide = (props) => (
	<div>
    <h1>THIS IS THE SLIDE COMPONENT</h1>
    <div className="youtubeVideoContainer">
      <iframe className="youtubeVideo" src={'https://www.youtube.com/embed/' + props.slideData.youTubeUrl} allowFullScreen></iframe>
    </div>
    <div> 
        <p>{props.slideData.quizUrl}</p>
>>>>>>> lessonAndSlide
    </div>
    <div>
      <p>{props.slideData.text}</p>
    </div>
    <button type="button" onClick={() => props.previousSlideClick(props.index)}>Previous Slide</button>
    <button type="button" onClick={() => props.nextSlideClick(props.index)}>Next Slide</button>
<<<<<<< HEAD
    <button type="button">Exit</button>
  </div>

}
=======
    <button type="button" onClick={() => props.exitClick()}>Exit</button>
  </div>

);
>>>>>>> lessonAndSlide

export default Slide;