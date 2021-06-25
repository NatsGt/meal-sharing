import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import MainContainer from "./MainContainer";
import fetchData, { postData } from "./ManageData";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './MealId.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TextInput, { EmailInput, TextArea, NumberInput } from "./InputsComponent";

function AddNewReservation(props) {
    const { availableMeal } = props;
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
            await fetch('/api/reservations', {
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
            meal_id: props.mealId,
            contact_phonenumber: "",
            contact_name: "",
            contact_email: "",
        })
        event.preventDefault();
    }
    return (
        <div className="reservation-form">
            <Form>
                <NumberInput change={handleChange} label="Number of Guests*" placeholder="Number of guests" name="number_of_guests" value={inputReservation.number_of_guests} min="1" max={availableMeal ? (availableMeal.max_reservations - availableMeal.made_reservations) : 100} />
                <TextInput change={handleChange} label="Name*" placeholder="Enter your name" name="contact_name" value={inputReservation.contact_name} />
                <NumberInput change={handleChange} label="Phone" placeholder="Contact number" name="contact_phonenumber" value={inputReservation.contact_phonenumber} min="8" />
                <EmailInput change={handleChange} label="Email*" placeholder="Contact email" name="contact_email" value={inputReservation.contact_email} />
                <Button className="add-button" onClick={handleSubmit}>
                    Book reservation
                </Button>
            </Form>
        </div>
    )
}

function StarReview(props) {
    return (
        Array.from({ length: props.length }).map((star, index) => <FontAwesomeIcon className="slide-star" icon={faStar} key={index} />)
    )
}

function Review(props) {
    return (
        <div className="review-container p-3 my-2">
            <h6 className="review-title">{props.title}</h6>
            <p>{props.description}</p>
            <StarReview length={props.review} />
        </div>
    )
}


function ReviewsBox(props) {
    const { id } = props
    const [reviews, setReviews] = useState()
    useEffect(() => {
        fetchData('/api/reviews')
            .then((data) => data.filter(review => review.meal_id == id))
            .then((mealReviews) => setReviews(mealReviews))
    }, [])
    return (
        <div className="data-container mt-5 p-5">
            <h3>Customers reviews</h3>
            <div className="reviews-container my-5">
                {(reviews && reviews.length > 0) ? (reviews.map(review => <Review key={review.id} title={review.title} description={review.description} review={review.stars} />)) : <div>No reviews</div>}
            </div>
            <h5 className="mb-3 add-review-title">Add your review</h5>
            <AddReview mealId={id} />
        </div>
    )
}

function AddReview(props) {
    const [newReview, setNewReview] = useState({})
    const [inputReview, setInputReview] = useState({
        title: "",
        meal_id: props.mealId,
        description: "",
        stars: ""
    })
    function postNewReservation() {
        (async () => {
            await fetch('/api/reviews', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(newReview) // body data type must match "Content-Type" header
            })
        })();

    }

    useEffect(() => {
        setNewReview(inputReview)
    }, [inputReview])

    function handleChange(input) {
        const { name, value } = input;
        setInputReview((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit() {
        postNewReservation();
        setInputReview({
            title: "",
            meal_id: props.mealId,
            description: "",
            stars: ""
        })
    }
    return (
        <div className="reservation-form">
            <Form onSubmit={handleSubmit}>
                <TextInput change={handleChange} label="Title" placeholder="Enter a title" name="title" value={inputReview.title} />
                <TextArea change={handleChange} label="Description" placeholder="Describe your experience" name="description" value={inputReview.description} />
                <NumberInput change={handleChange} label="Stars" placeholder="Review 1-5" name="stars" value={inputReview.stars} min="1" max="5" />
                <Button type="submit" className="add-button">
                    Add review
                </Button>
            </Form>
        </div>
    )
}

function MealForms(props) {
    return (
        <Accordion className="accordion-box">
            <Card>
                <Card.Header >
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="text-uppercase">
                        Make a reservation
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {props.visible ? <AddNewReservation mealId={props.id} guests={props.availableMeal} /> : <div>No available reservations</div>}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

function MealData(props) {
    const { meal, availableMeal } = props

    return (
        <div className="data-container p-5">
            <h2 className="meal-title text-center">{meal.title}</h2>
            <img src={`./public/img/${meal.id}.jpg`} alt="image of the meal" className="meal-img" />
            <div className="pt-5">
                <h4 className="font-weight-bold">Description</h4>
                <p>{meal.description}</p>
                <h4 className="font-weight-bold">Location</h4>
                <p>{meal.location}</p>
                <h4 className="font-weight-bold">Date</h4>
                <p>{new Date(meal.when).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                <h4 className="font-weight-bold">Available spaces</h4>
                <p>{(availableMeal) ? (availableMeal.max_reservations - availableMeal.made_reservations) + " persons" : "No reservations left"}</p>
            </div>
        </div>
    )
}


export default function MealId() {
    const { id } = useParams();
    const [meal, setMeal] = useState({});
    const [availableMeal, setAvailableMeal] = useState()
    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        fetchData(`/api/meals/${id}`)
            .then(values => setMeal(values))

    }, [])

    useEffect(() => {
        fetchData(`/api/meals?availableReservations=true`)
            .then(values => {
                const availableMeals = values;
                return availableMeals
            })
            .then((availableMeals) => {
                const checkAvailable = availableMeals.find(oneMeal => oneMeal.id == id);
                setAvailableMeal(checkAvailable);
                setIsAvailable(checkAvailable !== undefined);
            })
    }, [])

    return (
        <MainContainer componentStyle="meal-section-container d-flex flex-column flex-lg-row justify-content-lg-between p-5">
            <div>
                <MealData meal={meal} availableMeal={availableMeal} />
                <ReviewsBox id={id} />
            </div>
            <div className="accordion-container">
                <MealForms visible={isAvailable} id={id} availableMeal={availableMeal} />
            </div>
        </MainContainer>)
}
