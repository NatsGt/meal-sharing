import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from "react-router-dom";
import MealId from "./MealId";
import MainContainer from "./MainContainer";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./MealsList.css";
import SearchBar from "./SearchTitle";
import Form from 'react-bootstrap/Form';

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
    console.log(status)
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
    function postNewMeal() {
        (async () => {
            await fetch('http://localhost:5000/api/meals', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(newMeal) // body data type must match "Content-Type" header
            })
        })();
    }

    useEffect(() => {
        setNewMeal(inputMeal)
    }, [inputMeal])

    function handleChange(input) {
        const { name, value } = input;
        setInputMeal((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit() {
        console.log(newMeal)
        postNewMeal();
        setInputMeal({
            title: "",
            description: "",
            location: "",
            when: "",
            max_reservations: "",
            price: ""
        })
        event.preventDefault();
    }
    return (
        <div className="meal-form">
            <Form.Group controlId="formMealTitle">
                <Form.Label>Title*</Form.Label>
                <Form.Control type="text" placeholder="Enter the name of your meal" name="title" onChange={(e) => handleChange(e.target)} value={inputMeal.title} required autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="formMealTitle">
                <Form.Label>Description*</Form.Label>
                <Form.Control type="text" placeholder="Enter a description" name="description" onChange={(e) => handleChange(e.target)} value={inputMeal.description} required autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="formMealTitle">
                <Form.Label>Location*</Form.Label>
                <Form.Control type="text" placeholder="Location" name="location" onChange={(e) => handleChange(e.target)} value={inputMeal.location} required autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="formMealTitle">
                <Form.Label>Date*</Form.Label>
                <Form.Control type="datetime-local" name="when" onChange={(e) => handleChange(e.target)} value={inputMeal.when} required />
            </Form.Group>
            <Form.Group controlId="formMealTitle">
                <Form.Label>Max Reservation*</Form.Label>
                <Form.Control type="number" placeholder="Max number of guests" name="max_reservations" onChange={(e) => handleChange(e.target)} value={inputMeal.max_reservations} required autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="formMealTitle">
                <Form.Label>Price*</Form.Label>
                <Form.Control type="number" placeholder="Price" name="price" onChange={(e) => handleChange(e.target)} value={inputMeal.price} required autoComplete="off" />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button onClick={handleSubmit} className="form-add-button">
                    Add meal
                </Button>
            </div>

        </div>
    )
}

function OneMealCard(props) {
    return (
        <Card className="meal-card p-3">
            <div className="card-image-container">
                <Card.Img variant="top" className="meal-card-img" src={props.img} alt="meal image" />
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
                <Link to={`${props.url}/${props.link}`}>
                    <Button className="meal-card-button">
                        Go to meal
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

function MealCards(props) {
    return (
        <Row xs={1} md={3} className="g-4 mx-0">
            {Array.from(props.array).map((meal) => {
                let fileName = `./public/img/${meal.id}.jpg`
                return (
                    <Col className="px-0" key={meal.id}>
                        <OneMealCard img={fileName} title={meal.title} description={meal.description} link={meal.id} url={props.url} location={meal.location} time={meal.when} />
                    </Col>
                )
            }
            )}
        </Row>
    )
}

export default function MealsList() {
    const [meals, setMeals] = useState([]);
    const { path, url } = useRouteMatch()
    console.log(url, ' url');
    console.log(path, ' path')

    useEffect(() => {
        fetch('http://localhost:5000/api/meals')
            .then((response) => response.json())
            .then((data) => setMeals(data));
    }, [])

    return (
        <MainContainer componentStyle="meals-section-container ">
            <div className="w-100 d-flex flex-column align-items-center pb-5 px-5">
                <h1 className="mt-5 mb-2">Meal Sharing</h1>
                <div className="w-50 my-5">
                    <SearchBar />
                </div>
                <div className="meal-collection-container">
                    <MealCards array={meals} url={url} />
                </div>
                <ModalContainer />
            </div>

            <Switch>
                <Route path={`${path}/:id`}>
                    <MealId />
                </Route>
            </Switch>
        </MainContainer>
    )
}
