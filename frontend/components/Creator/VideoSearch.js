import React from 'react';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import ReactPlayer from 'react-player';
import Player from './Player.js'

class VideoSearch extends React.Component { 
  constructor(props) {
  super(props);
  this.state = {
    currentVideoURL: "",
    currentThumbnail: "",
    currentQuery: this.props.primaryTag, 
    suggestions: [],
    videoTime: "",
    videoAnnotation: ""
  }
  this.handleSearch = this.handleSearch.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.handleVideoChange = this.handleVideoChange.bind(this);
  // this.handleAnnotate = this.handleAnnotate.bind(this);
  // this.handleSetNote = this.handleSetNote.bind(this);
}
  componentDidMount(){
    this.handleSearch();
  }


  handleSearch(){
    axios.post('/youtube', {query : this.state.currentQuery})
    .then((data) => {
      console.log('our query', this.state.currentQuery);
      console.log('axios search data data items?', data.data.items);
      this.setState({suggestions: data.data.items}) // set suggestions to results from youtube search
    })
    .then(() => {
      console.log(this.state.suggestions);
      this.props.grabYouTubeVideo(this.state.suggestions[0].id.videoId, this.state.suggestions[0].snippet.thumbnails.default.url);
      this.setState({currentVideoURL: this.state.suggestions[0].id.videoId});
      this.setState({currentThumbnail: this.state.suggestions[0].snippet.thumbnails.default.url});
    })
    .catch((error) => {
      console.log('Error searching YouTube');
    })
    $('.searchBar').val('');
  }

  handleInput(e){
    console.log('changed query');
    this.setState({currentQuery: e.target.value});
  }

  handleVideoChange(e){
    console.log('newVideo is ', e.target.id);
    this.setState({currentVideoURL: e.target.id, currentThumbnail: e.target.src}, () => {
    this.props.grabYouTubeVideo(this.state.currentVideoURL, this.state.currentThumbnail); 
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.handleInput} type="text" className="searchBar" placeholder="Search for videos" />
        <p onClick={this.handleSearch}>Search</p>
        {this.state.currentVideoURL ?
          <Player currentVideoURL={this.state.currentVideoURL} grabAnnotations={this.props.grabAnnotations}/>
          : null
        }
        {this.state.suggestions.map((items,i) => {
          return <div>
            <img onClick={this.handleVideoChange} id={`${items.id.videoId}`} src={`${items.snippet.thumbnails.default.url}`}/>
            <p>{items.snippet.title}</p>
            <p>{items.snippet.description}</p> 
          </div>
        })
       }
      </div>
    );
  }
}


export default VideoSearch;