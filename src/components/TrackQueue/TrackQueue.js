import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './TrackQueue.css'

function TrackQueue(props) {

    const [trackQueueRendered, setQueueRenderStatus] = useState(false)

    const handleTrackQueueOpen = () => {
        setQueueRenderStatus(!trackQueueRendered)
    }


  return (
    <div>
    <button onClick={()=> handleTrackQueueOpen()}>Queue</button>
        {
            trackQueueRendered ? 
                <div className="trackQueueWrap">
                    <p>Now Playling:  </p>
                     <table >
                         <thead>
                            <tr>
                                <th>#</th>
                                <th>Track</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.store.tracklist.trackQueue.length > 0 ?
                                    props.store.tracklist.trackQueue.map( (track, index) => {
                                        return( 
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{track.name}</td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr>
                                    there's nothing here yet! 
                                </tr>
                            }
                        </tbody>
                    </table> 
                </div>
            :
                <></>
        }
       
    </div>
  );
}

export default connect(mapStoreToProps)(TrackQueue);
