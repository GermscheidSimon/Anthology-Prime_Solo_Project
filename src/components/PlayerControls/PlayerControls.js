import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './PlayerControls.css'

/**
 * Player Controls---
 * 
 * The bread and butter of this whole operaiton. 
 * 
 *      > The audio tag requires a valid source when it is rendered. this means that the audio component can't exist before the client chooses to play something
 * The way around this is that this component is only rendered when the trackQueue is populated (SEE RenderPlayingControls). 
 * 
 *      > The audio tag requires some way to call it. Per React documentation (https://reactjs.org/docs/refs-and-the-dom.html) it is okay here to use an instance of a ref.
 * 
 *      > This component also uses getDerivedStateFromProps before it is mounted/rendered. This allows the component to fetch the first track in the trackQueue and begin playback 
 * once it is mounted
 * 
 * 
 */
class PlayerControls extends Component {
    state = {
        currentSong: null,         // initial state of component at the begining of lifecycle (ComponentDidUpdate)
        audioElement: createRef(), // instance of audio ref to manage HTML interactions (see audio tag in render)
        trackIsPlaying: true,      // state of currently playing track. see (TogglePlayback, ComponentDidUpdate)
        updateNewTrack: false,     // flag for switching songs  see(ComponentDidUpdate)
        currentTime: '00:00',      // current time of track see (handleCurrentTime and interval)
        interval: null,            // used to update DOM as while track is played. see (componentDidMount, handleCurrentTime)
        locationInPlaylist: 0      // initial location. Updated as next songs play from store.tracklist
    }

  // set a initial source before the component is rendered. 
    static getDerivedStateFromProps = (props, state) => {
        if (state.currentSong !== props.store.tracklist[0].songDir) {
            return {
                currentSong: props.store.tracklist[0].songDir
            } 
        } else {
            return null;
        }
    }

    // once the component is rendered, begin playing back the tracklist
    componentDidMount = () => {
        this.state.audioElement.current.play()
        let intervalID = setInterval(this.handleCurrentTime, 1000);
        this.setState({
            interval: intervalID
        });
    }

    // toggle play() and pause() options, and set current playback state
    togglePlayback = () => {
        if (this.state.trackIsPlaying) {
            this.state.audioElement.current.pause()
        } else {
            this.state.audioElement.current.play()
        }
        this.setState({
            trackIsPlaying: !this.state.trackIsPlaying,
        })
    }

    componentDidUpdate = (props, prevstate) => {
        
        if (props.store.currentSong.songDir) {; // need to wait until a source exists 

            if (props.store.currentSong.songDir !== prevstate.currentSong) { // if the current song to play was changed
                
                console.log('song dir changed', props.store.currentSong.songDir, prevstate.currentSong);
                if (prevstate.trackIsPlaying) {
                    this.setState({
                        currentSong: props.store.currentSong.songDir, // update the song source
                        updateNewTrack: true                          // flag the componenent to reload audio 
                    }); 
                } else if (prevstate.trackIsPlaying === false) {
                    this.setState({
                        currentSong: props.store.currentSong.songDir, // update the song source
                        updateNewTrack: true                          // flag the componenent to reload audio 
                    }); 

                    try {  // toggle playback. The track was selected, so the song should play. 
                        this.togglePlayback();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } 
        }

        if (this.state.updateNewTrack === true) { // if the component audio needs to be reloaded
                console.log('reload audio');
            try {
                this.handleSongSwitch();
                this.setState({
                    updateNewTrack: false 
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
        


    handleSongSwitch = () => {
        this.state.audioElement.current.pause();
        this.state.audioElement.current.load();
        this.state.audioElement.current.play();
    }


    // this is tied to this componenents interval on component did mount. this will update the song position clock 
    handleCurrentTime = () => {
    
        let songPosition = this.state.audioElement.current.currentTime
        let minutes = Math.floor(songPosition / 60) 
        let seconds = Math.floor(songPosition % 60)
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }

        let time = `${minutes}:${seconds}`;
             this.setState({
                 currentTime: time
             })
        console.log('interval');
        console.log(this.state);
        
    }
    componentWillUnmount = () => {
        clearInterval(this.state.interval)
    }

  render() {

    let track = this.props.store.currentSong
    return (
        <div className="playerControlsWrap">
            <audio ref={this.state.audioElement}>
                <source src={this.state.currentSong}/>
            </audio>

            <div className="songInfoWrap">
                <div className="songTitle"> {track.name} </div>
                  <div className="songInfoSecondary">
                    <div> {track.album} </div>
                    <div> {track.artist} </div>
                    <div>{this.state.currentTime} - {track.length}</div>
                </div>
            </div>
            <div className="songNavigation">
                <button>Previous</button>
                {
                    this.state.trackIsPlaying ?
                    <button onClick={() => this.togglePlayback()}>Pause</button>
                    :
                    <button onClick={() => this.togglePlayback()}>Play</button>
                }
                <button onClick={this.handleSongSwitch}>reload source</button>
            </div>
            <div className="songVolume">
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div className="songQueue">
                <button>Display Song Queue</button>
            </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
