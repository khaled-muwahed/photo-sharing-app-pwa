import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NewUser from './SignUp'

import {


  Route, useHistory,
 
} from "react-router-dom";


//import history from '../components/history'
import "./Login.css";


import { withRouter } from 'react-router-dom';


function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [URL, setUrl] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    SignIn(event);
    // getData();
    event.preventDefault();
    console.log(email, password, token)
  }


  const SignIn = async (event) => {
    //Client side user validation if user leaves any of the required feilds empty, they will get an error
    event.preventDefault();
    if (email === '' || password === '') {
      alert("fields cant be blank");
    }
    else {
      return fetch("http://localhost:3333/api/user/login", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password:
            password
        })

      }

      )

        .then(async (response) => {
          if (response.status === 200) {
            console.log("Logged In")
            alert("Logged In");
           



            return response.json()


          } else if (response.status === 400) {
            console.log("invalid credintentials")
            alert("invalid credintentials")
            throw 'Invalid email/password supplied';

          }
          else if (response.status === 500) {
            throw 'server error';
          }
          else {
            alert("Somthing went wrong")
            throw 'Somthing went wrong';
          }

        })
        .then(async (responseJson) => {
          console.log(responseJson.token);
          setToken(responseJson)
          await localStorage.setItem('myToken', responseJson.token);
          history.push("/")


          // console.log("logged in successfully")

        })
        .catch((error) => {
          console.log(error);


          console.log("error encountered", error)


        })
    }
  }
  const PageNotFound = () => {
    return (
      <h1>404 !</h1>
    )
  }
/*
  const navHome = () => {
    history.push("/signup")


  }*/




  const getData = async (e) => {

    return fetch("http://127.0.1.1:3333/api/posts/feed", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token

      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw 'Somthing went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log("got data " + JSON.stringify(responseJson))
        setUrl(e.target.value);
        console.log(URL, "my url")


      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="Login">
       
      <Form onSubmit={handleSubmit}>
        <div style={styles.formItem}>
          <Form.Group size="lg" controlId="email">
            <Form.Label style={styles.formLabel}>Email</Form.Label>
            <Form.Control
              style={styles.formInput}
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </div>
        <div style={styles.formItem}>

          <Form.Group size="lg" controlId="password">
            <Form.Label style={styles.formLabel}>Password</Form.Label>
            <Form.Control
              style={styles.formInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <div style={styles.formItem}>
          <Button block size="lg" type="submit" style={styles.buttonStyle} >
            Login
        </Button>
        </div>
      </Form>

    </div>
  );
}


const styles = ({

  formLabel: {
    fontSize: 15,
    color: '#CC8D17',
    marginTop: -20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#CC8D17',
    borderRadius: 20,
  },
  formItem: {
    padding: 10,
    marginTop: 5,
  },
  buttonStyle: {
    alignSelf: 'flex-start',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#CC8D17',
    padding: 10,
    marginBottom: 12,
    marginTop: 5,
  },
});

export default
  Login;