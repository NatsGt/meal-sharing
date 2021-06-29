import React from 'react';
import { Image } from "react-bootstrap";

const reviewImageSource = [
    {
        contact_name: "Chuck Norris",
        src: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwNTA1Mzc0MzgwNTMzMzky/gettyimages-150327735-copy.jpg"
    },
    {
        contact_name: "Rachel Green",
        src: "https://seriefriends.com/wp-content/uploads/2020/10/rachel-green.jpg"
    },
    {
        contact_name: "Rory Gilmore",
        src: "https://brendaforever.files.wordpress.com/2016/08/66f60900-fd8b-0132-f418-0e18518aac2f.jpg?w=840"
    },
    {
        contact_name: "John Dorian",
        src: "https://brendaforever.files.wordpress.com/2016/08/66f60900-fd8b-0132-f418-0e18518aac2f.jpg?w=840https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Scrubs-J.D..jpg"
    },
    {
        contact_name: "Ted Mosby",
        src: "https://static.wikia.nocookie.net/comoconociavuestramadre/images/a/a3/Ted_profile.jpg/revision/latest/top-crop/width/360/height/450?cb=20120905094024&path-prefix=es"
    },

]

const mealImageSource = [
    {
        id: 5,
        src: "https://anothermusicinadifferentkitchen.com/wp-content/uploads/2020/05/one-pot-rice-and-beans-featured.jpg"
    },
    {
        id: 15,
        src: "https://cdn.kiwilimon.com/recetaimagen/2806/25790.jpg"
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
    <Image className="slide-img"
        src={props.src}
        alt="author of review"
        roundedCircle />
}

export { mealImageSource, ContactImage };