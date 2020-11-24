import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import {connect} from 'react-redux'

import PlaylistMenuIcon from '../PlaylistMenuIcon/PlaylistMenuIcon'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



 const PlaylistMenu = (props) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [open, setModalOpen] = useState(false);
  const [playlistName, setName] = useState('')

  const handleClick = (event) => {
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
        type: "DELETE_PLAYLIST",
        payload: props.playlistID
    })
    handleItemClick()
  }
  const HandlePlaylistNameEdit = () => {
    if (playlistName !== '') {
      props.dispatch({
          type: "EDIT_PLAYLIST_NAME",
          payload: {playlistName: playlistName, playlistID: props.playlistID}
      })
      setModalOpen(false)
      setName('')
      setMenuPosition(null);
    } 
    
  }

  const handleClickOpen = () => {
    setName('')
    setModalOpen(true);
  };

  const handleClose = () => {
    setName('')
    setModalOpen(false);
  };
  const handleChange = (event) => {
    setName(event.target.value)
  }
 

  return (
    <div onClick={handleClick}>
        <PlaylistMenuIcon />

        <Menu
          open={!!menuPosition}
          onClose={() => setMenuPosition(null)}
          anchorReference="anchorPosition"
          anchorPosition={menuPosition}
        >
          <MenuItem onClick={() => handlePlaylistDelete()}>Delete Playlist</MenuItem>
          <MenuItem onClick={() => handleClickOpen()}>Edit Playlist Name</MenuItem>
        </Menu>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new name for your playlist: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event)}
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={HandlePlaylistNameEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(mapStoreToProps)(PlaylistMenu);
