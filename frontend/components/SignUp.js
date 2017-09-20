import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <Form horizontal onSubmit={ (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password); 
      }}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Username</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Username'
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Password</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Password'
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <Button type="submit">
              Log In!
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Login;