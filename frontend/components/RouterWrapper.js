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

  render() {
    return (
      <BrowserRouter>
        <App>
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

  getLessons() {
    fetch('/lessons')
    .then((res) => res.json())
    .then((lessons) => this.setState({lessons}))
    .catch((err) => console.log('Error getting lessons', err));
  }
}

export default RouterWrapper;