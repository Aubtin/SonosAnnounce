import Layout from '../components/Layout';
import SonosLogin from '../components/SonosLogin';
import MainApplication from '../components/MainApplication';
import Link from 'next/link';
import axios from 'axios';
import {Button} from 'semantic-ui-react';


var qs = require('qs');

import { Divider, Grid, Image, Segment, Header } from 'semantic-ui-react';

class Index extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        googleLoggedIn: false,
        sonosLoggedIn: false,
      }
    }

    static getInitialProps({query}) {
      return {query}
    }

  logout() {
    //Clear local storage
    window.localStorage.clear();

    //Log out and redirect
    window.location.href="https://sonosannounce-development.auth.us-west-2.amazoncognito.com/logout?client_id=5o28o8vhkmc07rgjneb5e2eht6&logout_uri=http://localhost:3000/login&scope=openid+profile+aws.cognito.signin.user.admin";
    //window.location.href="https://sonosannounce-development.auth.us-west-2.amazoncognito.com/logout?response_type=code&client_id=5o28o8vhkmc07rgjneb5e2eht6&redirect_uri=http://localhost:3000/login/&scope=openid+profile+aws.cognito.signin.user.admin";
  }

  exchangeGoogleAuthCodeForToken() {
    console.log("in google function");
    const AUTHORIZATION_CODE = this.props.query.code;
    console.log("This is the authcode:" + AUTHORIZATION_CODE);

    //const encodedString = window.btoa(clientId + ":" + clientSecret);

    axios.post('https://lvr9pdp7ea.execute-api.us-west-2.amazonaws.com/development/auth/users/tokens',
            {
              type: "login",
              client_id: "5o28o8vhkmc07rgjneb5e2eht6",
              code: AUTHORIZATION_CODE,
              redirect_uri: "http://localhost:3000/"
            },
        {
          headers: {
              'Content-Type': 'application/json'
              }
          },
      ).then(res => {
        //Save the tokens in cookies
          console.log(res);
      }).catch(res => {
        console.log("There is an error");
        console.log(res);
      });

      this.setState({googleLoggedIn: true});

      const GOOGLE = {
        googleLoggedIn: true,
        codeGoogle: AUTHORIZATION_CODE
      }

      window.localStorage.setItem('google', JSON.stringify(GOOGLE));
  }

  exchangeSonosAuthCodeForToken() {
    const AUTHORIZATION_CODE = this.props.query.code;
    axios.post('https://lvr9pdp7ea.execute-api.us-west-2.amazonaws.com/development/auth/sonos/tokens',  
        {
          "type": "login",
          "client_id": "5ade8149-be15-45ec-8489-5f45b029a3cc",
          "code": AUTHORIZATION_CODE,
          "redirect_uri": "http://localhost:3000/"
        }
        , 
        {
          headers: {
              'Content-Type': 'application/json'
              }
          },
      ).then(res => {
        //Save the tokens in cookies
          console.log(res);
      }).catch(res => {
        console.log("There is an error");
        console.log(res);
      });

      this.setState({sonosLoggedIn: true});

      const SONOS = {
        sonosLoggedIn: true,
        codeSonos: AUTHORIZATION_CODE
      }

      window.localStorage.setItem('sonos', JSON.stringify(SONOS));
      console.log("This is the sonos function hehe:");
      console.log(window.localStorage.getItem('sonos'));
  }

  componentDidMount() {
    //Setting Local Storage and State of Page
    if(localStorage.getItem("google") === null){
      console.log("hello1");
      const GOOGLE = {
        googleLoggedIn: false,
        codeGoogle: null
      }
      window.localStorage.setItem('google', JSON.stringify(GOOGLE));
    } else {
      this.setState({googleLoggedIn: JSON.parse(window.localStorage.getItem('google')).googleLoggedIn});
    }

    if(localStorage.getItem("sonos") === null){
      const SONOS = {
        sonosLoggedIn: false,
        codeSonos: null
      }
      window.localStorage.setItem('sonos', JSON.stringify(SONOS));
    } else {
      this.setState({sonosLoggedIn: JSON.parse(window.localStorage.getItem('sonos')).sonosLoggedIn});
    }
    
    //Trading Auth for Code
    if(this.props.query) {

      if(this.props.query.state === 'GOOGLE' && JSON.parse(window.localStorage.getItem('google')).googleLoggedIn === false) {
        this.exchangeGoogleAuthCodeForToken();
      }
      else if(this.props.query.state === 'SONOS' && JSON.parse(window.localStorage.getItem('sonos')).sonosLoggedIn === false) {
        this.exchangeSonosAuthCodeForToken();
      }
    }
    
    //If Google Authentication is False, then redirect to login page
    if(this.state.googleLoggedIn === false && JSON.parse(window.localStorage.getItem('google')).googleLoggedIn === false){
      window.location.href="/login"
    }
  }

  render() {
    return(
      <Layout>
        {this.state.googleLoggedIn === true && <Button onClick={() => this.logout()} style={buttonStyle}>Logout</Button>}
        {this.state.googleLoggedIn === true && this.state.sonosLoggedIn === false && <SonosLogin />}
        {this.state.googleLoggedIn === true && this.state.sonosLoggedIn === true && <MainApplication />}
      </Layout>
    );
  }
}

const buttonStyle = {
  'margin-left': '92.5%',
  'margin-right': '1.5%',
  'margin-top': '1%'
}

export default Index;
