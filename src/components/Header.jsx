import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Container fluid>
      <Row className="bg-light">
        <Col>
          <h2 className="text-right">John's Admin App</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
