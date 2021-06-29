import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from "react-router-dom";
import OneMealOptions from "./OneMealOptions";
import MainContainer from "./MainContainer";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import "./MealsList.css";
import SearchBar from "./SearchTitle";
import TextInput, { TextArea, NumberInput, DateInput } from "./InputsComponent";
import { postUserInput, Loading, useFetch, Error } from "./ManageFetch";
import { mealImageSource } from "./ImageComponent";

function FormModal(props) {
    return (
        <div className="modal-layover">
            <div className="modal-container">
                <AddMeal />
                <Button onClick={props.close} className="modal-button" size="sm">x</Button>
            </div>
        </div>
    )
}

function ModalContainer() {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (status) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [status]);

    function showModal() {
        setStatus(!status);
    }
    return (
        <div>
            <Button size="lg" className="add-meal-button" onClick={showModal}>
                Add a Meal
            </Button>
            {status && <FormModal close={showModal} />}
        </div>
    )
}

function AddMeal() {
    const [newMeal, setNewMeal] = useState({})
    const [inputMeal, setInputMeal] = useState({
        title: "",
        description: "",
        location: "",
        when: "",
        max_reservations: "",
        price: ""
    })

    useEffect(() => {
        setNewMeal(inputMeal)
    }, [inputMeal])

    function controlInputChange(input) {
        const { name, value } = input;
        setInputMeal((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function controlFormSubmit() {
        postUserInput('/api/meals', newMeal);
        setInputMeal({
            title: "",
            description: "",
            location: "",
            when: "",
            max_reservations: "",
            price: ""
        })
    }
    return (
        <div className="meal-form">
            <Form onSubmit={controlFormSubmit}>
                <TextInput change={controlInputChange} label="Title*" placeholder="Enter the name of your meal" name="title" value={inputMeal.title} />
                <TextArea change={controlInputChange} label="Description*" placeholder="Enter a description" name="description" value={inputMeal.description} />
                <TextInput change={controlInputChange} label="Location*" placeholder="Enter the location" name="location" value={inputMeal.location} />
                <DateInput change={controlInputChange} label="Date*" placeholder="Enter the date and time" name="when" value={inputMeal.when} />
                <NumberInput change={controlInputChange} label="Max Reservation*" placeholder="Max number of guests" name="max_reservations" value={inputMeal.max_reservations} min="1" max="100" />
                <NumberInput change={controlInputChange} label="Price*" placeholder="Price" name="max_reservations" value={inputMeal.price} min="1" max="1000000" />
                <div className="d-flex justify-content-center">
                    <Button type="submit" className="form-add-button">
                        Add meal
                    </Button>
                </div>
            </Form>
        </div>
    )
}

function OneMealCard(props) {

    let mealImage = mealImageSource.find(oneImage => oneImage.id == props.id)
    if (mealImage) {
        mealImage = mealImage.src
    } else {
        mealImage = "https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }

    return (
        <Card className="meal-card p-3">
            <div className="card-image-container">
                {<Card.Img variant="top" className="meal-card-img" src={mealImage} alt="meal image" />}
            </div>
            <Card.Body className="px-0">
                <Card.Title className="meal-card-title">{props.title}</Card.Title>
                <div className="meal-card-text-container">
                    <Card.Text className="meal-card-text text-truncate">
                        {props.description}
                    </Card.Text>
                    <Card.Text className="meal-card-text">
                        {props.location}
                    </Card.Text>
                </div>
                <Link to={`${props.url}/${props.id}`}>
                    <Button className="meal-card-button">
                        Go to meal
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

function MealCards(props) {
    const urlFetch = '/api/meals';
    const { fetchResponse, fetchError, loading } = useFetch(urlFetch)
    const { url } = props;

    if (fetchError) {
        return <Error />
    } else {
        return (
            <div>
                {loading && <Loading />}
                <Row xs={1} md={3} className="g-4 mx-0">
                    {fetchResponse && Array.from(fetchResponse).map((meal) => {
                        return (
                            <Col className="px-0" key={meal.id}>
                                <OneMealCard id={meal.id} title={meal.title} description={meal.description} url={url} location={meal.location} time={meal.when} />
                            </Col>
                        )
                    }
                    )}
                </Row>
            </div>
        )
    }
}

export default function MealsList() {
    const { path, url } = useRouteMatch()
    return (
        <MainContainer componentStyle="meals-section-container ">
            <div className="w-100 d-flex flex-column align-items-center pb-5 px-5">
                <h1 className="mt-5 mb-2">Meal Sharing</h1>
                <div className="w-50 my-5">
                    <SearchBar />
                </div>
                <div className="meal-collection-container">
                    <MealCards url={url} />
                </div>
                <ModalContainer />
            </div>
            <Switch>
                <Route path={`${path}/:id`}>
                    <OneMealOptions />
                </Route>
            </Switch>
        </MainContainer>
    )
}
