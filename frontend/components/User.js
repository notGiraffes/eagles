import React, { Component } from 'react';
import { ListGroupItem, Header, Button } from 'react-bootstrap';
import { ListGroup, DropdownButton } from 'react-bootstrap';
import LessonPreviewContainer from './Lesson/LessonPreviewContainer';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    }
    this.getLessons = this.getLessons.bind(this);
  }

  getLessons() {
    return fetch('/lessons', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((unfilteredLessons) => {
      console.log('not filtered: ', this.props.user);
      return unfilteredLessons.filter(lsn => this.props.user.lessons.indexOf(lsn._id) >= 0)
    })
    .then((lessons) => this.setState({lessons}))
    .catch((err) => console.log('Error getting lessons', err));
  }

  componentDidMount() {
    this.getLessons();
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>Username: { this.props.user.username || 'no username!' }</ListGroupItem>
        <ListGroupItem>Favorite Lessons: { this.props.user.favorites || 'no favorite lessons!' } </ListGroupItem>
        <ListGroupItem>Your Lessons: { this.props.user.createdLessons || 'no createdLessons!' } </ListGroupItem>
        <ListGroupItem>Your Lessons:
        {this.state.lessons.length > 0 ? (<LessonPreviewContainer lessons={ this.state.lessons }/>) : '' }
        </ListGroupItem>
      </ListGroup>
    );
  } 
}

export default User;