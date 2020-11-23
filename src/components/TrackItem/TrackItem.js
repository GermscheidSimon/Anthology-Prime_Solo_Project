import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NestedContextMenu from '../NestedContextMenu/NestedContextMenu'

/**
 * Requires the following props -- a JSON called 
 * 'track' with following keys:  {id:, name:, artist:, album:}
 */
const  TrackItem = (props) => {
  
    return (
        <tr key={props.track.id}  >
            <td onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.listNum}</td>
            <td onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.name}</td>
            <td onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.artist}</td>
            <td onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.album}</td>
            <td><NestedContextMenu trackID={props.track.id}/></td>
        </tr>
    );
}

export default connect(mapStoreToProps)(TrackItem);
