import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayButton from '../PlayButton/PlayButton'
import PauseButton from '../PauseButton/PauseButton'
import NextButton from '../NextButton/NextButton'
import PrevButton from '../PrevButton/PrevButton'

import TrackQueue from '../TrackQueue/TrackQueue'


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
 *      
 * 
 */

class PlayerControls extends Component {
    state = {
        currentSong: '/',         // initial state of component at the begining of lifecycle (ComponentDidUpdate)
        trackIsPlaying: false,    // state of currently playing track. see (TogglePlayback, ComponentDidUpdate)
        updateNewTrack: false,    // flag for switching songs  see(ComponentDidUpdate)
        currentTime: 0,           // current time of track (seconds.0000) see (handleCurrentTime and interval)
        sourceDuration: '00:00',  // song duration see handleSetSongDuration() and <audio> tag for onMetaDataLoad event
        songCompletion: 0,        // percent complete for Song Position slider
        interval: null,           // used to update DOM as while track is played. see (componentDidMount, handleCurrentTime)
        locationInPlaylist: 0,    // initial location. index of trackqueue
        trackQueue: [],           // an array of objects containing all the songs to play. Updated in componentDidUpdate
        volume: .4,               // local state of the volume for the audio tag
    }

    audioElement = createRef() // instance of audio ref to manage HTML interactions (see audio tag in render)

    // once the component is rendered, begin playing back the tracklist
    componentDidMount = () => {        
        let intervalID = setInterval(this.handleCurrentTime, 1000);
        this.setState(() => ({
            interval: intervalID,
            locationInPlaylist: 0,
        }));

    }

    // toggle play() and pause() options, and set current playback state
    togglePlayback = () => {
        if (this.state.trackIsPlaying) {
            this.audioElement.current.pause()
        } else {
            this.audioElement.current.play()
        }
        this.setState({
            trackIsPlaying: !this.state.trackIsPlaying,
        })
    }
  


    componentDidUpdate = () => {
        try {            
            if (this.props.store.tracklist.trackQueue !== this.state.trackQueue) {                
                console.log('songswitch');
                
               if (this.state.trackIsPlaying) {  

                    if(this.props.store.tracklist.restartQueue){
                        this.setState(() => ({
                            trackQueue: this.props.store.tracklist.trackQueue,
                            currentSong: this.props.store.tracklist.trackQueue[0],
                            locationInPlaylist: 0,
                            updateNewTrack: true,           
                        }));
                    } else {
                        this.setState(() => ({
                            trackQueue: this.props.store.tracklist.trackQueue,  
                            trackIsPlaying: true, 
                        }));
                    }
               } else {
                   console.log('start playling, was not playling');
                   
                    this.setState(() => ({
                        trackQueue: this.props.store.tracklist.trackQueue,       //sets local trackQueue array
                        currentSong: this.props.store.tracklist.trackQueue[0],   // setting the current song to the firs track in the playlist
                        locationInPlaylist: 0,              // setting a iterable number to manage where the player is at in the queue
                        updateNewTrack: true,               // setting a variable so componentDidUpdate knows to reload source
                        trackIsPlaying: true,                // when the source arrives, make sure state is set to 'is playing' to manage the play/pause controls
                    }));
               }
    
            }    
        } catch (error) {
            console.log(error);
        } finally{ 
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
    }

    // audio sources cannot be directly modified. After a source is changed the element must undergo a load event
    // this function handles that task. It will also set the volume of the track to the state volume so that it doesn't jump back to default
    handleSongSwitch = () => {
        console.log('volume:', this.state.volume);
        
        this.audioElement.current.pause();
        this.audioElement.current.load();
        // see onCanPlay event for .play() method. Playing directly here will cause choppy audio 
        this.handleSongCompletion();
    }


    // this is tied to this componenents interval on component did mount. this will update the song position clock 
    handleCurrentTime = () => {
        let songPosition = this.audioElement.current.currentTime
        this.setState({
            currentTime: songPosition
        });
        this.handleSongCompletion()
    }
    // this will take in a total seconds (time) amount, and convert it to a more readable digital clock (mm:ss)
    convertTimeToDigital = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
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

            try {
                this.setState(() => ({
                    locationInPlaylist: this.state.locationInPlaylist + 1,
                    currentSong: this.state.trackQueue[this.state.locationInPlaylist + 1],
                    trackIsPlaying: true
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
        
        if (this.state.trackQueue.length > 1 && this.state.locationInPlaylist > 0) {
            console.log('doing a thing');
            
            try {
                this.setState(() => ({
                    locationInPlaylist: this.state.locationInPlaylist - 1,
                    currentSong: this.state.trackQueue[this.state.locationInPlaylist - 1],
                    trackIsPlaying: true
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
        let nextVolume = event.target.value / 100
        this.setState({
            volume: nextVolume
        })
        this.audioElement.current.volume = nextVolume;
    }
    // this function is fired when the audio source fires 'onMetaDataLoad', and will push a value of the song duration to state
    handleSetSongDuration = () => {
        this.setState({
            sourceDuration: this.convertTimeToDigital(this.audioElement.current.duration)
        })
    }
    
    handleTrackSeek = (event) => {
        let trackSeekPosition = event.target.value / 100 // track position between 0% and 100%

        let nextSongPosition = this.audioElement.current.duration * trackSeekPosition
        this.audioElement.current.currentTime = nextSongPosition
        this.handleSongCompletion()
        this.setState({
            trackIsPlaying: true
        })
    }
    handleSongCompletion = () => {
        this.setState({
            songCompletion: this.audioElement.current.currentTime / this.audioElement.current.duration
        })
    }

    // Tied to onCanPlay --> Can control element properties after load, so setting state volume here before playling track
    playSongWhenLoaded = () => {
        this.audioElement.current.volume = this.state.volume 

        this.audioElement.current.play()
    }
  

  render() {    
    let track = this.state.currentSong
    return (
        <div className="playerControlsWrap" {...this.props}> 
            <input 
                className="songPositionBar"
                value={this.state.songCompletion * 100}
                type="range" 
                min="0" 
                max="100"
                onChange={(event) => {this.handleTrackSeek(event)}}
            />
            <div className="ControlsPod">
            {/* HTML 5 audio Component. Inviisble On the DOM. Dependent on having a source at all times */}
            <audio 
                ref={this.audioElement}                       // to interact directly with this HTML 5 element, using a ref instance 
                onEnded={this.handNextTrack}                  // when track complete load next track
                onLoadedMetadata={this.handleSetSongDuration} // song metadata is loadeded during the load event. It needs to be present before calling it.
                onCanPlay={this.playSongWhenLoaded}           // Wait for the audio element to be ready before attemptempting playback
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
                        <div>{this.convertTimeToDigital(this.state.currentTime)} - {this.state.sourceDuration}</div>
                    </div>
                </div>
        {/* -- Playback Navigation --- */}
                <div className="songNavigation">
                    <div onClick={this.handlePrevTrack} className="prevButton">
                        <PrevButton />
                    </div> 
                        {   this.state.trackIsPlaying ?
                                <div onClick={() => this.togglePlayback()} >
                                    <PauseButton  />
                                </div>
                            :
                                <div onClick={() => this.togglePlayback()} >
                                    <PlayButton  />
                                </div>
                        }
                    <div onClick={this.handNextTrack} className="nextButton">
                        <NextButton />
                    </div>  
                </div>
        {/** --Volume Control-- range slider. audio element volume must be a valume between 0 and 1. see adjustvolume */}
                <div className="songVolumeWrap">
                    <input 
                        className="songVolume"
                        onChange={(event) =>this.adjustVolume(event)} 
                        type="range" 
                        min="1" 
                        max="100" 
                    />
                </div>
        {/* -- Song Queue toggle -- */}
                <div className="songQueue">
                        <TrackQueue cuurentIndex={this.state.locationInPlaylist} currentSong={track}/>
                </div>
                </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
