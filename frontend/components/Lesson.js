// A stateless react component, has an ordered list, each entry being a slide. 

// Lesson.description


// Lesson.slides is an array, each object is a slide. 
// Lesson.slides.title

const Lesson = (props) => (
  <div>
    <h1>Title of the Lesson props.lesson.title</h1>
    <p>A short description of the lesson to be filled in later with props.lesson.description</p>
    <ol>
      {props.slides.map((slide, i) => {
        return <SlideListEntry
          slide={slide}
          index={i}
          key={i}
        />
      })};
    </ol>
  </div>
)