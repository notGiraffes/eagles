import React, { Component } from 'react';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar queryDataBaseWithSearchInput={this.props.queryDataBaseWithSearchInput}/>
        { this.props.children || 'no children!' }
      </div>
    );
  }
}



export default App;