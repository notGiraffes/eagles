import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Header, Button } from 'react-bootstrap';

const LessonPreview = (props) => {
  return (
    <div className="LessonPreview">
      <ListGroupItem header={props.lesson.name || 'no name'}>
        {props.lesson.description || 'no description'} 
      <Link to={'/lesson/' + props.lesson._id}>
        <Button bsStyle="primary" bsSize="small" block>View Lesson</Button>
      </Link>
      </ListGroupItem>
    </div>
  )
}

export default LessonPreview;