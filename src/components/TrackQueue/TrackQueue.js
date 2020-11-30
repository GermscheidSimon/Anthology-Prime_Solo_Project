import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TrackQueueBtn from '../TrackQueueBtn/TrackQueueBtn'

import './TrackQueue.css'

function TrackQueue(props) {

    const [trackQueueRendered, setQueueRenderStatus] = useState(false)

    const handleTrackQueueOpen = () => {
        setQueueRenderStatus(!trackQueueRendered)
    }

    const checkIfCurrentSong = (track, index) => {
        console.log(track)
        if (track.name === props.currentSong.name && index === props.cuurentIndex) {
            return "currentSongStyling"
        } else {
            return "queueRowStyling"
        }
    }


  return (
    <div>
        <div onClick={()=> handleTrackQueueOpen()}>
            <TrackQueueBtn />
        </div>
        {
            trackQueueRendered ? 
                <div className="trackQueueWrap">
                    <div className="TrackQueueInner">
                            <p className="trackQueueHeader" >Now Playling:  </p>
                            <table className="trackQueueTable">
                                <thead>
                                    <tr>
                                        <th className="trackIndex">#</th>
                                        <th>Track</th>
                                    </tr>
                                </thead>
                            <tbody className="trackQueueBody">
                                {
                                    props.store.tracklist.trackQueue.length > 0 ?
                                        props.store.tracklist.trackQueue.map( (track, index) => {

                                            let styleCurrentTrack = checkIfCurrentSong(track, index);

                                            return( 
                                                <tr className={styleCurrentTrack} key={index}>
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
                </div>
            :
                <></>
        }
       
    </div>
  );
}

export default connect(mapStoreToProps)(TrackQueue);
