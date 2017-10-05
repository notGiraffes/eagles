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
}
  componentDidMount(){
    // Render inital suggestions based on primary tag
    this.handleSearch();
  }

  handleSearch(){
    // Get youtube suggestions 
    axios.post('/youtube', {query : this.state.currentQuery})
    .then((data) => {
      console.log('our query', this.state.currentQuery);
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
    // Handle search input
    this.setState({currentQuery: e.target.value});
  }

  handleVideoChange(e){
    // Select new video from suggestions
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
          <Player resetNotes={this.props.resetNotes} 
                  currentVideoURL={this.state.currentVideoURL} 
                  grabAnnotations={this.props.grabAnnotations}
                  annotations={this.props.annotations}/>
          : null
        }
        {this.state.suggestions.map((items,i) => {
          return <div key={i}>
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