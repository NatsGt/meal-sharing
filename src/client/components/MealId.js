import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import MainContainer from "./MainContainer";

function AddNewReservation(props) {
    const [newReservation, setNewReservation] = useState({})
    const [inputReservation, setInputReservation] = useState({
        number_of_guests: "",
        meal_id: props.mealId,
        contact_phonenumber: "",
        contact_name: "",
        contact_email: "",
    })
    function postNewReservation() {
        (async () => {
            await fetch('http://localhost:5000/api/reservations', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(newReservation) // body data type must match "Content-Type" header
            })
        })();

    }

    useEffect(() => {
        setNewReservation(inputReservation)
    }, [inputReservation])

    function handleChange(input) {
        const { name, value } = input;
        setInputReservation((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit() {
        console.log(newReservation)
        postNewReservation();
        setInputReservation({
            number_of_guests: "",
            contact_phonenumber: "",
            contact_name: "",
            contact_email: "",
        })
        event.preventDefault();
    }
    return (
        <div className="reservation-form">
            <form >
                <label>Number of guests</label>
                <input name="number_of_guests" onChange={(e) => handleChange(e.target)} value={inputReservation.number_of_guests}></input>
                <label>Name</label>
                <input name="contact_name" onChange={(e) => handleChange(e.target)} value={inputReservation.contact_name}></input>
                <label>Phone</label>
                <input name="contact_phonenumber" onChange={(e) => handleChange(e.target)} value={inputReservation.contact_phonenumber}></input>
                <label>Email</label>
                <input name="contact_email" onChange={(e) => handleChange(e.target)} value={inputReservation.contact_email}></input>
                <button onClick={handleSubmit}>
                    Book reservation
                </button>
            </form>
        </div>
    )
}

export default function MealId() {
    const { id } = useParams();
    const [meal, setMeal] = useState({});
    console.log("its calling")
    useEffect(() => {
        fetch(`http://localhost:5000/api/meals/${id}`)
            .then((response) => response.json())
            .then((data) => setMeal(data))
    }, [])
    return (
        <MainContainer componentStyle="meal-section-container">
            The meal {meal.id} was selected. Its title is {meal.title}
            <AddNewReservation mealId={id} />
        </MainContainer>)
}