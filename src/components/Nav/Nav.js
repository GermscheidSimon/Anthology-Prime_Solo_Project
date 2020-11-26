import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

import LogOutButton from '../LogOutButton/LogOutButton'

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
       {props.store.user.id &&
         <LogOutButton/>
         }

        <div className="nav-cluster">
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
           <Link className="nav-link" to="/library">
              Library
            </Link>
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
