import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LessonPreview = (props) => {
  return (
    <Link to={'/lesson/' + props.lesson._id}>
    <div className="LessonPreview">
      <div className="LessonTitle">
        {props.lesson.name || 'no name'}
      </div>
      <div className="LessonDescription">
        {props.lesson.description || 'no description'} 
      </div>
    </div>
    </Link>
  )
}

export default LessonPreview;