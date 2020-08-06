import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { cloneDeep } from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FaEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import FormField from "./FormField";

function filterByKeys(object, keys) {
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
}

function handleSubmitComplete(
  setNeedsRefetch,
  setEditing,
  setShowSubmitConfirmation
) {
  setNeedsRefetch(true);
  setEditing(false);
  setShowSubmitConfirmation(true);
}

function handleSubmit(
  e,
  currentValues,
  fields,
  submitForm,
  idParam,
  setNeedsRefetch,
  setEditing,
  setShowSubmitConfirmation
) {
  e.preventDefault();
  let idVal = currentValues[idParam];
  // reduce current values to only those fields which have been defined in the form
  const fieldKeys = fields.map((field) => field.name);
  const submitValues = filterByKeys(currentValues, fieldKeys);
  submitForm({
    variables: { object: submitValues, [idParam]: idVal },
    onCompleted: handleSubmitComplete(
      setNeedsRefetch,
      setEditing,
      setShowSubmitConfirmation
    ),
  });
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
    <>
      <Alert variant="success">
        <Col>
          <Button
            type="button"
            className="close"
            aria-label="Close"
            onClick={(e) => props.setShowSubmitConfirmation(false)}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          Form submitted!
        </Col>
      </Alert>
    </>
  );
}

function GetFormData(props) {
  // TODO: handle errors/loading from this form data query
  const variables = props.useVariables ? props.useVariables : {};

  const query = gql`
    ${props.query.gql}
  `;

  const { data, refetch } = useQuery(query, {
    variables: variables,
  });

  if (typeof data === "object") {
    const accessor = Object.keys(data)[0];
    return [data[accessor][0], refetch];
  }

  return [data, refetch];
}

function handleChange(e, currentValues, setCurrentValues) {
  if (e === null) {
    // handles initial state
    return false;
  }
  let currentValuesClone = cloneDeep(currentValues);
  currentValuesClone[e.id] = e.value;
  setCurrentValues(currentValuesClone);
}

function getFormField(field, editing, currentValue, setChangeEvent) {
  return (
    <FormField
      field={field}
      editing={editing}
      value={currentValue}
      setChangeEvent={setChangeEvent}
    />
  );
}

export default function Form(props) {
  const [editing, setEditing] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(null);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = React.useState(
    false
  );
  const [submitForm, { data }] = useMutation(
    gql`
      ${props.mutation.gql}
    `
  );

  // initialize the form values state, one key per field, all undefined
  let fields = [...props.fields];

  let initialValues = {};

  fields.map((field) => {
    initialValues[field.name] = undefined;
    return null;
  });

  const [needsRefetch, setNeedsRefetch] = React.useState(false);
  // this state will be updated on any input change
  const [currentValues, setCurrentValues] = React.useState(initialValues);

  // formData is immutable once fetched from gql
  let [formData, refetch] = GetFormData(props);

  React.useEffect(() => {
    setCurrentValues(cloneDeep(formData) || initialValues);
  }, [formData]);

  React.useEffect(() => {
    setCurrentValues(cloneDeep(formData) || initialValues);
  }, [editing]);

  React.useEffect(() => {
    if (needsRefetch) {
      refetch();
      setNeedsRefetch(false);
    }
  }, [needsRefetch]);

  React.useEffect(() => {
    // handle the change and set the current values
    handleChange(changeEvent, currentValues, setCurrentValues);
  }, [changeEvent]);

  const formFields = fields.map((field) => {
    const currentValue = currentValues[field.name] || "";
    return getFormField(field, editing, currentValue, setChangeEvent);
  });

  const columns = groupFieldsIntoColumns(formFields, props.num_columns);

  return (
    <>
      <BootstrapForm
        onSubmit={(e) =>
          handleSubmit(
            e,
            currentValues,
            fields,
            submitForm,
            props.mutation.idParam,
            setNeedsRefetch,
            setEditing,
            setShowSubmitConfirmation
          )
        }
      >
        {columns.map((fields, i) => {
          return (
            <Row key={`form-row-${i}`}>
              {fields.map((Field) => {
                return Field;
              })}
            </Row>
          );
        })}
        {editing && (
          <>
            <Button variant="primary" type="submit">
              <FaCheckCircle /> Save
            </Button>
            <Button
              variant="warning"
              type="cancel"
              onClick={(e) => {
                setEditing(false);
              }}
            >
              <FaTimesCircle /> Cancel
            </Button>
          </>
        )}
        {showSubmitConfirmation && (
          <SubmitConfirmation
            setShowSubmitConfirmation={setShowSubmitConfirmation}
          />
        )}
        {!editing && (
          <Button
            variant="secondary"
            onClick={(e) => {
              setEditing(true);
              setShowSubmitConfirmation(false);
            }}
            type="edit"
          >
            <FaEdit /> Edit
          </Button>
        )}
      </BootstrapForm>
    </>
  );
}
