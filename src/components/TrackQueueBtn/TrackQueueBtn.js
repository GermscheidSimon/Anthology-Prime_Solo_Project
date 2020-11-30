import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function TrackQueueBtn(props) {

  const [arrowDirectionUp, setDirection] = useState(true);

  const handleToggleArrow = () => {
      setDirection(!arrowDirectionUp)
  }

  return (
    <div>
      {
          arrowDirectionUp ? 
            <ExpandLessIcon style={{fontSize: 60}} onClick={handleToggleArrow}/>
          :
            <ExpandMoreIcon style={{fontSize: 60}} onClick={handleToggleArrow}/>

      }
    </div>
  );
}

export default connect(mapStoreToProps)(TrackQueueBtn);
