import React, { Component } from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';
import PlayButton from './PlayButton';

const voices = ['Aubtin', 'JAMACA', 'Megumin', 'Justin'];

const voiceOptions = voices.map( (voice, index) => ({
  key: index,
  text: voice,
  value: voices[index],
}))

class MainApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: "Megumin",
      api_key: ""
    };
  }
  
  componentDidMount() {
    this.setState({api_key: JSON.parse(window.localStorage.getItem('sonos')).api_key});
  }

  render() {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
        <Segment><h1>api_key: {this.state.api_key}</h1></Segment>
        <h1>Voices</h1>
        <Dropdown placeholder='voice' search selection options={voiceOptions} value={this.state.voice} />
        <PlayButton voice={this.state.voice}/>
      </div>
    );
  }
}

const textCenter = {
  'text-align': 'center',
}

export default MainApplication;