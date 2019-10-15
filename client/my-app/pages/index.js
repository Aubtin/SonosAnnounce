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
        api_key: false,
      }
    }

    static async getInitialProps({query}) {
      return {query}
    }

  logout() {
    //Clear local storage
    window.localStorage.clear();

    //Log out and redirect
    window.location.href = process.env.GOOGLE_LOGOUT_URL
  }

  exchangeGoogleAuthCodeForToken() {
    console.log("in google function");
    const AUTHORIZATION_CODE = this.props.query.code;
    console.log("This is the authcode:" + AUTHORIZATION_CODE);

    //const encodedString = window.btoa(clientId + ":" + clientSecret);

    axios.post(process.env.API_PREFIX_URL + 'auth/users/tokens',
            {
              type: "login",
              client_id: process.env.GOOGLE_CLIENT_ID,
              code: AUTHORIZATION_CODE,
              redirect_uri: process.env.GOOGLE_LOGIN_REDIRECT_URL
            },
        {
          headers: {
              'Content-Type': 'application/json'
              }
          },
      ).then(res => {
        //Save the tokens in cookies
          var id_token = res.data.data.id_token;
          var refresh_token = res.data.data.refresh_token;

          const GOOGLE = {
            googleLoggedIn: true,
            codeGoogle: AUTHORIZATION_CODE,
            id_token: id_token,
            refresh_token: refresh_token
          };

          //Get Sonos Api key if it is stored inside google account already
          //and set it so don't have to login sonos more than necessary
          axios.get(process.env.API_PREFIX_URL + '/apikey',
          {
            headers: {
                'Authorization': id_token
            },
          
          }).then(res => {
            console.log("Inside getting api key from google account");
            console.log(res);
            //Set to Local Storage
            window.localStorage.setItem('sonos', JSON.stringify({api_key:res.data.data.api_key, haveApi:"true"}));
            //Set to State to having api key to true
            this.setState({api_key: true});
            
          }).catch();

          this.setState({googleLoggedIn: true});

          window.localStorage.setItem('google', JSON.stringify(GOOGLE));

      }).catch(res => {
        window.location.href="/login"
      });

      //console.log("This is the google function hehe:");
      //console.log(window.localStorage.getItem('google'));

  }

  exchangeSonosAuthCodeForToken() {
    const AUTHORIZATION_CODE = this.props.query.code;
    axios.post(process.env.API_PREFIX_URL + 'auth/sonos/tokens',
        {
          "type": "login",
          "client_id": process.env.SONOS_CLIENT_ID,
          "code": AUTHORIZATION_CODE,
          "redirect_uri": process.env.SONOS_LOGIN_REDIRECT_URL
        }
        ,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.parse(window.localStorage.getItem('google')).id_token
              }
          },
      ).then(res => {

          const SONOS = {
            sonosLoggedIn: true,
            codeSonos: AUTHORIZATION_CODE,
            api_key: res.data.data.api_key
          }

          window.localStorage.setItem('sonos', JSON.stringify(SONOS));

          this.setState({sonosLoggedIn: true});
          console.log(window.localStorage.getItem('sonos'));
      }).catch(res => {
        console.log("There is an error");
        console.log(res);
      });

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
      this.setState({googleLoggedIn: true});
      this.setState({googleLoggedIn: JSON.parse(window.localStorage.getItem('google')).googleLoggedIn});
    }

    if(localStorage.getItem("sonos") === null){
      const SONOS = {
        sonosLoggedIn: false,
        codeSonos: null
      }
      window.localStorage.setItem('sonos', JSON.stringify(SONOS));
    } else {
      if(JSON.parse(window.localStorage.getItem('sonos')).haveApi === "true"){
        this.setState({api_key: true});
      }else{
        this.setState({sonosLoggedIn: true});
        this.setState({sonosLoggedIn: JSON.parse(window.localStorage.getItem('sonos')).sonosLoggedIn});
      }
    }

    //Trading Auth for Code
    if(this.props.query) {
      console.log(this.props.query);
      if(this.props.query.state === 'GOOGLE' && JSON.parse(window.localStorage.getItem('google')).googleLoggedIn === false) {
        this.exchangeGoogleAuthCodeForToken();
      }
      else if(this.props.query.state === 'SONOS' && JSON.parse(window.localStorage.getItem('sonos')).sonosLoggedIn === false) {
        this.exchangeSonosAuthCodeForToken();
      }else{
        //Redirect if not logged into google
        if(JSON.parse(window.localStorage.getItem('google')).googleLoggedIn === false) {
          window.location.href="/login";
        }
      }
    }

  }

  render() {
    return(
      <Layout>
        {this.state.googleLoggedIn === true && <Button onClick={() => this.logout()} style={buttonStyle}>Logout</Button>}
        {this.state.googleLoggedIn === true && this.state.sonosLoggedIn === false && this.state.api_key === false && <SonosLogin />}
        {this.state.googleLoggedIn === true && ((this.state.sonosLoggedIn === true) || (this.state.api_key === true)) && <MainApplication />}
      </Layout>
    );
  }
}

const buttonStyle = {
  'margin-left': '92.5%',
  'margin-right': '1.5%',
  'margin-top': '1%',
  'margin-bottom': '2%',
  background: '#feda6a'
}

const yellow = {
  background: '#feda6a'
}

export default Index;
