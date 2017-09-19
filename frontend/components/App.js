import React, { Component } from 'react';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
  }

  queryDataBaseWithSearchInput(lessonRetrievalFunction, searchInput) {
    var lessonDatabase = lessonRetrievalFunction();
    var filteredLessons = lessonDatabase.filter((lesson) => {
      if (lesson.name === searchInput)  {
        return lesson;
      }
    });
    return filteredLessons;
  }

  render() {
    return (
      <div>
        <NavBar queryDataBaseWithSearchInput={this.queryDataBaseWithSearchInput} />
        { this.props.children || 'no children!' }
      </div>
    );
  }
}



export default App;