import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Header, Button } from 'react-bootstrap';

const LessonPreview = (props) => {
  return (
    <div className="LessonPreview">
      <ListGroupItem header={props.lesson.name || 'no name'}>
      <div className="LessonDescription">
        {props.lesson.description || 'no description'} 
      </div>
      <Link to={'/lesson/' + props.lesson._id}>
        <Button bsStyle="primary" bsSize="small">View Lesson</Button>
      </Link>
      </ListGroupItem>
    </div>
  )
}

export default LessonPreview;