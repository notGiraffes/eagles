import React from 'react';

const LessonSlideListEntry = (props) => (
  <div className="LessonSlideListEntry" onClick={() => props.onLessonSlideListEntryClick(props.index)}>
    <h4 className="index">{props.index + 1}</h4>
    <img className="thumbnail" src={props.slide.youTubeThumbnailUrl} alt="" />
    <span className="slideNameInLessonSlideListEntry">
       {props.slide.name}
    </span>
  </div>
);


export default LessonSlideListEntry;