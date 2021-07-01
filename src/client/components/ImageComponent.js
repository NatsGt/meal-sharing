import React from 'react';
import { Image } from "react-bootstrap";

const reviewImageSource = [
    {
        reviewId: 15,
        contact_name: "Chuck Norris",
        src: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwNTA1Mzc0MzgwNTMzMzky/gettyimages-150327735-copy.jpg"
    },
    {
        reviewId: 75,
        contact_name: "Rachel Green",
        src: "https://seriefriends.com/wp-content/uploads/2020/10/rachel-green.jpg"
    },
    {
        reviewId: 25,
        contact_name: "Rory Gilmore",
        src: "https://media.allure.com/photos/580e7d3b2e7c1dc713a4171d/1:1/w_2000,h_2000,c_limit/rory5.jpg"
    },
    {
        reviewId: 45,
        contact_name: "John Dorian",
        src: "http://vignette2.wikia.nocookie.net/scrubs/images/4/48/7x10_JD_fantasizes.jpg/revision/latest?cb=20091127224549"
    },
    {
        reviewId: 55,
        contact_name: "Frodo Baggins",
        src: "https://data.whicdn.com/images/323930225/original.jpg"
    },
]

const mealImageSource = [
    {
        id: 5,
        src: "https://anothermusicinadifferentkitchen.com/wp-content/uploads/2020/05/one-pot-rice-and-beans-featured.jpg"
    },
    {
        id: 15,
        src: "https://res.cloudinary.com/hksqkdlah/image/upload/SFS_papusas-173_vojda5.jpg"
    },
    {
        id: 25,
        src: "https://mk0madensverdencsg1n.kinstacdn.com/wp-content/uploads/2017/03/flaeskesteg-i-ovn.jpg"
    },
    {
        id: 35,
        src: "https://lanoticia.com/wp-content/uploads/2020/10/adobestock-193828285-scaled.jpeg"
    },
    {
        id: 45,
        src: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: 55,
        src: "https://images.pexels.com/photos/1123250/pexels-photo-1123250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: 65,
        src: "https://images.pexels.com/photos/8448161/pexels-photo-8448161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
]


export default function MealImage(props) {
    return <Image src={props.source} rounded fluid />
}

function ContactImage(props) {
    return (
        <Image
            src={props.src}
            alt="author of review"
            fluid
        />
    )

}

export { mealImageSource, ContactImage, reviewImageSource };