import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import {connect} from 'react-redux'

import PlaylistMenuIcon from '../PlaylistMenuIcon/PlaylistMenuIcon'


 const PlaylistMenu = (props) => {
  const [menuPosition, setMenuPosition] = useState(null);

  const handleRightClick = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    console.log(event);
    
    setMenuPosition({

      top: event.clientY,
      left: event.clientX
    });
  };

  const handleItemClick = () => {
    setMenuPosition(null);
  };
  const handlePlaylistDelete = () => {
    props.dispatch({
        type: "",
        payload: ''
    })
    handleItemClick()
  }
  const HandlePlaylistNameEdit = () => {
    console.log('display modal');
    handleItemClick();
  }
 

  return (
    <div onClick={handleRightClick}>
        <PlaylistMenuIcon />
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={() => handlePlaylistDelete()}>Delete Playlist</MenuItem>
        <MenuItem onClick={() => HandlePlaylistNameEdit()}>Edit Playlist Name</MenuItem>
      </Menu>
    </div>
  );
};

export default connect(mapStoreToProps)(PlaylistMenu);
