import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TrackList from '../TrackList/TrackList'


function TrackQueueTable(props) {




  return (
    <div className="TrackQueueWrap">
        {   props.store.tracklist.trackQueue.length > 1 ?
             <TrackList deleteTrack={false} tracks={props.store.tracklist.trackQueue} />
             :
             <></>
        }
    </div>
  );
}

export default connect(mapStoreToProps)(TrackQueueTable);
