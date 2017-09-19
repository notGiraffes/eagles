import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  retrieveSearchInput(searchInput) {
    this.setState({
      searchInput: searchInput.target.value
    });
  }


  handleSearchSubmit(event) {
    event.preventDefault();
    // Query server for info from database that matches this.state.searchInput
      // Need to add keywords or some criteria to filter database by
  }

  render(props) {
    return (
      <div>
        <span>
          <input type='text' placeholder='Enter a search term!' onChange={this.retrieveSearchInput.bind(this)}/> 
          <button onClick={this.handleSearchSubmit.bind(this)}>Search</button>      
        </span>
        <span><Link to='/lesson/0'>LessonTester   |  </Link></span>
        <span><Link to='Link2'>Link2  |  </Link></span>
        <hr/>
      </div>
    );
  }
}

export default NavBar;


// Can change input and button to elements within a form field which should mean you can submit by hitting enter as well as clicking submit