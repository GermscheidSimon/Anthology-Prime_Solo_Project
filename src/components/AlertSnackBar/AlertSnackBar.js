import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

    function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
    }
  
  
    const  AlertSnackBar = () => {


    const [open, setOpen] = useState(false);
  
        useEffect(() => {
            setOpen(true);
        }, [open])

        const handleClose = () => {
        setOpen(false);
        };
    
        const styles = {
            snackBar: {
                postiion: 'fixed',
                bottom: '150px',
            }
        }
    
    return (
      <div className="snackBarPosition">
        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={TransitionLeft}
          message="I love snacks"
          key={'slideLeft'}
          style={styles.snackBar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        />
      </div>
    );
  }
  export default AlertSnackBar;