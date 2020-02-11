import React from 'react';
import Col from "reactstrap/es/Col";

const centerStyle = {
    textAlign: 'center'
};

const NetworkErrorMessage = () => {
    return (
        <div>
            <Col>
                <h1 style={centerStyle}>network error</h1>
            </Col>
        </div>
    )
};

export default NetworkErrorMessage;
