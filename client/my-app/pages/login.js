import React from 'react';
import Layout from '../components/Layout';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

const GOOGLE_LOGIN_URL = socialGoogleLogin();

function socialGoogleLogin() {
  var socialLoginStr = "identity_provider=" + "Google&";

  //Make the the request URL

  //return getRequestURL;
}

//Make this a class
export default () => (
  <Layout>
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <h1 style={textCenter}>Login</h1>
            <Button color="green" as='a' href={GOOGLE_LOGIN_URL} target="_blank">Google Login</Button>
        </div>
  </Layout>
);

const textCenter = {
  'text-align': 'center',
}