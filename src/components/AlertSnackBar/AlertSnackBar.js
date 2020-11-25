import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar';

import mapStoreToProps from '../../redux/mapStoreToProps';

import MuiAlert from '@material-ui/lab/Alert'

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
  
    const  AlertSnackBar = (props) => {


    const [open, setOpen] = useState(false);
    
  
        useEffect(() => {            
            setOpen(props.store.snackBarState.isRendered);
        }, [open, props.store.snackBarState])

        const handleClose = () => {
            props.dispatch({
                type: "CLOSE_SNACKBAR"
            })
        };
    
        const styles = {
            snackBar: {
                postiion: 'fixed',
                top: '175px',
            }
        }
    
    return (
      <div className="snackBarPosition">
        <Snackbar
          open={open}
          onClose={handleClose}
          key={'slideLeft'}
          autoHideDuration={4000}
          style={styles.snackBar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
            <Alert severity={props.store.snackBarState.errorType}>
                {props.store.snackBarState.message}
            </Alert>
        </Snackbar>
      </div>
    );
  }
  export default connect(mapStoreToProps)(AlertSnackBar);