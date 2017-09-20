import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonPreviewContainer from './LessonPreviewContainer.js';
import Lesson from './Lesson.js';
import LessonCreator from './LessonCreator';
import User from './User';
import Login from './Login';


class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  login() {
    this.setState({ loggedIn: true });
  }

  // login(username, passowrd) {
  //   let data = {
  //     username: username,
  //     passowrd: password
  //   };
  //   fetch('/login', {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     credentials: "same-origin"
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if(data.loggedIn === true) {
  //       this.setState({ 
  //         username: data.username,
  //         loggedIn: true,
  //         displayLogginError: false
  //        });
  //     } else {
  //       this.setState({ displayLogginError: true });
  //     }
  //   })
  //   .catch((err), console.log('Error Logging In!', err));
  // }

  logout() {
    this.setState({ loggedIn: false });
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
              component={ LessonCreator }
            />
            <Route path='/user'
              component={ User }
            />
          </Switch>) :
          (<Switch>
              <Route path='*' render={ () => 
                <Login login={ this.login } displayLogginError={ this.state.displayLogginError } />
              }/>
            </Switch>)
            }
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;