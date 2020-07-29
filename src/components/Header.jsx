import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Row className="bg-light">
      <Col>
        <h2 className="text-right">John's Admin App</h2>
      </Col>
    </Row>
  );
}

export default Header;
