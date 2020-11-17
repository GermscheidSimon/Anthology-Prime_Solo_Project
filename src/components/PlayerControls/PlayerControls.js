import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './PlayerControls.css'

/**
 * Player Controls---
 * 
 * The bread and butter of this whole operaitons. 
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
        currentSong: null, // initial state of component at the begining of lifecycle
        audioElement: createRef(),
        trackIsPlaying: true,
        currentTime: '00:00',
        interval: null
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
        this.props.dispatch({
            type: "SET_CURRENT_SONG",
            payload: this.props.store.tracklist[0]
        })
    }

    // toggle play() and pause() options, and set current playback state
    togglePlayback = () => {
        if (this.state.trackIsPlaying) {
            this.state.audioElement.current.pause()
        } else {
            this.state.audioElement.current.play()
        }
        this.setState({
            trackIsPlaying: !this.state.trackIsPlaying
        })

       
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
                <button>NextSong</button>
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
