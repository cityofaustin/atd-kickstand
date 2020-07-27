import React from "react";
import View from "./View";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Page(props) {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>{props.data.label}</h3>
        </Col>
      </Row>
      {props.data.views.map((view) => {
        return <View key={view.id} data={view} />;
      })}
    </React.Fragment>
  );
}

export default Page;
