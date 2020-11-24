import React, {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NestedContextMenu from '../NestedContextMenu/NestedContextMenu'

import './TrackItem.css'

/**
 * Requires the following props -- a JSON called 
 * 'track' with following keys:  {id:, name:, artist:, album:}
 */
const  TrackItem = (props) => {
    
    const [menuIsRendered, setRender] = useState(false)
    
  
    return (
        <tr key={props.track.id}  className="trackListRow" onMouseEnter={()=>setRender(true)} onMouseLeave={()=>setRender(false)}>
            {menuIsRendered ? 
                <td className="trackOptionMenu" >
                    <NestedContextMenu 
                        trackID={props.track.id} 
                        deleteTrack={props.deleteTrack} t
                        track={props.track}
                    />
                </td>
            :
                <td className="trackOptionMenu">{props.listNum}</td>
            }
            <td className="trackListTableBodyTD" onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.name}</td>
            <td className="trackListTableBodyTD" onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.artist}</td>
            <td className="trackListTableBodyTD" onClick={() => props.dispatch({type: 'FETCH_SONG', payload: props.track.id})}>{props.track.album}</td>
        </tr>
    );
}

export default connect(mapStoreToProps)(TrackItem);
