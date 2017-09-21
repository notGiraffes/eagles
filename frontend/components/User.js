import React, { Component } from 'react';
import { ListGroupItem, Header, Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>Username: { this.props.user.username || 'no username!' }</ListGroupItem>
        <ListGroupItem>Favorite Lessons: { this.props.user.favorites || 'no favorite lessons!' } </ListGroupItem>
        <ListGroupItem>Your Lessons: { this.props.user.createdLessons || 'no createdLessons!' } </ListGroupItem>
        <ListGroupItem>Your Lessons: { this.props.user.lessons || 'no lessons!' } </ListGroupItem>
      </ListGroup>
    );
  } 
}

export default User;