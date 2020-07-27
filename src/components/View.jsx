import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormWrapper from "./FormWrapper";
import Table from "./Table";

function View(props) {
  const forms = props.data.forms ? props.data.forms : [];
  const tables = props.data.tables ? props.data.tables : [];

  if (forms.length) {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h4>{props.data.label}</h4>
          </Col>
        </Row>
        <FormWrapper key={forms[0].id} data={forms[0]} />
      </React.Fragment>
    );
  }

  if (tables.length) {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h4>{props.data.label}</h4>
          </Col>
        </Row>
        <Table data={tables[0]} param={props.param} match={props.match} />
      </React.Fragment>
    );
  }

  return null;
}

export default View;
