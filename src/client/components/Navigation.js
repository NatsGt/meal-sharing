import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import './Navigation.css'

export default function Navigation() {
    return (
        <div>
            <Navbar bg="light" expand="lg" className="nav-bar" >
                <Navbar.Brand className="nav-brand-title" href="#">Meal Sharing</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0 w-100"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className="w-100 d-flex flex-column flex-lg-row justify-content-lg-end">
                            <Link to="/" className="px-5 text-center nav-link">Home</Link>
                            <Link to="/meals" className="px-5 text-center nav-link">Meals</Link>
                            <Link to="/reviews" className="px-5 text-center nav-link">Reviews</Link>
                        </div>


                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </div>

    )
}