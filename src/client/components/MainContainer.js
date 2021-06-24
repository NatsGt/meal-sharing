import React, { useEffect, useState } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function MainContainer(props) {
    const { componentStyle, children } = props;
    return (
        <Jumbotron className={componentStyle + " mb-0 py-0"} fluid>
            {children}
        </Jumbotron>
    )
}