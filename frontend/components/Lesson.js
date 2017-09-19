import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';

const Lesson = (props) => (
  <div className="lesson">
    <h1 className="lessonTitle">{props.lesson.name}</h1>
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