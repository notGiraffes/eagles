// HTML structure is very rudimentary. Should perhaps split title and description into a div and have the list separate.

import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';

const Lesson = (props) => (
  <div className="lesson">
    <h1 className="lessonTitle">{props.lesson.title}</h1>
    <p className="lessonDescription">{props.lesson.description}</p>
    <ol className="lessonOrderedList">
      {props.slides.map((slide, i) => {
        return <LessonSlideListEntry
          slide={slide}
          index={i}
          key={i}
          onLessonSlideListEntryClick={props.onLessonSlideListEntryClick}
        />
      })}
    </ol>
  </div>
);


export default Lesson;

// Could split title and description into a div and have the list separate.
