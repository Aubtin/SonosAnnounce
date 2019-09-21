import React from 'react';
import Layout from './Layout';

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

  //var client_id = "";
  //var response_type = "";
  //var state = "";
  //var scope = "";
  //var redirect_uri = "";
  //var getRequestURL = "redirect_uri=https%3A%2F%2Facme.example.com%2Flogin%2Ftestclient%2Fauthorized.html";
  //var socialLoginStr = "identity_provider=" + "Google&";

  //Make the the request URL
  //var getRequestURL = 'https://api.sonos.com/login/v3/oauth?';
  //getRequestURL += 'client_id={YOURCLIENTCREDENTIALKEY}&';
  //getRequestURL += 'response_type=code&'; //Authorization Code Grant Flow
  //getRequestURL += 'state={TESTSTATE}&';
  //getRequestURL += 'scope=playback-control-all&';

  //getRequestURL += 'redirect_uri=http://localhost:3000/&'; //Redirect
  //getRequestURL += socialLoginStr;

  var getRequestURL = "https://api.sonos.com/login/v3/oauth?client_id=5ade8149-be15-45ec-8489-5f45b029a3cc&response_type=code&state=TESTSTATE&scope=playback-control-all&redirect_uri=http://localhost:3000/sonos/authorize";
  
  return getRequestURL;
}

//Make this a class
export default () => (
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <h1 style={textCenter}>Login</h1>
            <Button color="red" as='a' href={SONOS_AUTHENTICATION_URL} target="_blank">Sonos Login</Button>
        </div>

);

const textCenter = {
  'text-align': 'center',
}