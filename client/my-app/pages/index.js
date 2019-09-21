import Layout from '../components/Layout';
import SonosLogin from '../components/SonosLogin';
import Link from 'next/link';
import axios from 'axios';

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

  exchangeGoogleAuthCodeForToken() {
    console.log("in google function");
    const AUTHORIZATION_CODE = this.props.query.code;
    console.log("This is the authcode:" + AUTHORIZATION_CODE);

    //const encodedString = window.btoa(clientId + ":" + clientSecret);

    axios.post('https://lvr9pdp7ea.execute-api.us-west-2.amazonaws.com/development/auth/users/tokens',
            qs.stringify(
            {
              type: "login",
              client_id: "5o28o8vhkmc07rgjneb5e2eht6",
              code: AUTHORIZATION_CODE,
              redirect_uri: "http://localhost:3000/"
            }
        ),
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

    

    /*axios.post('https://  name  .auth.us-west-2.amazoncognito.com/oauth2/token',
            qs.stringify(
            {
              "grant_type": "authorization_code",
              "client_id": "",
              "code": AUTHORIZATION_CODE,
              "redirect_uri": "http://localhost:3000/"
            }
        ), 
        {
          headers: {
            Authorization: "Basic " + encodedString,
              'Content-Type': 'application/x-www-form-urlencoded'
              }
          },
      ).then(res => {
        //Save the tokens in cookies
          console.log(res);
      }).catch(res => {
        console.log("There is an error");
        console.log(res);
      });*/

  }

  exchangeSonosAuthCodeForToken() {
    const AUTHORIZATION_CODE = this.props.query.code;
    axios.post('https://lvr9pdp7ea.execute-api.us-west-2.amazonaws.com/development/auth/sonos/tokens',
            qs.stringify(
            {
              "grant_type": "authorization_code",
              "code": AUTHORIZATION_CODE,
              "redirect_uri": "http://localhost:3000/"
            }
        ), 
        {
          headers: {
            Authorization: "Basic " + encodedString,
              'Content-Type': 'application/x-www-form-urlencoded'
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
  }

  componentDidMount() {
    //Exchange when there is a code

    if(this.props.query) {

      if(this.props.query.state === 'GOOGLE' && this.state.googleLoggedIn === false) {
        this.exchangeGoogleAuthCodeForToken();
      }
      else if(this.props.query.state === 'sonos' && this.state.sonosLoggedIn === false) {

      }
    }
  }

  render() {
    return(
      <Layout>
        <SonosLogin />
      </Layout>
    );
  }
}

export default Index;
