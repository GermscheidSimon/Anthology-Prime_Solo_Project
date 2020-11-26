import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>
        <h2>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <center>
          <input
              type="text"
              name="username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              placeholder="Enter Username"
            />
            </center>
        </div>
        <div>
          <center>
          <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
            </center>
        </div>
        <div className="loginInput">
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
