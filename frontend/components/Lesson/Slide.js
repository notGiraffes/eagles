import React from 'react';
import { Button } from 'react-bootstrap';

const Slide = (props) => (
  <div>
    <h1>{ props.slideData.name || 'No Slide Name' }</h1>
    <div className="youtubeVideoContainer">
      <iframe style={{width: 500, height: 500}} className="youtubeVideo" src={'https://www.youtube.com/embed/' + props.videoIdOfClickedOnVideo} allowFullScreen></iframe>
    </div>
    <div> 
        <p>{props.slideData.quizUrl}</p>
    </div>
    <div>
      <p>{props.slideData.text}</p>
    </div>
    <Button type="button" onClick={() => props.previousSlideClick(props.index)}>Previous Slide</Button>
    <Button type="button" onClick={() => props.nextSlideClick(props.index)}>Next Slide</Button>
    <Button type="button" onClick={() => props.exitClick()}>Exit</Button>
  </div>

);

export default Slide;