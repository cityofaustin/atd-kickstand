import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Details(props) {
  const fields = props.data.fields;
  // many_views_to_many_fields
  return (
    <Row>
      <Col>
          {fields.map((field) => {
            return getField(field.field);
          })}
      </Col>
    </Row>
  );
}

export default Details;
