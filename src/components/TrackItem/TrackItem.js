import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
const  TrackItem = (props) => {
  
    return (
        <tr key={props.track.id}  onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>
            <td>{props.track.id}</td>
            <td>{props.track.name}</td>
            <td>{props.track.artist}</td>
            <td>{props.track.album}</td>
        </tr>
    );
}

export default connect(mapStoreToProps)(TrackItem);
