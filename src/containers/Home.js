import React, { useState, useEffect } from "react";

import "./Login.css";

export default function GetData() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState("");

  const [URL, setUrl] = useState("");

  useEffect(() => {
    getData()
  },[]);
  

  




const getData = async () => {

  return await fetch("http://127.0.1.1:3333/api/posts/feed",  {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'x-authorization': token

    }
  })
    .then((response) => {
      if (response.status === 200) {
          console.log("got data sss")
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
    <div style= {imageStyle}>


        {items.map(item => (
           <React.Fragment>
               <p> {item.caption}</p>
            <img
            style = {divStyle} 
      src={item.url}

      alt="new"
      />
      
      </React.Fragment> 
         
           
        ))}

    </div>
  );
}
const imageStyle = {
    marginBottom: 80
  
  
  };

const divStyle = {
    height: "250px",
    width: "210px"
  };