import React from 'react';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopMenu(){
    return(
    <Nav className="justify-content-center">
        <Nav.Item>
            <Link className="nav-link" to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
            <Link className="nav-link" to="/salons">Salons</Link>
        </Nav.Item>
        <Nav.Item>
            <Link className="nav-link" to="/contact">Contact Us</Link>
        </Nav.Item>
    </Nav>
       



    );
}