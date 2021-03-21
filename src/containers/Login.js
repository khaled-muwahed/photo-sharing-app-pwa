import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
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
    console.log(email , password , token)
  }


  const SignIn = async (event) => {
     //Client side user validation if user leaves any of the required feilds empty, they will get an error
    event.preventDefault();
      return fetch("http://localhost:3333/api/user/login", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : email,
        password:
        password})
      
      }
     
      )
    
        .then(async (response) => {
          if (response.status === 200) {
              console.log ("fuck yamen" )
            

            return response.json()


          } else if (response.status === 400) {
            console.log("invalid credintentials")
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





const getData = async (e) => {

  return fetch("http://127.0.1.1:3333/api/posts/feed",  {
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
      console.log(URL , "my url")


    })
    .catch((error) => {
      console.log(error);
    })
}
  //
  /*
  const SignIn = async () => {
    //Client side user validation if user leaves any of the required feilds empty, they will get an error

     return fetch("http://localhost:3333/api/user/login", {
       method: 'post',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(email, password)
     })
       .then((response) => {
         if (response.status === 200) {
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
        // await this.setState({token: responseJson.token});
         
 
         console.log("logged in successfully")

       })
       .catch((error) => {
         console.log(error);
         console.log("error encountered")
     
       })
   }
 

  */

  //

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
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