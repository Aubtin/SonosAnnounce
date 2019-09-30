import React from 'react';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

const SONOS_AUTHENTICATION_URL = sonosLogin();

function sonosLogin() {

  var getRequestURL = "https://api.sonos.com/login/v3/oauth?client_id=5ade8149-be15-45ec-8489-5f45b029a3cc&response_type=code&state=SONOS&scope=playback-control-all&redirect_uri=https://sonosannounce.com/";
  
  return getRequestURL;
}

//Make this a class
export default () => (
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <Button color="red" as='a' href={SONOS_AUTHENTICATION_URL}>Sonos Login</Button>
        </div>

);

const textCenter = {
  'text-align': 'center',
  color: '#FFFFFF'
}