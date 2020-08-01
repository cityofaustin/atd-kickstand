import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";

const query = `query MyQuery($search_term: String!) {
  meta_queries(where: {description: {_ilike: $search_term}}) {
    id
    description
    gql
    variables
  }
}
`;

const root = "meta_queries";
const displayKey = "description";

export default function AsynchronousAutocomplete(props) {
  const [selected, setSelected] = React.useState(null);

  let options = [];
  // as currently implemented, search term is not used. we just get all the rows
  // and use them as options. you could set the search term as as a state property
  // and use the `onInputChange` prop in Typeahead to re-query the API`
  const variables = { search_term: "%a%" };
  const { loading, error, data } = useQuery(
    gql`
      ${query}
    `,
    { variables: variables }
  );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (error) return <h1>Error</h1>;

  return (
    <Typeahead
      id={"john"}
      key="john"
      options={data[root]}
      labelKey="description"
      onChange={setSelected}
    />
  );
}
