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
      voice: "Jemma",
      api_key: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = e => {
      this.setState({ voice: e.target.value });
    };

  componentDidMount() {
    this.setState({api_key: JSON.parse(window.localStorage.getItem('sonos')).api_key});
  }

  render() {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
        <Segment style={seg}><h1>api_key: {this.state.api_key}</h1></Segment>
        <Segment style={seg}><h1>Voices</h1></Segment>
        <Segment style={seg}>
          <select style={dropDown} name="voice" value={this.state.voice} onChange={this.handleChange}>
            <option value="Jemma">Jemma</option>
            <option value="Justin">Justin</option>
          </select>
        </Segment>
        <PlayButton style={button} voice={this.state.voice}/>
      </div>
    );
  }
}

const textCenter = {
  'text-align': 'center',
}

const seg = {
  'backgroundColor': '#1d1e22',
  color: '#FFFFFF',
  'text-align': 'center',
  'border-radius': '25px'
}

const button = {
  'text-align': 'right',
}

const dropDown = {
  'border-radius': '25px',
  'width': '95%',
  'height': '95%',
}

export default MainApplication;