import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Row className="bg-dark shadow mb-3">
      <Col>
        <h2 className="text-right text-white">John's Admin App</h2>
      </Col>
    </Row>
  );
}

export default Header;
