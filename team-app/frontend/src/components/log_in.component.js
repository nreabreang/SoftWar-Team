import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//constructor
export default class CreateActivity extends Component {
    constructor(props) {
        this.username = username
        this.password = password
        
        this.state = {
            username: "",
            password: ""
        }
    }
}

//log in with google
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com"></meta>

//get profile information
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

//sign out
{/* <a href="#" onclick="signOut();">Sign out</a>
<script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
</script> */}