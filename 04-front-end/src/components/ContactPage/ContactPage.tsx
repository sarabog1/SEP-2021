import React from "react";
import { BasePageProperties } from "../BasePage/BasePage";
import BasePage from '../BasePage/BasePage';

class ContactPageProperties extends BasePageProperties {
    title: string = "Contact Us";
    phone: string = "";
    address: string = "";
}

export default class ContactPage extends BasePage<ContactPageProperties> {
    constructor(props: ContactPageProperties){
        super(props);

    }
    renderMain(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    We are located at... : <br />
                    { this.props.address }
                </p>
                <p>Phone:{ this.props.phone }</p>
            </div>
        );
    }
}