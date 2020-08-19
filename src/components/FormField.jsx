import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Autocomplete from "./Autocomplete";

const INPUT_COMPONENTS = {
  email: { component: Form.Control },
  text: { component: Form.Control },
  check: { component: Form.Check },
  select: { component: Form.Control, props: { as: "select" } },
  text_area: {
    component: Form.Control,
    props: { as: "textarea", rows: "3" },
  },
  autocomplete: { component: Autocomplete },
};

function getComponent(props_input_type, read_only) {
  // todo: aint pretty, but we we can't set autocomplete as readonly, we have to use a text input instead
  // see: https://github.com/ericgio/react-bootstrap-typeahead/issues/324
  const input_type =
    props_input_type === "autocomplete" && read_only
      ? "text"
      : props_input_type;
  const component = INPUT_COMPONENTS[input_type];
  return [component.component, component.props || {}];
}

function getProps(
  name,
  read_only,
  placeholder,
  type,
  value,
  setChangeEvent,
  defaultProps
) {
  let props = {
    plaintext: read_only,
    readOnly: read_only,
    size: "sm",
    key: name,
    id: name,
    placeholder: placeholder,
    value: value || "",
    onChange: (e) => {
      setChangeEvent({ id: e.target.id, value: e.target.value });
    },
  };
  return Object.assign(props, defaultProps);
}

export default function FormField(props) {
  const [changeEvent, setChangeEvent] = React.useState(null);

  const [Component, defaultProps] = getComponent(
    props.field.input_type,
    props.field.read_only
  );
  const read_only = props.editing && !props.field.read_only ? false : true;

  const componentProps = getProps(
    props.field.name,
    read_only,
    props.field.placeholder,
    props.field.type,
    props.value,
    setChangeEvent,
    defaultProps
  );

  React.useEffect(() => {
    props.setChangeEvent(changeEvent);
  }, [changeEvent, props]);

  return (
    <React.Fragment key={props.field.name}>
      <Form.Label column sm={2} size="sm">
        <b>{props.field.label}</b>
      </Form.Label>
      <Col>
        <Component {...componentProps}>
          {props.field.options &&
            props.field.options.map(option => {
              return <option key={option}>{option}</option>;
            })}
        </Component>
        {props.editing && (
          <Form.Text className="text-muted">
            {props.field.helper_text}
          </Form.Text>
        )}
      </Col>
    </React.Fragment>
  );
}
