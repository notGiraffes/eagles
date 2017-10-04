import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class CommentEntries extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createComments = this.createComments.bind(this);
  }

  createComments(comment) {
    return (
      <li key={comment.key}>{comment.user}: CreatedAt {moment(comment.key).format("MMM Do YY")}: {comment.text}: Likes: {comment.likes}  <span />
      <a href="#" onClick={(e) => {
        e.preventDefault();
        this.props.onLike(comment.key);
      }}>like</a>
      </li>
    )
  }

  render() {
    var commentEntries = this.props.entries;
    var listComments = commentEntries.map(this.createComments);

    return (
      <ul className="theList">
        {listComments}
      </ul>
    )
  }
};

export default CommentEntries;
