var slide = {
  "name": "slide1",
  "youTubeUrl": "https://www.youtube.com/watch?v=lAJWHHUz8_8",
  "text": "This is text for slide1",
  "quizUrl": "quiz for slide1"
};

var slides = [{
  "name": "slide1",
  "youTubeUrl": "https://www.youtube.com/watch?v=lAJWHHUz8_8",
  "text": "This is text for slide1",
  "quizUrl": "quiz for slide1"
},{
  name: 'slide2',
  youTubeUrl: "https://www.youtube.com/watch?v=4ZAEBxGipoA",
  text: "This is text for slide1",
  quizUrl: "quiz for slide1"
},{
  name: 'slide2',
  youTubeUrl: "https://www.youtube.com/watch?v=mFEoarLnnqM",
  text: "This is text for slide1",
  quizUrl: "quiz for slide1"
}];

var lesson = {
  name: 'lesson1',
  description: 'lesson1 description',
  slides: slides
};

var lessons = [
  {
    id: 0,
    name: "test1",
    description: "test1 description",
    slides:[
      {
        name: "testslide1",
        youTubeUrl: "https://www.youtube.com/watch?v=lAJWHHUz8_8",
        text: "This is about GraphQL basics. Throughout the video...",
        quizUrl: "someURL"
      }
    ]
  },
  {
    name: "test2",
    description: "test2 description",
    slides:[
      {
        name: "testslide2",
        youTubeUrl: "https://www.youtube.com/watch?v=lAJWHHUz8_8",
        text: "This is about GraphQL basics. Throughout the video...",
        quizUrl: "someURL"
      }
    ]
  },
  {
    name: "test3",
    description: "test3 description",
    slides:[
      {
        name: "testslide3",
        youTubeUrl: "https://www.youtube.com/watch?v=lAJWHHUz8_8",
        text: "This is about GraphQL basics. Throughout the video...",
        quizUrl: "someURL"
      }
    ]
  }, 
];

var tutorial = {
  name: 'tutorial1',
  lessons: lessons
};


// export default lesson;
export default lessons;