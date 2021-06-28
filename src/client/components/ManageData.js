import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'

function Error() {
    return (
        <div className="d-flex justify-content-center my-5">A problem ocurred getting the data <FontAwesomeIcon icon={faFrown} /></div>
    )
}

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
        </div>

    )
}

export default function manageFetch(url) {
    const fetchResponse = fetch(url).then((response) => response.json());
    return fetchResponse;
}

function useFetch(url) {
    const [fetchData, setFetchData] = useState();
    const [fetchError, setFetchError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const databaseData = await response.json();
                setFetchData(databaseData);
                setFetchError("");
            } catch (error) {
                setFetchError(error)
            }
            setLoading(false)
        })();
    }, [url])
    return { fetchData, fetchError, loading }
}

function postData(url, objectToPost) {
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

export { useFetch, postData, Loading, Error }