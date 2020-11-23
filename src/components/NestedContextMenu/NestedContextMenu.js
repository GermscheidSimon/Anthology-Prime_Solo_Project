import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import {connect} from 'react-redux'

import NestedMenuItem from "material-ui-nested-menu-item";

 const NestedContextMenu = (props) => {
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
  const handlePlaylistAdd = (playlist_id, track_id) => {
      let trackAdd = {
          trackID: track_id,
          playlistID: playlist_id
      }
    props.dispatch({
        type: "ADD_TOO_PLAYLIST",
        payload: trackAdd
    })
    handleItemClick()
  }

  return (
    <div onClick={handleRightClick}>
      <Typography>option</Typography>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={handleItemClick}>Delete</MenuItem>
        <MenuItem onClick={handleItemClick}>Add to Queue</MenuItem>
        <NestedMenuItem
          label="Add To Playlist"
          parentMenuOpen={!!menuPosition}
          onClick={handleItemClick}
        >
          {props.store.playlists.map( playlist => {
              return <MenuItem onClick={() => handlePlaylistAdd(playlist.id, props.trackID)}>{playlist.playlistName}</MenuItem>
          })}
        </NestedMenuItem>
      </Menu>
    </div>
  );
};

export default connect(mapStoreToProps)(NestedContextMenu);
