import React, { Component } from 'react';

// Router middleware
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

//
import { connect } from 'react-redux';

// main app componentes
import Nav from '../Nav/Nav';
    // Render player controls handles Player controls when user is signed in.
import RenderPlayerControls from '../RenderPlayerControls/RenderPlayerControls'

// linked pages
    // login required
import Playlist from '../Playlist/Playlist';
import InfoPage from '../InfoPage/InfoPage';
import Library from '../Library/Library';
import PlaylistPage from '../PlaylistPage/PlaylistPage'
import AddNewTrack from '../AddNewTrack/AddNewTrack'
    // no longin required
import LandingPage from '../LandingPage/LandingPage';
import AboutPage from '../AboutPage/AboutPage';


// login & register -- 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // client side authorization 
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div className="appMain">
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />
            <ProtectedRoute
              // if user signed in, allow user to visit a playlist by ID.
              exact
              path={`/library/playlist/:id`}
              component={Playlist} 
            />
              <ProtectedRoute
              // if user signed in, allow user to visit a playlist by ID.
              exact
              path={`/addNewTrack`}
              component={AddNewTrack} 
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              exact
              path="/library"
              component={Library}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              // logged in shows Playlists nav option. Will display a list of playlists that use has created
              exact
              path="/library/playlists"
              component={PlaylistPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/Library"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/library"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/library"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/library"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/library"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/library"
            />
            
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404. Either Page does not exist, or was unable to handle your request.</h1>} />
          </Switch>
          <RenderPlayerControls />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
