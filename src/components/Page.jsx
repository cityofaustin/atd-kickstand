import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Page(props) {
  const icon = props.icon ? props.icon : "";

  return (
    <Container>
      <Row>
        <Col>
          <h1>{icon} {props.title}</h1>
        </Col>
      </Row>
      {props.children}
    </Container>
  );
}

export default Page;
