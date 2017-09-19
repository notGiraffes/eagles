import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonPreviewContainer from './LessonPreviewContainer.js';
import Lesson from './Lesson.js';
import lessons from '../testing/dummyData.js';

class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    };
    
    this.getLessons = this.getLessons.bind(this);
  }

  componentDidMount() {
    this.getLessons();
  }

  getLessons() {
    return fetch('/lessons')
    .then((res) => res.json())
    .then((lessons) => this.setState({lessons}))
    .catch((err) => console.log('Error getting lessons', err));
  }

  queryDataBaseWithSearchInput(searchInput) {
    this.getLessons()
    .then((results) => {
      console.log(this.state.lessons);
      // var previousLessons = this.state.lessons;
      var filteredLessons = this.state.lessons.filter((lesson) => { 
        if (lesson.name === searchInput)  {
          return lesson;
        }
      });
      this.setState({
        lessons: filteredLessons
      });
      console.log(this.state.lessons)
    })
  }


  render() {
    return (
      <BrowserRouter>
        <App queryDataBaseWithSearchInput={this.queryDataBaseWithSearchInput.bind(this)}>
          <Switch>
            <Route exact path='/'
              render={() => (
                <LessonPreviewContainer 
                  lessons= { this.state.lessons }
                /> 
              )}
            />
            <Route path='/lesson/:id'
              component={ Lesson }
            />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;