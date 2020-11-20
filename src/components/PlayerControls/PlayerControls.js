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
 *      > this component gets its list of tracks from compoenntDidUpdate which is looking for new props (and array of songs to play)
 *      
 *      > See RenderPlayerControls compoennt for how this component is rendered(consumed)
 * 
 */
class PlayerControls extends Component {
    state = {
        currentSong: '/',         // initial state of component at the begining of lifecycle (ComponentDidUpdate)
        audioElement: createRef(), // instance of audio ref to manage HTML interactions (see audio tag in render)
        trackIsPlaying: false,      // state of currently playing track. see (TogglePlayback, ComponentDidUpdate)
        updateNewTrack: false,     // flag for switching songs  see(ComponentDidUpdate)
        currentTime: '00:00',      // current time of track see (handleCurrentTime and interval)
        sourceDuration: '00:00',    // song duration see handleSetSongDuration() and <audio> tag for onMetaDataLoad event
        interval: null,            // used to update DOM as while track is played. see (componentDidMount, handleCurrentTime)
        locationInPlaylist: 0,      // initial location. Updated as next songs play from store.tracklist
        trackQueue: [],             // an array of objects containing all the songs to play. Updated in componentDidUpdate
        volume: 0                  // local state of the volume for the audio tag
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
            // when the props arrive into the trackQueue reducer, the compoennt needs to update in order to begin playback
            if (this.props.trackQueue !== this.state.trackQueue) {
                console.log('songswitch');
                
                this.setState((state, props) => ({
                    trackQueue: props.trackQueue,       //sets local trackQueue array
                    currentSong: props.trackQueue[0],   // setting the current song to the firs track in the playlist
                    locationInPlaylist: 0,              // setting a iterable number to manage where the player is at in the queue
                    updateNewTrack: true,               // setting a variable so componentDidUpdate knows to reload source
                    trackIsPlaying: true                // when the source arrives, make sure state is set to 'is playing' to manage the play/pause controls
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

    // audio sources cannot be directly modified. After a source is changed the element must undergo a load() phase
    // this function handles that task. 
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
    // this will take in a total seconds (time) amount, and convert it to a more readable digital clock (mm:ss)
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
    // need to dump the interval created to manage time updating on the DOM when the component life cyle ends.
    componentWillUnmount = () => {
        clearInterval(this.state.interval)
    }
    // this function handles navigating the trackqueue forwards, and then handles reloading the audio source when complete. 
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
    // this function handles navigating the trackqueue backwards, and then handles reloading the audio source when complete.
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
    // this function is fired when the audio source fires 'onMetaDataLoad', and will push a value of the song duration to state
    handleSetSongDuration = () => {
        this.setState({
            sourceDuration: this.convertTimeToDigital(this.state.audioElement.current.duration)
        })
    }

  render() {

    let track = this.state.currentSong
    return (
        <div className="playerControlsWrap">
            {/* HTML 5 audio Component. Inviisble On the DOM. Dependent on having a source at all times */}
            <audio 
                key={track.id} 
                ref={this.state.audioElement}
                onEnded={this.handNextTrack}
                onLoadedMetadata={this.handleSetSongDuration}
            >
                <source src={track.songDir}/>
            </audio>
        {/* ---- Audio Controls Options ---- */}
                {/* Song info */}
                <div className="songInfoWrap">
                    <div className="songTitle"> {track.name} </div>
                    <div className="songInfoSecondary">
                        <div> {track.album} </div>
                        <div> {track.artist} </div>
                        <div>{this.state.currentTime} - {this.state.sourceDuration}</div>
                    </div>
                </div>
        {/* -- Playback Navigation --- */}
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
        {/* -- Song Queue toggle -- */}
                <div className="songQueue">
                    <button>Display Song Queue</button>
                </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
