import React from "react";
import { useMutation } from "urql";
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

function handleSubmit(
  e,
  currentValues,
  fields,
  submitForm,
  idParam,
  setEditing,
  reexecuteQuery
) {
  e.preventDefault();
  let idVal = currentValues[idParam];
  // reduce current values to only those fields which have been defined in the form
  const fieldKeys = fields.map((field) => field.name);
  const submitValues = filterByKeys(currentValues, fieldKeys);
  submitForm({ object: submitValues, [idParam]: idVal }).then((result) => {
    setEditing(false);
    reexecuteQuery();
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
      key={field.name}
      field={field}
      editing={editing}
      value={currentValue}
      setChangeEvent={setChangeEvent}
    />
  );
}

export default function Form(props) {
  const [submitFormResult, submitForm] = useMutation(props.mutation.gql);
  const [editing, setEditing] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(null);

  let fields = [...props.fields];

  let initialValues = {};

  fields.map((field) => {
    initialValues[field.name] = undefined;
    return null;
  });

  // this state will be updated on any input change
  const [currentValues, setCurrentValues] = React.useState(initialValues);

  const formData = props.data[props.root_key][0];

  React.useEffect(() => {
    setCurrentValues(cloneDeep(formData) || initialValues);
  }, [formData]);

  React.useEffect(() => {
    setCurrentValues(cloneDeep(formData) || initialValues);
  }, [editing]);

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
            setEditing,
            props.reexecuteQuery
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
            <Button key="submit" variant="primary" type="submit">
              <FaCheckCircle /> Save
            </Button>
            <Button
              key="cancel"
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
        {!editing && (
          <Button
            key="edit"
            variant="secondary"
            onClick={(e) => {
              setEditing(true);
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
