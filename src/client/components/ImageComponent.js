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
        src: "https://brendaforever.files.wordpress.com/2016/08/66f60900-fd8b-0132-f418-0e18518aac2f.jpg?w=840"
    },
    {
        reviewId: 45,
        contact_name: "John Dorian",
        src: "https://brendaforever.files.wordpress.com/2016/08/66f60900-fd8b-0132-f418-0e18518aac2f.jpg?w=840https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Scrubs-J.D..jpg"
    },
    {
        reviewId: 55,
        contact_name: "Frodo Baggins",
        src: "https://i.pinimg.com/originals/98/f3/09/98f309bd89d9ed8fe2133589012aa089.jpg"
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
        src: "http://www.primeraedicion.com.ar/wp-content/uploads/2019/09/arepa.jpg"
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