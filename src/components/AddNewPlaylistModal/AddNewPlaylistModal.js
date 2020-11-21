import React from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function AddNewPlaylistModal(props) {
  const [open, setOpen] = React.useState(false);
  const [playlistName, setName] = React.useState('')

  const handleClickOpen = () => {
    setName('')
    setOpen(true);
  };

  const handleClose = () => {
    setName('')
    setOpen(false);
  };

  const handleAddPlaylist = () => {
    if (playlistName !== '') {
        props.dispatch({
            type: "CREATE_PLAYLIST",
            payload: playlistName
        })
        setOpen(false)
        setName('')
    } else {

    }
  }
  const handleChange = (event) => {
    setName(event.target.value)
  }
  return (
    <div>
      <div  className="playlist-card" onClick={handleClickOpen}>
        Add New Playlist
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter an Name for your new playlist:
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
          <Button onClick={handleAddPlaylist} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect()(AddNewPlaylistModal);