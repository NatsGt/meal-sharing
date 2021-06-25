import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Loading() {
    return <div><FontAwesomeIcon icon={faStar} /></div>
}

export default function fetchData(url) {
    const fetchResponse = fetch(url).then((response) => response.json());
    return fetchResponse;
}

function postNewMeal(url, objectToPost) {
    (async () => {
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(objectToPost) // body data type must match "Content-Type" header
        })
    })();
}

export { postNewMeal, Loading }