import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Nav(props) {
  return props.pages.map((page) => {
    return (
      <Row key={page.id}>
        <Col>
          <a href={`/${page.slug}`} className="text-reset">
            <p className="text-right">{page.label}</p>
          </a>
        </Col>
      </Row>
    );
  });
}
