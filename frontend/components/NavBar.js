import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
      <div>
        <Form inline onSubmit={(event) => {
              event.preventDefault();
              this.handleSearchSubmit.call(this, event)
              }}>
          <span>
            <FormControl type='text' placeholder='Enter a search term!' onChange={this.retrieveSearchInput.bind(this)}/>
              <Button onClick={this.handleSearchSubmit}>
                <Link to='/'>Search</Link>
              </Button>
          </span>
          <span>
            <Link to='/create'>
              <Button>Create</Button>
            </Link>
            <Link to='/'>
              <Button>Home</Button>
            </Link>
            <Link to='/user'>
              <Button>Your Account</Button>
            </Link>
            <Button onClick={ this.props.logout }>Logout</Button>
          </span>
        <hr/>
      </Form>
      </div>
    );
  }
}

export default NavBar;


// Can change input and button to elements within a form field which should mean you can submit by hitting enter as well as clicking submit