import React, { useState, useEffect } from "react";
import "./Login.css";
import { withRouter } from 'react-router-dom';
import { getApiUrl, /*getImageUrl */} from "../utils";


function GetData() {
    const [items, setItems] = useState([]);
    const [token, setToken] = useState("");


    useEffect(() => {
        getData();
    }, []);







    const getData = async () => {


        return await fetch(getApiUrl("/api/posts/feed"), {
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
                const resJson = await responseJson;

                setItems(resJson.images);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (



        <div>

            {/*// We use flex column reverse to change the order of the images to display the most recent ones*/}
            <div className="flex flex-col-reverse my-6 mx-2">

                {items.reverse().map(item => (
                    <React.Fragment key={item.id}>

                        <div className="mb-3 shadow-md w-full lg:w-1/2 mx-auto rounded-md overflow-hidden" style={{ maxWidth: '600px' }}>
                            <img
                                className="mx-auto block"
                                src={/*getImageUrl*/(item.url)}
                                alt="new"
                            />

                            <div className="flex justify-between px-4 py-2">

                                <div className="flex-grow flex space-x-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>

                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>

                            </div>

                            <p className="mx-4 mb-3 text-gray-400 text-left">{item.caption}</p>
                        </div>
                    </React.Fragment>
                ))}

            </div>
        </div>

    );
}


export default
    withRouter(GetData);
