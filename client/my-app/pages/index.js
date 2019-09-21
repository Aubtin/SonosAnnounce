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
        
      }
    }

    static getInitialProps({query}) {
      return {query}
    }

  exchangeAuthCodeForToken() {
    const AUTHORIZATION_CODE = this.props.query.code;
    console.log("This is the authcode:" + AUTHORIZATION_CODE);

    const clientId = "";
    const clientSecret = "";

    //const encodedString = window.btoa(clientId + ":" + clientSecret);

    axios.post('https://faqxn3bybb.execute-api.us-west-2.amazonaws.com/development/auth/tokens',
            qs.stringify(
            {
              type: "login",
              client_id: "29vvv56v5h5dol3qo7unc4l9ik",
              code: "AUTHORIZATION_CODE",
              redirect_uri: "http://localhost:3000/"
            }
        )
      ).then(res => {
        //Save the tokens in cookies
          console.log(res);
      }).catch(res => {
        console.log("There is an error");
        console.log(res);
      });

    

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

  componentDidMount() {
    //Exchange when there is a code

    if(this.props.query) {
      
      this.exchangeAuthCodeForToken();
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
