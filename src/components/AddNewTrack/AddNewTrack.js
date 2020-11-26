import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


import FileUploadIcon from '../FileUploadIcon/FileUploadIcon'
import './AddNewTrack.css'


const {read} = require('jsmediatags')

class AddNewTrack extends Component {
  state = {
    newTrackInfo: {
        name: '',
        artist: '',
        album: '',
        picture:  null
    },
    ReadyToUploadTracks: [],
  };

componentDidUpdate = (prevstate, state) => {
    if (state !== prevstate ) {
        
    }
}

handleTrackLabelRead = (file) => {
    // limitations from the jsmediatag plugin seem to require a call back function for error catching instead of being able to return the tag info
    // using a Reader constructor may work around this issue, but for simplicities sake, the tag will be read here, and the file will be passed in through the handleFileInput function. 
    read(file, {
        onSuccess: (tag) => { // read expects a callback function called onSuccess to exist, and will fire it off if MediaFileReader is able to read the file.
            console.log(tag);
            
            let newTrackInfo = {
                name: tag.tags.title,
                artist: tag.tags.artist,
                album: tag.tags.album,
                picture:  tag.tags.picture
            }
            this.setState({
                // add an object containing the file and the new track info from the above file read.
                ReadyToUploadTracks: [ ...this.state.ReadyToUploadTracks, {file: file, fileinfo: newTrackInfo } ],
            });
        },
        onError: (error) => { // if anything goes wrong onError will be fired instead
            console.log(error);
            alert('file add failed!')
        }
    })
}
deleteTrackFromUploadList = (fileinfo) => {
    for (const track of this.state.ReadyToUploadTracks) { // loop through the array of tracks to upload
        
        if (fileinfo.name === track.fileinfo.name) {
             // find the index of the track to delete, and splice from array
            this.setState({
                ReadyToUploadTrack: this.state.ReadyToUploadTracks.splice(this.state.ReadyToUploadTracks.indexOf(track), 1) // this may be mildly buggy ... 
            })
        }
    }
}

handleTrackInput = (event) => {
  let files = event.target.files // Files is an array of items in the file input 
    console.log(event);
    
    for (const file of files) {
        this.handleTrackLabelRead(file)
    }
}
hahandleSubmit = () => { 
    let stagedTracks = []

    for (const track of this.state.ReadyToUploadTracks) {
        let trackFile = new FormData();
        trackFile.append('file', track.file)
        let trackFileObj = {file: trackFile, trackInfo: track.fileinfo}
        stagedTracks.push(trackFileObj);
    }

    this.props.dispatch({
        type: "UPLOAD_TRACK",
        payload: stagedTracks
     })
}



  render() {
    return (
      <div className="addTrackFormWrap">
          <div>
             <div className="trackFileLabel" htmlFor="trackFile">Drop files here or click to browse:</div>
                <div className="fileDropZone" type="file" >
                    <input  name="newSong" className="trackFile"  onChange={this.handleTrackInput} type="file" multiple onDragEnd={this.handleTrackInput} onDrop={this.handleTrackInput} />                       
                </div>
            
                <button onClick={this.hahandleSubmit}>Upload Track</button>
            </div>

            <table className="UploadTable">
            <thead className="trackListTableHead">
              <tr>
                <th>Track Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th></th>
              </tr>
            </thead> 
            
            <tbody className="UploadTablebodyWrap">
                {this.state.ReadyToUploadTracks.map( track => {
                        return (
                            <tr className="UploadTableTR">
                                <td>{track.fileinfo.name}</td>
                                <td>{track.fileinfo.artist}</td>
                                <td>{track.fileinfo.album}</td>
                                <td><button onClick={() => this.deleteTrackFromUploadList(track.fileinfo)}>Remove</button></td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddNewTrack);
