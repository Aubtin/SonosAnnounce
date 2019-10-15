import React, { Component } from 'react';
import { Dropdown, Segment, Grid } from 'semantic-ui-react';
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
      <div>
        <Grid centered>
          <Grid.Row>
        <Segment style={seg}><h1>api_key: {this.state.api_key}</h1></Segment>
        </Grid.Row>
        <Grid.Row>
        <Segment style={seg} compact>
          <h1>Voices</h1>
          <select style={dropDown} name="voice" value={this.state.voice} onChange={this.handleChange}>
            <option value="Jemma">Jemma</option>
            <option value="Justin">Justin</option>
          </select>
        </Segment>
        </Grid.Row>
        <PlayButton style={button} voice={this.state.voice}/>
        </Grid>
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
  'margin-left': '5%',
  'margin-right': '5%',
  'text-align': 'center',
  'border-radius': '25px'
}

const button = {
  'margin-right': '100px',
}

const options = {
  'text-align': 'center',
}

const dropDown = {
  'border-radius': '25px',
  'width': '100%',

  'height': '95%',
}

export default MainApplication;