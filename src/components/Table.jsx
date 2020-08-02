import React from "react";
import { gql, useQuery } from "@apollo/client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap/Table";
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

  for (let i = 0; i < link.use_params.length; i++) {
    const param = link.use_params[i];
    const val = row[param];
    link.url = link.url.replace(`$${param}`, val);
  }

  row[link.id] = <a href={link.url}>{link.label}</a>;
  return row;
}

function handleValue(row, field) {
  // logic to stringify row value for table cell
  const val = row[field.field.name];
  return field.field.input_type === "json" ? JSON.stringify(val) : val;
}

function sortByWeight(fields) {
  // sort table columns in descending order by weight. ie higher weight = higher on page
  return fields.sort(function (a, b) {
    return b.weight - a.weight;
  });
}

const Table = React.memo((props) => {
  // we search for the param variable name in the table's graphql query and replace it
  // with the value "match" which has been passed down from route-matching in the
  // page component
  const param = props.param;
  const match = props.match;

  const variables = param && match ? { [param]: match } : {};
  const query = gql`
    ${props.data.query.gql}
  `;

  const { loading, error, data, refetch } = useQuery(query, {
    variables: variables,
  });

  React.useEffect(() => {
    refetch();
  }, [props.refetch]);

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

  // we replicate the fields array because apollo returns an immutable obj
  let fields = [...props.data.fields];
  fields = sortByWeight(fields);

  // todo: we only support a single link object (not multiple "links")
  const links = props.data.links;

  if (links) {
    const linkCol = {
      field: { id: links.id, label: links.label, name: links.id },
    };
    fields.push(linkCol);
    rows = rows.map((row) => linkHandler(row, links));
  }

  return (
    <Row>
      <Col className="p-0">
        <BootstrapTable striped size="sm">
          <thead className="thead-dark">{generateHeaderRow(fields)}</thead>
          <tbody>
            {rows.map((row, i) => {
              return (
                <tr key={i}>
                  {fields.map((field, i) => {
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
});

export default Table;
