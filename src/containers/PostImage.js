import React, { useState , useRef, useEffect } from "react";
import FileUploader from './FileSelector'
import { withRouter , useHistory } from 'react-router-dom';

 export  default function PostImage()  {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const history = useHistory();


  const submitForm = async (event) => {
    event.preventDefault();
    const getToken = await sessionStorage.getItem("myToken");
   // const myFile = await localStorage.getItem("myFile");
    console.log( selectedFile , "this is my filre");
    const formData = new FormData();
    formData.append("caption", name);
    formData.append("image", selectedFile);


    return fetch("http://127.0.1.1:3333/api/posts", {
          method: 'post',
        
          body: (formData) , 
          headers: {
            auth_token: getToken
          }
        })
          .then((response) => {
            if (response.status === 201) {
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
        
          })

  }

  

  const onChangeHandler = (e) => {
       const file = e.target.files[0];

       setSelectedFile(file)

  }

  useEffect(() => {

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
    
          console.log("you are in")
      }

  }

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
  
          onChange={(e) => onChangeHandler(e)}
          
        />

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
}

 