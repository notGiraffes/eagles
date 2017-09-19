const Slide = (props) => {
	<div>
    <h1>THIS IS THE SLIDE COMPONENT</h1>
    <div className="youtubeVideoContainer">
      <iframe className="youtubeVideo" src={props.slideData.youTubeUrl} allowFullScreen></iframe>
    </div>
    <div> 
      The quiz URL should go here.
    </div>
    <div>
      <p>{props.slideData.text}</p>
    </div>
    <button type="button" onClick={() => props.previousSlideClick(props.index)}>Previous Slide</button>
    <button type="button" onClick={() => props.nextSlideClick(props.index)}>Next Slide</button>
    <button type="button">Exit</button>
  </div>

}

export default Slide;