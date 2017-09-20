import React, { Component } from 'react';

class Logout extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (<div>You have been logged out!</div>);
  }
} 

export default Logout;