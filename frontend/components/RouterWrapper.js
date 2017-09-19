import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonPreviewContainer from './LessonPreviewContainer.js';
import Lessons from '../testing/dummyData.js';

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
                  lessons= { Lessons }
                /> 
              )}
            />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;