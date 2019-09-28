import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 

class AudioPlayer extends Component {

  render () {
  	console.log(this.props.voice);
  	var voice = "";
  	if (this.props.voice === "Megumin")
      voice = 'https://d3ugf22ib23wlw.cloudfront.net/audio/samples/Sample_Jemma_Premium.mp3';
    else if (this.props.voice === "Justin")
      voice = 'https://d3ugf22ib23wlw.cloudfront.net/audio/samples/Sample_Justin_Premium.mp3';
    return <ReactPlayer url={voice} playing = {this.props.playing} />
  }
}

export default AudioPlayer