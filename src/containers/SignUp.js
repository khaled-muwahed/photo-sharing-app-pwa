import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    SignUp(event);
   // getData();
    event.preventDefault();
    console.log(email , password , token)
  }


  const SignUp = async (event) => {
     //Client side user validation if user leaves any of the required feilds empty, they will get an error
    event.preventDefault();
      return fetch("http://localhost:3333/api/user/new", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name :first_name,
            last_name : last_name,
            email : email,
        password:
        password})
      
      }
     
      )
    
        .then(async (response) => {
          if (response.status === 200) {
              console.log ("fuck yamen" )
            

            return response.json()


          } else if (response.status === 400) {
            console.log('the email used by another member')
            throw 'Invalid email/password supplied';
           
          }
          else if (response.status === 500) {
            throw 'server error';
          }
          else {
            throw 'Somthing went wrong';
          }

        })
        .then(async (responseJson) => {
          //console.log(responseJson);
          setToken(responseJson)
      

          console.log("logged in successfully")
 
        })
        .catch((error) => {
          console.log(error);
      

          console.log("error encountered" , error)
         
      
        })
    }







  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
        </Form.Group>
      <Form.Group size="lg" controlId="last_name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}