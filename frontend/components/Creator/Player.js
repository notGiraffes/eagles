import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import $ from 'jquery';

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoTime: "",
      videoAnnotation: "",
      annotations: [],

    }
    this.handleAnnotate = this.handleAnnotate.bind(this);
    this.handleSetNote = this.handleSetNote.bind(this);
    this.ref = player => {
      this.player = player
    }
  }
  handleAnnotate(e){
    var time = Math.floor(this.player.getCurrentTime());
    console.log(time);
    this.setState({videoTime: time, videoAnnotation: e.target.value})
  }

  handleSetNote(e){
    e.preventDefault();
    this.setState({annotations: this.state.annotations.concat({time: this.state.videoTime, text: this.state.videoAnnotation})},()=>{
      this.props.grabAnnotations(this.state.annotations);
    });
    // axios.post('/annotate', {time: this.state.videoTime, text: this.state.videoAnnotation})
    // .then((data) => {
    //   console.log('Annotation set for', this.state.videoTime, 'text', this.state.videoAnnotation);
    // })
    // .catch((error) => {
    //   console.log('Error setting annotation');
    // })
    $('.annotate').val('');
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
        <input type="text" onChange={this.handleAnnotate} className="annotate" placeholder="Add annotation" />
        {this.state.annotations.map((notes,i) => {
          return <p key={i}>{notes.time}: {notes.text}</p>
        })}
        <button onClick={this.handleSetNote} >Add</button>
      </div>
    );
  }
 
}

export default Player;