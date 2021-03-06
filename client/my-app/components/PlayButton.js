import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import AudioPlayer from './AudioPlayer';

class ButtonExampleToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      
    };

  }

  
  handleClick = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

  render(props) {
    const { active } = this.state

    return (
      <div>
      {this.state.playing === false && 
        <Button style={buttonStyle} onClick = {() => this.setState({playing: true})}> 
          <Icon name='play' />
        </Button>  
      }

      {this.state.playing === true && 
        <Button style={buttonStyle} onClick = {() => this.setState({playing: false})}> 
          <Icon name='pause' />
        </Button>  
      }
      <AudioPlayer playing = {this.state.playing} voice = { this.props.voice}/>
      </div>
    )
  }
}

const buttonStyle = {
  margin: '1%',
  background: '#feda6a'
}

export default ButtonExampleToggle