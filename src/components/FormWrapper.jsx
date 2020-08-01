import React from "react";
import { gql, useMutation } from "@apollo/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Autocomplete from "./Autocomplete";
import { Typeahead } from "react-bootstrap-typeahead";

const FIELD_COMPONENT_MAP = {
  email: { component: Form.Control },
  text: { component: Form.Control },
  check: { component: Form.Check },
  select: { component: Form.Control, props: { as: "select" } },
  text_area: { component: Form.Control, props: { as: "textarea", rows: "3" } },
  autocomplete: { component: Autocomplete },
};

function getInputComponent(field) {
  const componentDef = FIELD_COMPONENT_MAP[field.input_type];
  const FormInputComponent = componentDef.component;

  if (field.input_type === "autocomplete") {
    return <Autocomplete field={field} />;
  } else if (field.options) {
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
    <Col>
      <Form.Group key={field.name} controlId={field.name}>
        <Form.Label size="sm">{field.label}</Form.Label>
        {getInputComponent(field)}
        <Form.Text className="text-muted">{field.helper_text}</Form.Text>
      </Form.Group>
    </Col>
  );
}

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  return error.graphQLErrors.map((message) => message.message);
}

function handleSubmit(
  e,
  formValues,
  setSubmitted,
  submitForm,
  refetch,
  setRefetch
) {
  e.preventDefault();
  setSubmitted(true);
  submitForm({
    variables: { object: formValues },
    onCompleted: setRefetch(!refetch),
  });
}

function handleChange(e, formValues, setFormValues) {
  debugger;
  formValues[e.target.id] = e.target.value;
  setFormValues(formValues);
}

function groupFieldsIntoColumns(fields, num_columns) {
  num_columns = num_columns < 1 ? 1 : num_columns;
  let columns = [];
  for (let i = 0; i < fields.length; i += num_columns) {
    columns.push(fields.slice(i, i + num_columns));
  }
  return columns;
}

export default function FormWrapper(props) {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitForm, loading, error, data] = useMutation(
    gql`
      ${props.data.mutation}
    `
  );
  const fields = props.data.fields;
  // initialize the form values state, one key per field, all undefined
  // todo: this won't work for an "update" form, obviously
  // todo: support default vals
  // todo: support `weight` field prop
  let initalValues = {};

  fields.map((field) => {
    initalValues[field.field.name] = undefined;
    return null;
  });

  // this state will be updated on any input change
  const [formValues, setFormValues] = React.useState(initalValues);

  const columns = groupFieldsIntoColumns(fields, props.data.num_columns);

  if (submitted && error) {
    return <Alert variant="danger">{getErrorMessage(error)}</Alert>;
  }

  if (submitted && loading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (submitted) {
    return (
      <React.Fragment>
        <Alert variant="success">
          <Col>Form submitted!</Col>
          <Col>
            <Button
              variant="secondary"
              type="reload-form"
              onClick={(e) => setSubmitted(false)}
            >
              Reload Form
            </Button>
          </Col>
        </Alert>
        ;
      </React.Fragment>
    );
  }

  return (
    <Row key={`form-${props.data.id}`}>
      <Col>
        <Form
          onChange={(e) => handleChange(e, formValues, setFormValues)}
          onSubmit={(e) =>
            handleSubmit(
              e,
              formValues,
              setSubmitted,
              submitForm,
              props.refetch,
              props.setRefetch
            )
          }
        >
          {columns.map((fields, i) => {
            return (
              <Row>
                {fields.map((field) => {
                  return getField(field.field);
                })}
              </Row>
            );
          })}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
