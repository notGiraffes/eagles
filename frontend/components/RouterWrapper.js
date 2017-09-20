import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LessonPreviewContainer from './Lesson/LessonPreviewContainer.js';
import Lesson from './Lesson/Lesson.js';
import LessonCreator from './Creator/LessonCreator';
import User from './User';
import Login from './Auth/Login';


class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      loggedIn: false,
      displayLogginError: false,
      username: 'Colin',
      userRef: '1234'
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getLessons = this.getLessons.bind(this);
    this.createAccount = this.createAccount.bind(this);
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
      var filteredLessons = this.state.lessons.filter((lesson) => { 
        var lowerSearchInput = searchInput.toLowerCase();
        var lowerLessonName = lesson.name.toLowerCase();
        if (lowerLessonName === lowerSearchInput || lowerSearchInput === '') {
          return lesson;
        }
      });
      this.setState({
        lessons: filteredLessons,
      });
      console.log(this.state.lessons)
    })
  }

  createAccount(username, passowrd) {
    console.log('IMPLIMENT THIS TO CREATE ACCOUNTS!!!')
  }

  login(username, password) {
    let data = {
      username: username,
      passowrd: password
    };
    fetch('/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('got data', data);
      if(data.loggedIn === true) {
        this.setState({ 
          username: data.username,
          loggedIn: true,
          displayLogginError: false
         });
      } else {
        this.setState({ displayLogginError: true });
      }
    })
    .catch((err) => console.log('Error Logging In!', err));
  }

  logout() {
    this.setState({ 
      loggedIn: false,
      displayLogginError: false,
      username: '',
      userRef: ''
     });
  }


  render() {
    return (
      <BrowserRouter>
        <App queryDataBaseWithSearchInput={this.queryDataBaseWithSearchInput.bind(this)} logout={this.logout}>
          { this.state.loggedIn ?
         (<Switch>
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
            <Route path='/create'
              render={ () => <LessonCreator username={this.state.username} userRef={this.state.userRef} /> }
            />
            <Route path='/user' render={ () => 
                <User 
                  username={ this.state.username }
                />
              }
            />
            <Route path='/logout' render={ () => {
              this.logout();
              return <Redirect to='/'/>
              }}
            />
          </Switch>) :
          (<Switch>
              <Route path='*' render={ () => 
                <Login login={ this.login } 
                       displayLogginError={ this.state.displayLogginError }
                       createAccount={ this.createAccount }
                />
              }/>
            </Switch>)
            }
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;