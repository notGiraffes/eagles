import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import $ from 'jquery';
import Annotations from './Annotations.js';

class SlideVideo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoTime: "",
      videoAnnotation: "",
      annotations: [],
      renderNotes: [],
      currentTime: "",
      checker: ""
    }
    this.ref = player => {
      this.player = player
    }
    this.checkTime = this.checkTime.bind(this);
    this.timeConverter = this.timeConverter.bind(this);
  }

  componentDidMount(){
    // Timer checks current time of video against timed annotations
    var checker = setInterval(() => {this.checkTime()}, 500); 
    this.setState({checker: checker});
  }

  componentWillUnmount(){
    // Clears setInterval calls once page is redirected
    clearInterval(this.state.checker);
  }

  checkTime(){
    // Get current time of playing video
    var time = Math.floor(this.player.getCurrentTime());
    this.setState({currentTime: time}, );
  }

  timeConverter(seconds){
    // Present time in human form
    var mins = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    if(seconds < 10){
      seconds = '0' + seconds;
    }
    return mins + ':' + seconds;
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    };
    return (
      <div>
      <ReactPlayer
        ref={this.ref}
        config={{
          youtube: {
            playerVars: { showinfo: 1 , controls: 1}
          } 
        }}
        url={`https://www.youtube.com/watch?v=${this.props.currentVideoURL}`}
      />
      {this.props.annotations ?
      this.props.annotations.map((notes,i) => {
        if(this.state.currentTime > notes.time ){
        return <p className="annotations" key={i}>{this.timeConverter(notes.time)}: {notes.text}</p>
        }
      }) 
      : null
      } 
      </div>
    );
  }
 
}

export default SlideVideo;