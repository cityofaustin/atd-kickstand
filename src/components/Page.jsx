import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "../components/Nav";

function Page(props) {
  const icon = props.icon ? props.icon : "";

  return (
      <Col className="border-left vh-100">
        <Row>
          <Col>
            <h1>
              {icon} {props.title}
            </h1>
          </Col>
        </Row>
        {props.children}
      </Col>
  );
}

export default Page;
