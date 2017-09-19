import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Header, Button } from 'react-bootstrap';

const LessonPreview = (props) => {
  return (
    <div className="LessonPreview">
      <ListGroupItem header={props.lesson.name || 'no name'}>
      <Link to={'/lesson/' + props.lesson._id}>
        <Button bsStyle="primary" bsSize="small">View Lesson</Button>
      </Link>
      <div className="LessonDescription">
        {props.lesson.description || 'no description'} 
      </div>
      </ListGroupItem>
    </div>
  )
}

export default LessonPreview;