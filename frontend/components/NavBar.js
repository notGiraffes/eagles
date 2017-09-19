import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <div>
    <span><Link to='/lesson/0'>LessonTester   |  </Link></span>
    <span><Link to='Link2'>Link2  |  </Link></span>
    <span><Link to='Link3'>Link3  |  </Link></span>
    <span><Link to='Link4'>Link4  |  </Link></span>
    <hr/>
  </div>
);

export default NavBar;