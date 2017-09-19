import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonPreviewContainer from './LessonPreviewContainer.js';
import Lessons from '../testing/dummyData.js';

ReactDOM.render((
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
), document.getElementById('App'));