import React, { Component } from 'react';

const LessonPreview = (props) => {
  return (
    <div className="LessonPreview" onClick={() => props.onLessonPreviewClick(props)}>
      <div className="LessonTitle">
        {props.lesson.title || 'no title'}
      </div>
      <div className="LessonDescription">
        {props.lesson.description || 'no description'} 
      </div>
    </div>
  )
}

export default LessonPreview;