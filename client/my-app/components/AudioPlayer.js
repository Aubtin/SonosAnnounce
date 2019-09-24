import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 
class AudioPlayer extends Component {
  render () {
    return <ReactPlayer url='https://www.trekcore.com/audio/redalertandklaxons/voybluealert.mp3' playing = {this.props.playing} />
  }
}

export default AudioPlayer