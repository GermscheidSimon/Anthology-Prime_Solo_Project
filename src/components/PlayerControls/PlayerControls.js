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
        currentSong: '/',         // initial state of component at the begining of lifecycle (ComponentDidUpdate)
        audioElement: createRef(), // instance of audio ref to manage HTML interactions (see audio tag in render)
        trackIsPlaying: false,      // state of currently playing track. see (TogglePlayback, ComponentDidUpdate)
        updateNewTrack: false,     // flag for switching songs  see(ComponentDidUpdate)
        currentTime: '00:00',      // current time of track see (handleCurrentTime and interval)
        sourceDuration: '00:00',
        interval: null,            // used to update DOM as while track is played. see (componentDidMount, handleCurrentTime)
        locationInPlaylist: 0,      // initial location. Updated as next songs play from store.tracklist
        trackqueue: [],
        volume: 0            
    }

    // once the component is rendered, begin playing back the tracklist
    componentDidMount = () => {
        console.log(this.props.trackQueue, this.state);
        
        let intervalID = setInterval(this.handleCurrentTime, 1000);
        this.setState(() => ({
            interval: intervalID,
            locationInPlaylist: 0,
        }));
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

    componentDidUpdate = () => {
        try {
            if (this.props.trackQueue !== this.state.trackQueue) {
                console.log('songswitch');
                
                this.setState((state, props) => ({
                    trackQueue: props.trackQueue,
                    currentSong: props.trackQueue[0],
                    locationInPlaylist: 0,
                    updateNewTrack: true,
                    trackIsPlaying: true
                }));
    
            }    
        } catch (error) {
            console.log(error);
        } finally{ 
                if (this.state.updateNewTrack === true) { // if the component audio needs to be reloaded
                    console.log('reload audio');
                    console.log('state', this.state);
                    
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
        
    }


    handleSongSwitch = () => {
        this.state.audioElement.current.pause();
        this.state.audioElement.current.load();
        this.state.audioElement.current.play();
    }


    // this is tied to this componenents interval on component did mount. this will update the song position clock 
    handleCurrentTime = () => {
    
        let songPosition = this.state.audioElement.current.currentTime
        
             this.setState({
                 currentTime: this.convertTimeToDigital(songPosition)
             })
        console.log('interval');        
    }
    convertTimeToDigital = (time) => {
        let minutes = Math.floor(time / 60) 
        let seconds = Math.floor(time % 60)
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
        let convertedTime = `${minutes}:${seconds}`;

        return  convertedTime
    }
    componentWillUnmount = () => {
        clearInterval(this.state.interval)
    }
    handNextTrack = () => {
        
        if (this.state.trackQueue.length > 1 && this.state.locationInPlaylist + 1 < this.state.trackQueue.length) {
            console.log('doing a thing');
            
            try {
                this.setState(() => ({
                    locationInPlaylist: this.state.locationInPlaylist + 1,
                    currentSong: this.state.trackQueue[this.state.locationInPlaylist + 1],
                }));
                
            } catch (error) {
                console.log(error);
            } finally {
                this.handleSongSwitch()
                console.log(this.state.locationInPlaylist);
                
            }
        } 
    }
    handlePrevTrack = () => {
        
        if (this.state.trackQueue.length > 1 && this.state.locationInPlaylist - 1 > 0) {
            console.log('doing a thing');
            
            try {
                this.setState(() => ({
                    locationInPlaylist: this.state.locationInPlaylist - 1,
                    currentSong: this.state.trackQueue[this.state.locationInPlaylist - 1],
                }));
                
            } catch (error) {
                console.log(error);
            } finally {
                this.handleSongSwitch()
                console.log(this.state.locationInPlaylist);
                
            }
        } 
    }
    // this function intakes the new value from the slider, and converts it into a percent to plug into the audio volume property
    adjustVolume = (event) => {
        this.state.audioElement.current.volume = event.target.value / 100;
    }
    handleSetSongDuration = () => {
        this.setState({
            sourceDuration: this.convertTimeToDigital(this.state.audioElement.current.duration)
        })
    }

  render() {

    let track = this.state.currentSong
    return (
        <div className="playerControlsWrap">

            <audio 
                key={track.id} 
                ref={this.state.audioElement}
                onEnded={this.handNextTrack}
                onLoadedMetadata={this.handleSetSongDuration}
            >
                <source src={track.songDir}/>
            </audio>

            <div className="songInfoWrap">
                <div className="songTitle"> {track.name} </div>
                  <div className="songInfoSecondary">
                    <div> {track.album} </div>
                    <div> {track.artist} </div>
                    <div>{this.state.currentTime} - {this.state.sourceDuration}</div>
                </div>
            </div>
            <div className="songNavigation">
                <button onClick={this.handlePrevTrack}>Previous</button>
                {
                    this.state.trackIsPlaying ?
                    <button onClick={() => this.togglePlayback()}>Pause</button>
                    :
                    <button onClick={() => this.togglePlayback()}>Play</button>
                }
                <button onClick={this.handNextTrack}>Next</button>
            </div>
            {/** --Volume Control-- range slider. audio element volume must be a valume between 0 and 1. see adjustvolume */}
            <div className="songVolume">
                <input onChange={(event) =>this.adjustVolume(event)} type="range" min="1" max="100" />
            </div>
            <div className="songQueue">
                <button>Display Song Queue</button>
            </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
