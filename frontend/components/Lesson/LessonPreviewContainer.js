import React, { Component } from 'react';
import LessonPreview from "./LessonPreview.js";
import { ListGroup } from 'react-bootstrap';

const LessonPreviewContainer = (props) => {
  return (
    <div className="LessonPreviewContainer">
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