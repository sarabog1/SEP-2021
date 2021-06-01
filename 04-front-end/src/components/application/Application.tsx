import React from 'react';
import './Application.sass';
import { Container, Button } from 'react-bootstrap';
import TopMenu from '../TopMenu/TopMenu';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import SalonPage from '../SalonPage/SalonPage';

function Application() {
  return (
    <BrowserRouter>
      <Container className="Application" fluid>

        <div className="Application-header">
        Front-end aplikacije
        </div>


        <TopMenu /> 


        <div className="application-body">
        
          <Switch>
            <Route exact path="/" component={ HomePage } />
              
            <Route path="/salons" component={ SalonPage } />
              
            <Route exact path="/contact">
              Contact Us
            </Route>
          </Switch>

        </div>
        <div>
        &copy; 2021...
        </div>



      </Container>
    </BrowserRouter>
    
  );
}

export default Application;
