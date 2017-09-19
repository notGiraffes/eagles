import React from 'react';

const LessonSlideListEntry = (props) => (
  <li className="LessonSlideListEntry" onClick={() => props.onLessonSlideListEntryClick(props.index)}>{props.slide.name}</li>
);


export default LessonSlideListEntry;