import React from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {makeStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import QueueIcon from '@material-ui/icons/Queue';




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
            payload: {playlistName: playlistName}
        })
        setOpen(false)
        setName('')
    } else {

    }
  }
  const handleChange = (event) => {
    setName(event.target.value)
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
    },
    paper: {
      backgroundColor:  '#008183',
      "&:hover, &:focus": {
        backgroundColor: '#369091'
      },
      color: 'white',
      textAlign: 'center',
      paddingTop: '10px'
    }
  }));

  const classes = useStyles();


  return (
    <div>
      <div  className={classes.root} onClick={handleClickOpen}>
      <Paper  
          className={classes.paper}
          elevation={6} 
        >
            <div > Add New Playlist </div>
            <hr style={{color: '#1b2427c7'}}></hr>
            <QueueIcon style={{ fontSize: 120, color: 'white'}}/>
        </Paper>      
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter an name for your new playlist:
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