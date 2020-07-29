import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function Menu(props) {
  const buttons = props.data.buttons;

  return (
    <Row>
      <Col>
        {buttons.map((button) => {
          return <Button key={button.label} className="mr-2" variant={button.variant}>{button.label}</Button>;
        })}
      </Col>
    </Row>
  );
}

export default Menu;
