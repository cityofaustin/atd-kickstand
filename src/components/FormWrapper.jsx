import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BsForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Autocomplete from "./Autocomplete";

// not using; but in case this comes in handy elsewhere
// const GQL_VAR_MATCH_PATTERN = /(\$[a - z || 0 - 9] +) (?=:)/g;

const FIELD_COMPONENT_MAP = {
  email: { component: BsForm.Control },
  text: { component: BsForm.Control },
  check: { component: BsForm.Check },
  select: { component: BsForm.Control, props: { as: "select" } },
  text_area: {
    component: BsForm.Control,
    props: { as: "textarea", rows: "3" },
  },
  autocomplete: { component: Autocomplete },
};

function getInputComponent(field, editing, formValues, setFormValues) {
  const is_read_only = editing && !field.read_only ? false : true;
  // todo: aint pretty, but we we can't set autocomplete as readonly, we have to use a text input instead
  // see: https://github.com/ericgio/react-bootstrap-typeahead/issues/324
  const input_type =
    field.input_type === "autocomplete" && is_read_only
      ? "text"
      : field.input_type;
  const componentDef = FIELD_COMPONENT_MAP[input_type];
  const FormInputComponent = componentDef.component;

  if (input_type === "autocomplete") {
    return (
      <Autocomplete
        field={field}
        onChange={(e) => handleChange(e, formValues, setFormValues)}
      />
    );
  } else if (field.options) {
    return (
      <FormInputComponent
        plaintext={is_read_only}
        readOnly={is_read_only}
        size="sm"
        key={field.name}
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        onChange={(e) => handleChange(e, formValues, setFormValues)}
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
        plaintext={is_read_only}
        readOnly={is_read_only}
        size="sm"
        key={field.name}
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        onChange={(e) => handleChange(e, formValues, setFormValues)}
        defaultValue={field.__value__ ? field.__value__ : ""}
        {...componentDef.props}
      />
    );
  }
}

function getField(field, editing, formValues, setFormValues) {
  return (
    <React.Fragment key={field.name}>
      <BsForm.Label column sm={1} size="sm">
        <b>{field.label}</b>
      </BsForm.Label>
      <Col>
        {getInputComponent(field, editing, formValues, setFormValues)}
        {editing && (
          <BsForm.Text className="text-muted">{field.helper_text}</BsForm.Text>
        )}
      </Col>
    </React.Fragment>
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
  console.log("FORMVALUES", formValues);
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

function SubmitConfirmation(props) {
  return (
    <Alert variant="success">
      <Col>Form submitted!</Col>
      <Col>
        <Button
          variant="secondary"
          type="reload-form"
          onClick={(e) => props.setSubmitted(false)}
        >
          Reload Form
        </Button>
      </Col>
    </Alert>
  );
}

function GetFormData(props) {
  // TODO: handle errors/loading from this form data query
  const param = props.param;
  const match = props.match;

  const variables = param && match ? { [param]: match } : {};
  const query = gql`
    ${props.data.query.gql}
  `;

  const { loading, error, data, refetch } = useQuery(query, {
    variables: variables,
  });

  if (typeof data === "object") {
    const accessor = Object.keys(data)[0];
    return data[accessor][0];
  }

  return undefined;
}

function setInputValues(fields, formValues) {
  if (formValues === undefined) {
    return fields;
  }

  return fields.map((field) => {
    field.field.__value__ = formValues[field.field.name];
    return field;
  });
}

function copyFieldProps(fields, props = ["read_only", "weight"]) {
  // we move props from the `field` object to the `field.field` object.
  // we do this because some form field properties are set on the intermediary
  // reference table "many_forms_to_many_fields".
  // obvi this all happens on under the assumption that there will be no namespace
  // conflicts, ie field.field does not already contain any of the specified props.
  // todo: alternatives? e.g. use a view that has the data where you want
  return fields.map((field) => {
    let mutableField = { ...field };
    mutableField.field = { ...mutableField.field };

    props.map((prop) => {
      const val = mutableField[prop];
      mutableField.field[prop] = val;
      return null;
    });

    return mutableField;
  });
}

function sortByWeight(fields) {
  // sort table columns in descending order by weight. ie higher weight = higher on page
  return fields.sort(function (a, b) {
    return b.weight - a.weight;
  });
}

export default function FormWrapper(props) {
  // "insert" forms are always edit mode. "edit" forms start ready only and
  // can be triggered for editing
  let defaultEditingState = props.data.action === "insert" ? true : false;
  const [editing, setEditing] = React.useState(defaultEditingState);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitForm, loading, error, data] = useMutation(
    gql`
      ${props.data.mutation}
    `
  );

  let fields = [...props.data.fields];
  // initialize the form values state, one key per field, all undefined
  // todo: support default vals
  let initalValues = {};

  fields.map((field) => {
    initalValues[field.field.name] = undefined;
    return null;
  });

  fields = copyFieldProps(fields);

  // this state will be updated on any input change
  const [formValues, setFormValues] = React.useState(initalValues);

  let formData = props.data.action === "edit" ? GetFormData(props) : undefined;

  React.useEffect(() => {
    const currenFormValues = formData ? formData : initalValues;
    setFormValues(currenFormValues);
  }, [formData]);

  fields = setInputValues(fields, formValues);
  fields = sortByWeight(fields);

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
    return <SubmitConfirmation setSubmitted={setSubmitted} />;
  }

  return (
    <BsForm
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
          <Row key={`form-row-${i}`}>
            {fields.map((field) => {
              return getField(field.field, editing, formValues, setFormValues);
            })}
          </Row>
        );
      })}
      {editing && (
        <Button variant="primary" type="submit">
          Save
        </Button>
      )}
      {!editing && (
        <Button
          variant="secondary"
          type="submit"
          onClick={(e) => {
            setEditing(true);
          }}
        >
          Edit
        </Button>
      )}
    </BsForm>
  );
}
