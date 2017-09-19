import React from 'react';

const Slide = (props) => (
	<div>
    <h1>THIS IS THE SLIDE COMPONENT</h1>
    <div className="youtubeVideoContainer">
      <iframe className="youtubeVideo" src={'https://www.youtube.com/embed/' + props.slideData.youTubeUrl} allowFullScreen></iframe>
    </div>
    <div> 
        <p>{props.slideData.quizUrl}</p>
    </div>
    <div>
      <p>{props.slideData.text}</p>
    </div>
    <button type="button" onClick={() => props.previousSlideClick(props.index)}>Previous Slide</button>
    <button type="button" onClick={() => props.nextSlideClick(props.index)}>Next Slide</button>
    <button type="button" onClick={() => props.exitClick()}>Exit</button>
  </div>

);

export default Slide;