import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormField from "./FormField";

function getFormField(field, editing, currentValue, setChangeEvent) {
  return (
    <FormField
      key={field.name}
      field={field}
      editing={editing}
      value={currentValue}
      setChangeEvent={setChangeEvent}
    />
  );
}

export default function Form(props) {
  let fields = [
      {
        id: 1,
        name: "field",
        label: "Field",
        data_type: "text",
        read_only: false,
        input_type: "text",
    },
    {
      id: 2,
      name: "operator",
      label: "Operator",
      data_type: "text",
      read_only: false,
      input_type: "select",
      options: ["is", "is not", "contains"],
    },
    {
      id: 3,
      name: "value",
      label: "Value",
      data_type: "text",
      read_only: false,
      input_type: "text",
    },
  ]

  let initialValues = {};

  fields.map((field) => {
    initialValues[field.name] = undefined;
    return null;
  });

  // this state will be updated on any input change
  const [currentValues, setCurrentValues] = React.useState(initialValues);

  const columns = groupFieldsIntoColumns(formFields, props.num_columns);

  return (
    <Row className="mb-2">
      <Col>
        <BootstrapForm>
          {columns.map((fields, i) => {
            return (
              <Row key={`form-row-${i}`}>
                {fields.map((Field) => {
                  return Field;
                })}
              </Row>
            );
          })}
        </BootstrapForm>
      </Col>
    </Row>
  );
}
