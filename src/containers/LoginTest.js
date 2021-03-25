
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";



class TestLoginForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          token: '',
        };
      }
    handleChangeEvents(event) {
        //handle change events
    }
    handleSubmitevents(event) {
        // handle submit events
    }
    handlePasswordChange(event) {
        //handle password change events
    }



     SignIn = async (event) => {
       // var stringify = require('json-stringify-safe');
        //Client side user validation if user leaves any of the required feilds empty, they will get an error
        event.preventDefault();
         return fetch("http://localhost:3333/api/user/login", {
           method: 'post',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({email : "km@km.com",
           password:
           "123456"})
         
         }
        
         )
       
           .then((response) => {
             if (response.status === 200) {
                 console.log ("fuck yamen" )
                 console.log( JSON.stringify(this.state).toString())
               return response.json()

             } else if (response.json.status === 400) {
               throw 'Invalid email/password supplied';
             }
             else if (response.json.status === 500) {
               throw 'server error';
             }
             else {
               throw 'Somthing went wrong';
             }
           })
           .then(async (responseJson) => {
             console.log(responseJson);

             console.log("logged in successfully")
    
           })
           .catch((error) => {
             console.log(error);
             console.log("error encountered" , error)
            
         
           })
       }






    render() {
        return (
          

    <div className="Login">
      <Form onSubmit={this.SignIn}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            onChange={(email) => this.setState({ email })}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(password) => this.setState({ password })}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>

        );
    }
}

export default TestLoginForm;