import React from 'react';
import './Application.sass';
import { Container } from 'react-bootstrap';
import TopMenu from '../TopMenu/TopMenu';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import SalonPage from '../SalonPage/SalonPage';
import ContactPage from '../ContactPage/ContactPage';

export default function Application(props: any) {
  return (
    <BrowserRouter>
      <Container className="Application">
        <div className="Application-header">
          Front-end aplikacije
        </div>

        <TopMenu />

        <div className="Application-body">
          <Switch>
            <Route exact path="/" component={ HomePage } />

            <Route path="/salon/:cid?"
                   render={
                     (props: any) => {
                       return ( <SalonPage {...props} /> );
                     }
                   } />

            <Route path="/contact">
              <ContactPage
                title="Our location in Belgrade"
                address="Danijelova 32, 11010 Beograd, Srbija"
                phone="+381 11 30 94 094" />
            </Route>

            <Route path="/profile">
              My profile
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