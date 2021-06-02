import React from "react";
import { Row, Col } from "react-bootstrap";


class BasePageProperties{
    sidebar?: JSX.Element = undefined;
}

export {BasePageProperties};

export default abstract class BasePage<Properties extends BasePageProperties> extends React.Component<Properties>{
    constructor(props: Properties){
        super(props);
    }

    render() {
        const sidebarSizeOnMid = this.props.sidebar ? 3: 0;
        const sidebarSizeOnLg = this.props.sidebar ? 4: 0;
        return (
            <Row className="page-holfer">
                <Col className="page-body" 
                sm={ 12 }
                md={ 12-sidebarSizeOnMid }
                lg={ 12-sidebarSizeOnLg }
                >
                    
                    {this.renderMain}
                </Col>
                <Col className="page-sidebar" 
                    sm={ 12 }
                    md={ sidebarSizeOnMid }
                    lg={ sidebarSizeOnLg }                
                >
                    { this.props.sidebar }
                </Col>
            </Row>

        );
    }

    abstract renderMain(): JSX.Element;

}