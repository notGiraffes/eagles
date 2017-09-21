import React, { Component } from 'react';
import LessonPreview from "./LessonPreview.js";
import { ListGroup, Button } from 'react-bootstrap';

const LessonPreviewContainer = (props) => {
  return (
    <div className="LessonPreviewContainer">
      Order by:
      
      <Button bsStyle="primary" bsSize="small" >by Likes</Button>
      <Button bsStyle="primary" bsSize="small" >by Date</Button>
      <ListGroup>
      {props.lessons.map((lesson, i) => 
        <LessonPreview 
          lesson={lesson} 
          index={i}
          key={i}
        /> 
      )}
      </ListGroup>
    </div>
  )
};

export default LessonPreviewContainer;