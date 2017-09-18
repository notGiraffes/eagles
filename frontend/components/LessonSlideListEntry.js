import React from 'react';

const LessonSlideListEntry = (props) => (
  <li className="LessonSlideListEntry" onClick={() => props.onLessonSlideListEntryClick(props.index)}>{props.slide.title}</li>
);


export default LessonSlideListEntry;