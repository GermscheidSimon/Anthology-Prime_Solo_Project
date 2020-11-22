import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

/**
 * Requires the following props -- a JSON called 
 * 'track' with following keys:  {id:, name:, artist:, album:}
 */
const  TrackItem = (props) => {
  
    return (
        <tr key={props.track.id}  onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>
            <td>{props.listNum}</td>
            <td>{props.track.name}</td>
            <td>{props.track.artist}</td>
            <td>{props.track.album}</td>
        </tr>
    );
}

export default connect(mapStoreToProps)(TrackItem);
