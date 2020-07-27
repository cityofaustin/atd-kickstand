import React from "react";
import { gql, useQuery } from "@apollo/client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

// here's a query to create the views table:
// query Page {
//   meta_pages(where: {slug: {_eq: "builder"}}) {
//     id
//     label
//     views {
//       id
//       label
//       type
//     }
//   }
// }

function generateHeaderRow(fields) {
  return (
    <tr>
      {fields.map((field) => {
        return <th key={field.field.id}>{field.field.label}</th>;
      })}
    </tr>
  );
}

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  console.log(error.graphQLErrors);
  return error.graphQLErrors.map((message) => message.message);
}

function linkHandler(row, link) {
  // create a link by updating the link's URL with properties from the row data
  // we clone these because the apollo returns restricted objects
  row = { ...row };
  link = { ...link };

  const val = row[link.use_param];
  const url = link.url.replace(`$${link.use_param}`, val);
  row[link.id] = <a href={url}>{link.label}</a>;
  return row;
}

export default function DataTable(props) {
  // we search for the param variable name in the table's graphql query and replace it
  // with the value "match" which has been passed down from route-matching in the
  // page component
  const param = props.param;
  const match = props.match;
  console.log("match", match, "param", param);
  const query =
    param && match
      ? props.data.query.gql.replace(`$${param}`, match)
      : props.data.query.gql;
  console.log("replace", query)
  const { loading, error, data } = useQuery(
    gql`
      ${query}
    `
  );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (error) return <p>Errors: {getErrorMessage(error)}</p>;
  // the apollo response data is immutable, so we map to a new array. TODO: is this a config setting?
  const accessor = Object.keys(data)[0];
  let rows = data[accessor];

  const fields = props.data.fields.map((field) => field);

  // todo: we only support a single link object (not multiple "links")
  const links = props.data.links;
  
  if (links) {
    const linkCol = {
      field: { id: links.id, label: links.label, name: links.id },
    };
    fields.push(linkCol);
    rows = rows.map((row) => linkHandler(row, links));
  }
  console.log("DATA", data);
  return (
    <Row>
      <Col className="p-0">
        <Table striped size="sm">
          <thead className="thead-dark">{generateHeaderRow(fields)}</thead>
          <tbody>
            {rows.map((row, i) => {
              return (
                <tr key={i}>
                  {fields.map((field, i) => (
                    <td key={i}>{row[field.field.name]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
