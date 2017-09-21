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
      user: {}
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getLessons = this.getLessons.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.queryDataBaseWithSearchInput = this.queryDataBaseWithSearchInput.bind(this);
    this.organizeSearchResultsBasedOnMostLikes = this.organizeSearchResultsBasedOnMostLikes.bind(this);
  }

  componentDidMount() {
    this.getLessons();
  }

  getLessons() {
    return fetch('/lessons', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((lessons) => this.setState({lessons}))
    .catch((err) => console.log('Error getting lessons', err));
  }

  queryDataBaseWithSearchInput(searchInput) {
    this.getLessons()
    .then((results) => {
      var filteredLessons = this.state.lessons.filter((lesson) => { 
        var lowerSearchInput = searchInput.toLowerCase();
<<<<<<< HEAD
=======
        console.log(lesson);
>>>>>>> working on delete function, refactoring
        if (lesson.keyWords.includes(lowerSearchInput) || lowerSearchInput === '') {
          return lesson;
        }
      });
      this.setState({
        lessons: filteredLessons,
      });
      console.log(this.state.lessons)
    })
  }

  organizeSearchResultsBasedOnMostLikes() {
    var lessons = this.state.lessons;
    lessons.sort(function(lesson1, lesson2) {
      return lesson1.likes - lesson2.likes;
    })
    this.setState({
      lessons: lessons
    });
  }

  createAccount(username, password) {
    let data = {
      username,
      password
    };
    fetch('/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('got data', data);
      if(data.loggedIn === true) {
        this.setState({ 
          user: data.userData,
          loggedIn: true,
          displayLogginError: false
         });
      } else {
        this.setState({ displayLogginError: true });
      }
    })
    .catch((err) => console.log('Error creating an account In!', err));
  }

  login(username, password) {
    let data = {
      username: username,
      password: password
    };
    fetch('/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('got data', data);
      if(data.loggedIn === true) {
        this.setState({ 
          user: data.userData,
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
    console.log('logging out');
    fetch('/logout', {
      method: "GET",
      credentials: "include"
    });
    this.setState({ 
      loggedIn: false,
      displayLogginError: false,
      user: {}
     });
  }

  render() {
    return (
      <BrowserRouter>
        <App 
        queryDataBaseWithSearchInput={ this.queryDataBaseWithSearchInput } 
        logout={ this.logout } 
        getLessons={ this.getLessons }
        >
          { this.state.loggedIn ?
         (<Switch>
            <Route exact path='/'
              render={() => (
                <LessonPreviewContainer 
                  lessons= { this.state.lessons }
                  organizeSearchResultsBasedOnMostLikes={ this.organizeSearchResultsBasedOnMostLikes }
                /> 
              )}
            />
            <Route path='/lesson/:id'
              component={ Lesson }
            />
            <Route path='/create'
              render={ () => <LessonCreator username={this.state.user.username} userRef={this.state.user._id} /> }
            />
            <Route path='/user' render={ () => 
                <User 
                  user={ this.state.user }
                  getLessons={ this.getLessons }
                />
              }
            />
            <Route path='/logout' render={ () => {
              console.log('logging out route');
              return <Logout logout={ this.logout }/>
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