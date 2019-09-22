import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const voices = ['Aubtin', 'JAMACA', 'Megumin'];

const voiceOptions = voices.map( (voice, index) => ({
  key: index,
  text: voice,
  value: voices[index],
}))

class MainApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: "Megumin"
    };
  }


  render() {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
        <h1>Voices</h1>
        <Dropdown placeholder='voice' search selection options={voiceOptions} value={this.state.voice} />
      </div>
    );
  }
}

const textCenter = {
  'text-align': 'center',
}

export default MainApplication;