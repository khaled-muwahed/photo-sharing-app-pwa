import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import {
 useHistory,

} from "react-router-dom";

import { getApiUrl } from "../utils";

function NewUser() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");


    const history = useHistory();


    function handleSubmit(event) {
        event.preventDefault();
        SignUp(event);
        // getData();

        console.log(email, password, token)
    }


    const SignUp = async (event) => {
        //Client side user validation if user leaves any of the required feilds empty, they will get an error
        event.preventDefault();
        if (first_name === '' || last_name === '' || email === '' || password === '') {
            alert("fields cant be blank");
        }
        else {
            return fetch(getApiUrl("/api/user/new"), {
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
                        console.log('invalid input')
                        alert("invalid credentials")
                        throw 'invalid input';

                    }
                    else if (response.status === 401) {
                        console.log('This Email is already Taken')
                        alert("This Email is already Taken")
                        throw 'This Email is already Taken';

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
        <div className="Login text-center">
            <Form onSubmit={handleSubmit}>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="first_name" className="text-left">

                        <Form.Control
                            className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
                            autoFocus
                            placeholder="First name .."
                            type="name"
                            value={first_name}

                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="last_name" className="text-left">
                        <Form.Control
                            className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
                            autoFocus
                            placeholder="Last name .."
                            type="name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="email" className="text-left">
                        <Form.Control
                            className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
                            autoFocus
                            placeholder="Email .."
                            type="email"
                            value={email}

                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={styles.formItem}>
                    <Form.Group size="lg" controlId="password" className="text-left">
                        <Form.Control
                            className="p-4 border-2 border-gray-300 rounded-xl w-full block appearance-none"
                            type="password"
                            placeholder="Password .."
                            value={password}

                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Button block size="lg" type="submit" className="rounded-xl bg-purple-500 font-semibold py-5 px-16 text-white shadow-md">
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
