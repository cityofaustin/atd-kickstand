import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Menu(props) {
  return (
    <Row>
      <Col>
        {props.buttons.map((button) => {
          return (
            <Button key={button.label} className="mr-2" {...button.props}>
              {button.label}
            </Button>
          );
        })}
      </Col>
    </Row>
  );
}
