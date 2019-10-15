import React from 'react';
import Layout from '../components/Layout';


import {Button,} from 'semantic-ui-react';

const GOOGLE_LOGIN_URL = socialGoogleLogin();

function socialGoogleLogin() {
  //Make the the request URL
  return process.env.GOOGLE_LOGIN_URL;
}

//Make this a class
export default () => (
  <Layout>
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <Button color="green" as='a' href={GOOGLE_LOGIN_URL}>Google Login</Button>
        </div>
  </Layout>
);

const textCenter = {
  'text-align': 'center',
};
