import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speechText: '',
      hhOptions: [],
      playerOptions: [],
      playerId: ''
    };
    this.textChange = this.textChange.bind(this);
    this.hhChange = this.hhChange.bind(this);
    this.playerChange = this.playerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

// right off the bat, let's call our private API and get a list of the available hhs for this user
  componentDidMount() {
    fetch('/api/households')
      .then(response => response.json())
      .then(json => {
        if (json.success) { // alright, we got something
          if (json.households.length > 1) { // if there's more than one, we'll want to populate the picklist, because we'll be showing that
            const opts=[];
            for (let hh of json.households) {
              opts.push(<option value={hh.id}>{hh.id}</option>);
            }
            this.setState({
              hh: json.households[0].id,
              hhOptions: opts
            })
          }
          else { // if there's only one, let's just grab it. we won't even be showing the picklist
            this.setState({
              hh: json.households[0].id
            });
          }
          this.hhChange();
        }
        else if (json.authRequired) { // if we weren't successful, let's check and see if we've been told to auth, and if so, send user to auth endpoint
          window.location='http://localhost:3001/auth';
        }
        else { // if all else fails, just put an error on the screen and let the user figure it out
          this.setState({
            error:json.error
          });
        }
      });
  }


  textChange(event) {
    this.setState({ speechText: event.target.value });
  }

  playerChange(event) {
    this.setState({ playerId: event.target.value });
  }

// whenever the household changes, let's get a list of available speakers
  hhChange(event) {
    fetch(`/api/clipCapableSpeakers?household=${this.state.hh}`)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const opts=[];
          for (let player of json.players) {
            opts.push(<option value={player.id}>{player.name}</option>);
          }
          this.setState({
            playerId: json.players[0].id,
            playerOptions: opts
          })
        }
        else {
          this.setState({
            error:json.error
          });
        }
      });

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ // here we're clearing out any error that might have been on the screen before
      error:''
    });
    fetch(`/api/speakText?text=${encodeURIComponent(this.state.speechText)}&playerId=${this.state.playerId}`)
      .then(response => response.json())
      .then(state => this.setState(state))
      .catch(err => this.setState({error:err.stack}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>
            Sonos Text to Speech.
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div id="hhSelector" style={{display: this.state.hhOptions.length > 1?'block':'none'}}>
                <label htmlFor="targetHH">Select your target household: </label>
                <select
                  id="targetHH"
                  onChange={this.hhChange}
                  value={this.state.hh}
                >
                  {this.state.hhOptions}
                </select><br/>
            </div>
          <label htmlFor="targetPlayer">Select your target player: </label>
            <select
              id="targetPlayer"
              value={this.state.playerId}
              onChange={this.playerChange}
            >
              {this.state.playerOptions}
            </select><br/>
            <label htmlFor="speechText">Enter your text to speak: </label>
            <input
              id="speechText"
              type="text"
              value={this.state.speechText}
              onChange={this.textChange}
            /><br/>
          <button type="submit" disabled={!this.state.speechText}>Submit</button>
          </form>
          {this.state.error}
        </header>
      </div>
    );
  }
}

export default App;