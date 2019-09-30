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
  //Make the the request URL
  var getRequestURL = "https://sonosannounce-development.auth.us-west-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=5o28o8vhkmc07rgjneb5e2eht6&redirect_uri=https://sonosannounce.com/&state=GOOGLE&identity_provider=Google&scope=phone+openid+profile+email+aws.cognito.signin.user.admin";
  return getRequestURL;
}

//Make this a class
export default () => (
  <Layout>
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <h1 style={textCenter}>Login</h1>
            <Button color="green" as='a' href={GOOGLE_LOGIN_URL}>Google Login</Button>
        </div>
  </Layout>
);

const textCenter = {
  'text-align': 'center',
}