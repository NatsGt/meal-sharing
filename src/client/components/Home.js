import React from "react";
import MainContainer from "./MainContainer";
import SearchBar from './SearchTitle'
import { useFetch, Loading, Error } from "./ManageFetch";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { ContactImage, reviewImageSource } from './ImageComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Home.css'

function MealsCollection() {
    const url = '/api/meals'
    const { fetchResponse, fetchError, loading } = useFetch(url);

    if (fetchError) {
        return (
            <Error />
        )
    }
    return (
        <div>
            <p>Come and share these meals...</p>
            <ul>
                {loading && <Loading />}
                <Row xs={2} md={3} className="g-4 row-meals-collection">
                    {(fetchResponse) && fetchResponse.map(meal => {
                        return (
                            <Col key={meal.id}>
                                <li className="meal-li" >{meal.title}</li>
                            </Col>
                        )
                    })}
                </Row>
            </ul>
        </div>
    )
}

function StarReview(props) {
    return (
        Array.from({ length: props.length }).map((star, index) => <FontAwesomeIcon className="slide-star" icon={faStar} key={index} />)
    )
}

function ReviewCarousel(props) {

    return (
        <Carousel>
            {props.content.map(aReview => {
                let userImage = reviewImageSource.find(contactImage => contactImage.reviewId == aReview.id);
                if (userImage) {
                    userImage = userImage.src;
                } else {
                    userImage = "https://images.pexels.com/photos/7133214/pexels-photo-7133214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                return (
                    <Carousel.Item key={aReview.id}>
                        <div className="d-flex justify-content-center align-items-start w-100 slide-content pt-5">
                            <div className="slide-img">
                                <ContactImage src={userImage} />
                            </div>
                        </div>
                        <Carousel.Caption>
                            <p className="slide-text mb-0">{aReview.description}</p>
                            <StarReview length={aReview.stars} />
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

function ReviewsSection() {
    const url = '/api/reviews'
    const { fetchResponse, fetchError } = useFetch(url);

    if (fetchError) {
        return (
            <MainContainer componentStyle="reviews-section">
                <Error />
            </MainContainer>
        )
    } else {
        return (
            <MainContainer componentStyle="reviews-section">
                {fetchResponse && <ReviewCarousel content={fetchResponse.filter((review) => review.stars >= 4)} />}
            </MainContainer>
        )
    }


}

function MealsSection() {
    return (
        <MainContainer componentStyle="meals-section pr-3">
            <div className="d-flex flex-column flex-lg-row">
                <div className="image-shape"></div>
                <div className="d-flex flex-column justify-content-center">
                    <h2 className="meals-section-title">Discover</h2>
                    <p>Experience new flavours, test your boundaries, have an experience of a lifetime with your loved ones while you meet new cultures through food.</p>
                    <MealsCollection />
                </div>
            </div>
        </MainContainer>
    )
}

function MainPage() {
    return (
        <MainContainer componentStyle="home-page-container">
            <div className="main-text-container text-center d-flex flex-column justify-content-center align-items-center" >
                <div className="titles-container">
                    <h1 className="main-title">Meal Sharing</h1>
                    <p className="sub-title">
                        Food tastes better when you share it
                    </p>
                </div>
                <div className="w-50 mt-5">
                    <SearchBar />
                </div>
            </div>
        </MainContainer>
    )

}

function FooterSection() {
    return (
        <footer className="py-3 text-center">
            Created by <a href="https://github.com/NatsGt">NatsGt</a>
        </footer>
    )
}

export default function Home() {
    return (
        <div>
            <MainPage />
            <ReviewsSection />
            <MealsSection />
            <FooterSection />
        </div>
    )
}