import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Reply from './Reply.js';

class CommentEntries extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createComments = this.createComments.bind(this);
  }

  createComments(comment) {
    var day = moment(comment.key);
    var currentUser = window.localStorage.getItem('username');

    return (
      <li key={comment.key}><h4>{comment.user}</h4>{day._d.toString()}
      <br/>
      {comment.text}
      <br/>
      <div className="likeComment">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          this.props.onLike(comment.key);
        }}>Like</a>  {comment.likes}  <Reply replies={comment.replies} commentKey={comment.key} lessonKey={this.props.lesson._id}/>
        &nbsp;{currentUser === comment.user ?
                (<a href="#" onClick={(e) => {
                  e.preventDefault();
                  this.props.onDelete(comment.key);
                }}>Delete</a>) : null
              }
      </div>
      </li>
    )
  }

  render() {
    var commentEntries = this.props.entries;
    var sortedByLikes = [].concat(commentEntries).sort((a, b) => a.likes < b.likes).map(this.createComments);
    var sortedByTime = [].concat(commentEntries).sort((a,b) => {
      return a.key - b.key
    }).reverse().map(this.createComments);
    var listComments;

    if (this.props.sortBy === 'Newest') {
      listComments = sortedByTime;
    } else {
      listComments = sortedByLikes;
    }

    return (
      <ul className="theList">
        {listComments}
      </ul>
    )
  }
};

export default CommentEntries;
