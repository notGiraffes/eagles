import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonPreviewContainer from './LessonPreviewContainer.js';
import Lesson from './Lesson.js';
import lessons from '../testing/dummyData.js';

class RouterWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path='/'
              render={() => (
                <LessonPreviewContainer 
                  lessons= { lessons }
                /> 
              )}
            />
            <Route path='/lesson' component={ Lesson } />
            <Route path='/lesson/:id'
              render={() => {
                return <div>{ JSON.stringify(this.props) }</div>
              }}
            />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;


// {/* <Lesson
// slides= { lessons[id].slides }
// /> */}