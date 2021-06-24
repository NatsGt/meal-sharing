import React from "react";

export default function fetchData(url) {
    const fetchResponse = fetch(url).then((response) => response.json());
    return fetchResponse;
}