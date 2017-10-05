import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class CommentEntries extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createComments = this.createComments.bind(this);
  }

  createComments(comment) {
    var day = moment(comment.key);
    return (
      <li key={comment.key}><h4>{comment.user}</h4>{day._d.toString()}
      <br/>
      {comment.text}
      <br/>
      Likes: {comment.likes} <span />
      <a href="#" onClick={(e) => {
        e.preventDefault();
        this.props.onLike(comment.key);
      }}>like</a>
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
