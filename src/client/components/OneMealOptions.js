import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import MainContainer from "./MainContainer";
import manageFetch, { postUserInput, Loading, Error, useFetch } from "./ManageFetch";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './OneMealOptions.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TextInput, { EmailInput, TextArea, NumberInput } from "./InputsComponent";
import MealImage, { mealImageSource } from "./ImageComponent";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

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

    useEffect(() => {
        setNewReservation(inputReservation)
    }, [inputReservation])

    function controlReservationInputChange(input) {
        const { name, value } = input;
        setInputReservation((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function controlReservationFormSubmit() {
        postUserInput('/api/reservations', newReservation);
        setInputReservation({
            number_of_guests: "",
            meal_id: props.mealId,
            contact_phonenumber: "",
            contact_name: "",
            contact_email: "",
        })
    }
    return (
        <div className="reservation-form">
            <Form onSubmit={controlReservationFormSubmit}>
                <NumberInput change={controlReservationInputChange} label="Number of Guests*" placeholder="Number of guests" name="number_of_guests" value={inputReservation.number_of_guests} min="1" max={availableMeal ? (availableMeal.max_reservations - availableMeal.made_reservations) : 100} />
                <TextInput change={controlReservationInputChange} label="Name*" placeholder="Enter your name" name="contact_name" value={inputReservation.contact_name} />
                <NumberInput change={controlReservationInputChange} label="Phone" placeholder="Contact number" name="contact_phonenumber" value={inputReservation.contact_phonenumber} min="8" />
                <EmailInput change={controlReservationInputChange} label="Email*" placeholder="Contact email" name="contact_email" value={inputReservation.contact_email} />
                <Button type="submit" className="add-button" >
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
        manageFetch('/api/reviews')
            .then((dbReviews) => dbReviews.filter(review => review.meal_id == id))
            .then((mealReviews) => setReviews(mealReviews))
    }, [])
    return (
        <div className="information-box-container mt-5 p-5">
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

    useEffect(() => {
        setNewReview(inputReview)
    }, [inputReview])

    function controlReviewInputChange(input) {
        const { name, value } = input;
        setInputReview((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function controlReviewFormSubmit() {
        postUserInput('/api/reviews', newReview);
        setInputReview({
            title: "",
            meal_id: props.mealId,
            description: "",
            stars: ""
        })
    }
    return (
        <div className="reservation-form">
            <Form onSubmit={controlReviewFormSubmit}>
                <TextInput change={controlReviewInputChange} label="Title" placeholder="Enter a title" name="title" value={inputReview.title} />
                <TextArea change={controlReviewInputChange} label="Description" placeholder="Describe your experience" name="description" value={inputReview.description} />
                <NumberInput change={controlReviewInputChange} label="Stars" placeholder="Review 1-5" name="stars" value={inputReview.stars} min="1" max="5" />
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
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="text-uppercase font-weight-bold">
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

function MealInformation(props) {
    const { meal, availableMeal, error, loading, mealId } = props
    let mealImage = mealImageSource.find(image => image.id == mealId);
    if (mealImage) {
        mealImage = mealImage.src
    } else {
        mealImage = "https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
    if (error) {
        return <Error />
    } else {
        return (
            <div className="information-box-container p-5">
                {loading && <Loading />}
                {meal && <div>
                    <h2 className="meal-title text-center">{meal.title}</h2>
                    <MealImage source={mealImage} />
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
                </div>}
            </div>
        )
    }
}

export default function OneMealOptions() {
    const { id } = useParams();
    const [availableMeal, setAvailableMeal] = useState()
    const [isAvailable, setIsAvailable] = useState(false)
    const url = `/api/meals/${id}`
    const { fetchResponse, fetchError, loading } = useFetch(url)

    useEffect(() => {
        manageFetch(`/api/meals?availableReservations=true`)
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
        <MainContainer componentStyle="meal-section-container py-5 px-lg-5 px-3">
            <Row>
                <Col xs={12} lg={8} className="order-12 order-lg-1">
                    <div className="w-100">
                        <MealInformation availableMeal={availableMeal} meal={fetchResponse} mealId={id} error={fetchError} loading={loading} />
                        <ReviewsBox id={id} />
                    </div>
                </Col>

                <Col xs={12} lg={4} className="order-1 order-lg-12">
                    <div className="w-100 ml-lg-3 my-5 my-lg-0">
                        <MealForms visible={isAvailable} id={id} availableMeal={availableMeal} />
                    </div>
                </Col>

            </Row>


        </MainContainer>)
}
