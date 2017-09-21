import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Navbar } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  retrieveSearchInput(searchInput) {
    this.setState({
      searchInput: searchInput.target.value
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.props.queryDataBaseWithSearchInput(this.state.searchInput);
  }

  render(props) {
    return (
      <Navbar>
        <Navbar.Form pullLeft>
          <Form onSubmit={ (e) => {
            e.preventDefault();
            this.retrieveSearchInput.call(this, event);
          }}>
            <FormGroup>
              <FormControl type='text' placeholder='Enter a search term!' onChange={this.retrieveSearchInput.bind(this)}/>
            </FormGroup>{' '}
            <Button type="submit" onClick={this.handleSearchSubmit}>
              <Link to='/'>Search</Link>
            </Button>{' '}
          <span>
          <Link to='/create'>
            <Button>Create</Button>
          </Link>{' '}
          <Link to='/'>
            <Button onClick={ this.props.getLessons }>Home</Button>
          </Link>{' '}
          <Link to='/user'>
            <Button>Your Account</Button>
          </Link>{' '}
          <Button onClick={this.props.logout}>Logout</Button>{' '}
        </span>
        </Form>
        </Navbar.Form>
      </Navbar>
    );
  }
}

export default NavBar;


// Can change input and button to elements within a form field which should mean you can submit by hitting enter as well as clicking submit