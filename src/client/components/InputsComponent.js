import React from 'react';
import Form from 'react-bootstrap/Form';

export default function TextInput(props) {
    return (
        <Form.Group controlId="formMealTitle">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="text" placeholder={props.placeholder} name={props.name} onChange={(e) => props.change(e.target)} value={props.value} autoComplete="off" />
        </Form.Group>
    )
}

function EmailInput(props) {
    return (
        <Form.Group controlId="formMealTitle">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="email" placeholder={props.placeholder} name={props.name} onChange={(e) => props.change(e.target)} value={props.value} autoComplete="off" />
        </Form.Group>
    )
}

function TextArea(props) {
    return (
        <Form.Group controlId="ControlTextarea1">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="textarea" rows={3} type="text" placeholder={props.placeholder} name={props.name} onChange={(e) => props.change(e.target)} value={props.value} />
        </Form.Group>
    )
}

function NumberInput(props) {
    return (
        <Form.Group controlId="formMealTitle">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="number" placeholder={props.placeholder} name={props.name} onChange={(e) => props.change(e.target)} value={props.value} min={props.min} max={props.max} />
        </Form.Group>
    )
}

function DateInput(props) {
    return (
        <Form.Group controlId="formMealTitle">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="datetime-local" placeholder={props.placeholder} name={props.name} onChange={(e) => props.change(e.target)} value={props.value} required />
        </Form.Group>
    )
}

export { EmailInput, TextArea, NumberInput, DateInput }