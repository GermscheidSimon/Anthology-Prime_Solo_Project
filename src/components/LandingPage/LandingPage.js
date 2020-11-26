import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm'
class LandingPage extends Component {
  state = {
    heading: 'Welcome To Anthology!',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Anthology is a free to use self-serve personal music streaming platform. Host your own instance, and u
              pload your own media. It will handle organizing your music for you, and allow you to focus on listening
              to your collection!
           </p>

            <p> Features:
              <ul>
                <li>Anthology comes equipped with it's own full featured music player </li>
                <li>Manage your library and create your own playlists!</li>

              </ul>
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
