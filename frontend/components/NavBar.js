import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        <span><input type='text' placeholder='Enter a search term!'/> <button>Search</button>      </span>
        <span><Link to='/lesson/0'>LessonTester   |  </Link></span>
        <span><Link to='Link2'>Link2  |  </Link></span>
        <hr/>
      </div>
    );
  }
}

export default NavBar;