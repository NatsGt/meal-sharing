import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import './SearchTitle.css';
import useOnClickOutside from "./UseOnClickOutside";

function ResultItem(props) {
    const [hoverMeal, setHoverMeal] = useState(false)
    return (
        <div onMouseOver={() => setHoverMeal(true)} onMouseOut={() => setHoverMeal(false)} onClick={() => props.click(props.title, props.id)} className={hoverMeal ? "result-item-hover result-item" : "result-item"}>{props.title}</div>
    )
}

function ResultBox(props) {
    return (
        <div className="results-container p-3">
            {props.result.map(titleMatch => <ResultItem key={titleMatch.id} id={titleMatch.id} click={props.click} title={titleMatch.title} className="result-item" />)}
        </div>
    )
}

function InputSearch(props) {
    return (
        <InputGroup className="mt-3" >
            <FormControl
                onChange={(e) => {
                    props.change(e.target.value)
                }}
                onFocus={() => props.visible(true)}
                placeholder="Search for a meal"
                aria-label="Search for a meal"
                aria-describedby="basic-addon2"
                value={props.value}
            />
            <InputGroup.Append>
                <Link to={(props.id) ? `meals/${props.id}` : '/'}><Button variant="outline-secondary"> Search</Button></Link>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default function SearchBar() {
    const ref = useRef();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [visible, setVisible] = useState(false);
    const [queryId, setQueryId] = useState();

    useOnClickOutside(ref, () => setVisible(false));

    useEffect(() => {
        if (query) {
            fetch(`http://localhost:5000/api/meals?title=${query}`)
                .then((response) => response.json())
                .then((data) => setResults(data));
        } else {
            setResults([])
        }
    }, [query])

    function resultClick(title, id) {
        setQuery(title)
        setQueryId(id)
        setVisible(false)
    }

    return (
        <div ref={ref}>
            <InputSearch value={query} id={queryId} visible={setVisible} change={setQuery} />
            {visible && (results.length > 0) && <ResultBox result={results} click={resultClick} />}
        </div>
    )
}
