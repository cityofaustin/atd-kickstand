import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormWrapper from "./FormWrapper";
import Table from "./Table";
import Menu from "./Menu";

function View(props) {
  const forms = props.data.forms;
  const tables = props.data.tables;
  const menus = props.data.menus;

  if (forms !== undefined && forms.length > 0) {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h4>{props.data.label}</h4>
          </Col>
        </Row>
        <FormWrapper
          key={forms[0].id}
          data={forms[0]}
          refetch={props.refetch}
          setRefetch={props.setRefetch}
        />
      </React.Fragment>
    );
  }

  if (tables !== undefined && tables.length > 0) {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h4>{props.data.label}</h4>
          </Col>
        </Row>
        <Row className="mx-1">
          <Col>
            <Table
              key={tables[0].id}
              data={tables[0]}
              param={props.param}
              match={props.match}
              refetch={props.refetch}
              setRefetch={props.setRefetch}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  if (menus !== undefined && menus.length > 0) {
    return (
      <Row>
        <Col>
          <Menu data={menus[0]} />
        </Col>
      </Row>
    );
  }

  return null;
}

export default View;
