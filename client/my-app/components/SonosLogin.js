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
  return process.env.SONOS_LOGIN_URL;
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
