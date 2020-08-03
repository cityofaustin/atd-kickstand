import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";

const query = `query QueryQueries($search_term: String!) {
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
  // todo: special handling of multi-choice
  // todo: how to requery api with (refetch?)
  // not we're not currently modifying the initial "%%" search term. ie., all
  // values are returned by the query, that's it. tried to implement
  // a dynamic query by upodating searchTerm with the onInputChange prop, but the
  // behavior was pretty wonky. consider the AsyncTypeahead componet which is
  // included: https://github.com/ericgio/react-bootstrap-typeahead/blob/master/docs/API.md#asynctypeahead
  const [searchTerm, setSearchTerm] = React.useState("%%");

  const variables = { search_term: searchTerm };

  const { loading, error, data, refetch } = useQuery(
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
      id={props.field.name}
      key={props.field.name}
      options={data[root]}
      labelKey="description"
      onChange={(arrayOfObjs) => {
        const value = arrayOfObjs[0] ? arrayOfObjs[0].id : "";
        props.onChange(
          { target: { id: props.field.name, value: value } },
          props.formValues,
          props.setFormValues
        );
      }}
    />
  );
}
