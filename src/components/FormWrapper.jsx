import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FIELD_COMPONENT_MAP = {
  email: { component: Form.Control },
  text: { component: Form.Control },
  check: { component: Form.Check },
  select: { component: Form.Control, props: { as: "select" } },
};

function getInputComponent(field) {
  const componentDef = FIELD_COMPONENT_MAP[field.input_type];
  const FormInputComponent = componentDef.component;

  if (field.options) {
    return (
      <FormInputComponent
        size="sm"
        key={field.id}
        type={field.type}
        placeholder={field.placeholder}
        {...componentDef.props}
      >
        {field.options.map((option) => (
            <option key={option}>{option}</option>
        ))}
      </FormInputComponent>
    );
  } else {
    return (
      <FormInputComponent
        size="sm"
        key={field.id}
        type={field.type}
        placeholder={field.placeholder}
        {...componentDef.props}
      />
    );
  }
}

function getField(field) {
  return (
    <Form.Group key={field.id} controlId="formBasicEmail">
      <Form.Label>{field.label}</Form.Label>
      {getInputComponent(field)}
      <Form.Text className="text-muted">{field.helper_text}</Form.Text>
    </Form.Group>
  );
}

function FormWrapper(props) {
  const fields = props.data.fields;
  // many_views_to_many_fields
  return (
    <Row>
      <Col md={6}>
        <Form>
          {fields.map((field) => {
            return getField(field.field);
          })}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FormWrapper;
