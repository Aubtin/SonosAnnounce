import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ButtonExampleToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      
    };

  }

  state = {}

  
  handleClick = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

  render() {
    const { active } = this.state

    return (
      <div>
      {this.state.playing === false && 
        <Button onClick = {() => this.setState({playing: true})}> 
          <Icon name='play' />
        </Button>  
      }

      {this.state.playing === true && 
        <Button onClick = {() => this.setState({playing: false})}> 
          <Icon name='pause' />
        </Button>  
      }
      </div>
    )
  }
}

export default ButtonExampleToggle