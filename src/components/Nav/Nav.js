import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/library';
    loginLinkData.text = 'Library';
  }

  return (
  <div className="nav">
        <div className="titleWrap">
          <Link to="/home" className="nav-title">
            Anthology
          </Link>
        </div>
      
        {/* Always show this link since the about page is not protected */}
        {/* <div className="nav-right">
            <Link className="profile-link" to="/about">
              About
            </Link>
            <LogOutButton className="profile-link" />
        </div> */}
        <div className="nav-cluster">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/library/playlists">
              Playlists
            </Link>
                  {/* <Link className="nav-link" to="/info">
                    Info Page
                  </Link> */}
            <Link  className="nav-link" to="/addNewTrack">
              Upload
            </Link>
            
          </>
        )}
        </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
