import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Nav(props) {
  return props.pages.map((page) => {
    return (
      <Col key={page.props.id}>
        <a href={page.props.route} className="text-reset">
          <p className="text-right">{page.props.title}</p>
        </a>
      </Col>
    );
  });
}
