import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import {connect} from 'react-redux'

import NestedMenuItem from "material-ui-nested-menu-item";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  const handleSongDelete = (track_id) => {
      props.dispatch({
          type: "DELETE_TRACK",
          payload: track_id
      })
      handleItemClick()
  }
  const handlePlaylistRemove = (track_id, playlist_id) => {
      console.log(props);
      
    props.dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: {trackID: track_id, playlistID: playlist_id}
    })
    handleItemClick()
}
const handleAddToQueue = (track) => {
    props.dispatch({
        type: "ADD_TRACK_TO_TRACKLIST",
        payload: track
    })
    handleItemClick()
}


  return (
    <div onClick={handleRightClick}>
        <MoreVertIcon fontSize="small"/>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
          {props.deleteTrack ? 
                <MenuItem onClick={() => handleSongDelete(props.trackID)}>Delete Track</MenuItem>
            :
                <MenuItem onClick={() => handlePlaylistRemove(props.trackID, props.store.playlist[0].id)}>- From Playlist</MenuItem>
          }
       
        <MenuItem onClick={() => handleAddToQueue(props.track)}>Add to Queue</MenuItem>
        <NestedMenuItem
          label="Add To Playlist"
          parentMenuOpen={!!menuPosition}
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
