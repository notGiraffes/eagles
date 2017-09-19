import React, { Component } from 'react';
import LessonPreview from "./LessonPreview.js";

const LessonPreviewContainer = (props) => {
  return (
    <div className="LessonPreviewContainer">
      {props.lessons.map((lesson, i) => 
        <LessonPreview 
          lesson={lesson} 
          index={i}
          key={i}
        /> 
      )}
    </div>
  )
};

export default LessonPreviewContainer;