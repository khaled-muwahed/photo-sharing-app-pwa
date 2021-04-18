import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Link,
  useHistory,

} from "react-router-dom";
import "./Login.css";


import { getApiUrl } from "../utils";


function Login() {
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    SignIn(event);

    console.log(email, password, token)
  }


  const SignIn = async (event) => {
    //Client side user validation if user leaves any of the required feilds empty, they will get an error
    event.preventDefault();
    if (email === '' || password === '') {
      alert("fields cant be blank");
    }
    else {
      return fetch(getApiUrl("/api/user/login"), {
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
            // alert("Logged In");
            console.log(response);

            return response;


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
        .then(async response => response.json())
        .then(async (responseJson) => {
          console.log('body... ', responseJson);
          console.log('TOKEN: ' + responseJson.token);
          setToken(responseJson)
          await sessionStorage.setItem('myToken', responseJson.token)
          history.push("/")


        })
        .catch((error) => {
          console.log(error);


          console.log("error encountered", error)


        })
    }
  }





  return (
    <div className="Login text-center">

      <Form onSubmit={handleSubmit}>
        <div style={styles.formItem}>
          <Form.Group size="lg" controlId="email" className="text-left">
            {/*<Form.Label className="text-grey-300 mr-6">Email</Form.Label>*/}
            <Form.Control
              className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
              autoFocus
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </div>
        <div style={styles.formItem}>

          <Form.Group size="lg" controlId="password" className="text-left">
            {/*<Form.Label className="text-grey-300 mr-6 text-sm text-gray-500">Password</Form.Label>*/}
            <Form.Control
              className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <div style={styles.formItem}>
          <Button block size="lg" type="submit" className="rounded-xl bg-purple-500 font-semibold py-5 px-16 text-white shadow-md">
            Login
        </Button>
          <div className="text-gray-300 mt-4">
            Don't have an account? <span className="text-blue-500"><Link to="/signup">Create account</Link></span>
          </div>
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
