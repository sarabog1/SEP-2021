import React from 'react';
import './Application.sass';
import { Container } from 'react-bootstrap';
import TopMenu from '../TopMenu/TopMenu';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import SalonPage from '../SalonPage/SalonPage';
import ContactPage from '../ContactPage/ContactPage';

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
              <ContactPage title="Our location in Belgrade" address="Danijelova 32"
              phone="+381112345673" />
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
