import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {withRouter} from 'react-router-dom'

import {makeStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

function PlaylistItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
    const navigateToPlaylist = (playlistID) => {
        props.history.push(`/library/playlist/${playlistID}`)
        console.log(props);
        
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
    <div  className={classes.root}>
        <Paper  
          className={classes.paper}
          elevation={6} 
          onClick={() => navigateToPlaylist(props.playlist.id)}
        >
        
            <div > {props.playlist.playlistName} </div>
            <hr style={{color: '#1b2427c7'}}></hr>
            <LibraryMusicIcon style={{ fontSize: 120, color: '#1b2427c7'}} />
        </Paper>
        
    </div>
  );
}


export default withRouter(connect(mapStoreToProps)(PlaylistItem));
