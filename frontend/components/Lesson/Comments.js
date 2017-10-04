import React, { Component } from 'react';
// import CommentEntries from './CommentEntries.js';

class Comments extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      comments: this.props.specificLesson.comments || []
    };
    this.addComment = this.addComment.bind(this);

  }

  addComment(e) {
    e.preventDefault();

    if (this._inputElement.value !== '') {
      var newComment = {
        text: this._inputElement.value,
        key: Date.now()
      };

      //Save new comment to DB
      console.log('addComment', this.props.specificLesson);
      var body = { comment: newComment, lessonid: this.props.specificLesson._id };
      fetch('/lessons', {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      .then(function(result) {
        return result.json();
      })
      .then((data) => {
        this.setState({
          comments: data.comments
        });
      })
      .catch(function(err) {
        console.log(err);
      });

      this._inputElement.value = '';
    }

  }

  render() {

    return (
      <div className="commentsMain">
        <div className="header">
          <form onSubmit={this.addComment}>
            <input ref={(a) => this._inputElement = a} placeholder="Add a comment" />
            <button type="submit">add</button>
          </form>
        </div>
        <CommentEntries entries={this.state.comments} />
      </div>
    );
  }
};

export default Comments;
