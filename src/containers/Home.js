import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";

import "./Login.css";
import { withRouter , useHistory } from 'react-router-dom';

function GetData() {
    const [items, setItems] = useState([]);
    const [token, setToken] = useState("");

    const [URL, setUrl] = useState("");

    const history = useHistory();
    //localStorage.getItem(myToken)

    useEffect(() => {
      //  console.log( localStorage.getItem("myToken") , "token")
      checkLogIn()
        
     
    }, []);




    const checkLogIn = async () => {
        const getToken = await sessionStorage.getItem("myToken");
        if (getToken === null) {
            alert("you need to loog in")
            history.push("/login");
            console.log("you need to loog in");
        }
        else {
            getData()
            console.log("you are in")
        }

    }
    const logOut =async () => {
        await sessionStorage.clear();
        history.push("/login")
        console.log("logged out")
    }

    const getData = async () => {
       

        return await fetch("http://127.0.1.1:3333/api/posts/feed", {
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
                //console.log("got data " + JSON.stringify(responseJson))
                const resJson = await responseJson;

                setItems(resJson.images);
                //console.log(resJson.images);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
   /*

   */
    

    return (

        <div>

<button className="buttonStyle"
             onClick ={logOut}> logOut</button>
        <div style={imageStyle}>
           


            {items.map(item => (
                <React.Fragment key={item.id}>

                    <img 
                        style={divStyle}
                        src={item.url}

                        alt="new"
                    />
                    <p> {item.caption}</p>
           
                    <p>━━━━━━━━━━━━━━━━━━━</p>
                </React.Fragment>
            ))}
           
        </div>
        </div>
    );
}
const imageStyle = {
    marginBottom: 80


};

const divStyle = {
    height: "180px",
    width: "250px"
};

export default
        withRouter(GetData);