import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import {


    Route, useHistory,
   
  } from "react-router-dom";
  
import { withRouter } from 'react-router-dom';

    function  NewUser() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    
    const history = useHistory();


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        SignUp(event);
        // getData();
        event.preventDefault();
        console.log(email, password, token)
    }


    const SignUp = async (event) => {
        //Client side user validation if user leaves any of the required feilds empty, they will get an error
        event.preventDefault();
        if (first_name=== ''|| last_name=== ''|| email === '' || password === '') {
            alert("fields cant be blank");
          }
          else{
        return fetch("http://localhost:3333/api/user/new", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password:
                    password
            })

        }

        )

            .then(async (response) => {
                if (response.status === 200) {
                    alert("Account Created")
                    console.log("Account Created")
                    history.push("/login")


                    return response.json()


                } else if (response.status === 400) {
                    console.log('the email used by another member')
                    alert("the email used by another member")
                    throw 'the email used by another member';

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
                //console.log(responseJson);
                setToken(responseJson)


                console.log("logged in successfully")

            })
            .catch((error) => {
                console.log(error);


                console.log("error encountered", error)


            })
    }
}







    return (
        <div >
            <Form onSubmit={handleSubmit}>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="first_name">
                        <Form.Label style={styles.formLabel}>First Name: </Form.Label>
                        <Form.Control
                            autoFocus
                            type="name"
                            value={first_name}
                            style={styles.formInput}
                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="last_name">
                        <Form.Label style={styles.formLabel}>Last name: </Form.Label>
                        <Form.Control
                            autoFocus
                            type="name"
                            value={last_name}
                            style={styles.formInput}
                            onChange={(e) => setLast_name(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label style={styles.formLabel}>Email: </Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            style={styles.formInput}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label style={styles.formLabel}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            style={styles.formInput}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Button block size="lg" type="submit" style={styles.buttonStyle}>
                    SignUp
        </Button>
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

export default NewUser;