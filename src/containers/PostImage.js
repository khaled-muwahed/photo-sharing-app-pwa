import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from "../components/Button";
import { getApiUrl } from "../utils";

export default function PostImage() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const history = useHistory();


  const submitForm = async (event) => {
    event.preventDefault();
    const getToken = await sessionStorage.getItem("myToken");
    const formData = new FormData();
    formData.append("caption", name);
    formData.append("image", selectedFile);


    return fetch(getApiUrl("/api/posts"), {
      method: 'post',

      body: (formData),
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
        console.log('image posted sucessfully', responseJson);
        // Now navigate to home
        history.push('/');
      })
      .catch((error) => {
        console.log(error);

      })

  }

  const onChangeHandler = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file)

  }


  return (
    <div className="App">

      <form className="my-6 flex flex-col justify-center space-y-6">

        <input
          className="block mx-auto"
          type="file"
          onChange={(e) => onChangeHandler(e)}
        />

        <textarea
          className="border-2 border-gray-300 p-4 rounded-md block mx-auto"
          placeholder="Enter caption"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <Button onClick={submitForm}>Upload</Button>
        </div>
      </form>
    </div>
  );
}

