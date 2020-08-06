import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

function generateHeaderRow(fields) {
  return (
    <tr>
      {fields.map((field) => {
        return <th key={field.id}>{field.label}</th>;
      })}
    </tr>
  );
}

// function linkHandler(row, link) {
//   // create a link by updating the link's URL with properties from the row data
//   // we clone these because the apollo returns restricted objects
//   row = { ...row };
//   link = { ...link };

//   for (let i = 0; i < link.use_params.length; i++) {
//     const param = link.use_params[i];
//     const val = row[param];
//     link.url = link.url.replace(`$${param}`, val);
//   }

//   row[link.id] = <a href={link.url}>{link.label}</a>;
//   return row;
// }

function handleValue(row, field) {
  // logic to stringify row value for table cell
  const val = row[field.name];
  return field.input_type === "json" ? JSON.stringify(val) : val;
}

export default function Table(props) {
  // todo: we only support a single link object (not multiple "links")
  // const links = props.data.links;

  // if (links) {
  //   const linkCol = {
  //     field: { id: links.id, label: links.label, name: links.id },
  //   };
  //   fields.push(linkCol);
  //   rows = rows.map((row) => linkHandler(row, links));
  // }

  return (
    <Row>
      <Col className="p-0">
        <BootstrapTable striped size="sm">
          <thead className="thead-dark">{generateHeaderRow(props.fields)}</thead>
          <tbody>
            {props.data.map((row, i) => {
              return (
                <tr key={i}>
                  {props.fields.map((field, i) => {
                    return <td key={i}> {handleValue(row, field)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </BootstrapTable>
      </Col>
    </Row>
  );
}
