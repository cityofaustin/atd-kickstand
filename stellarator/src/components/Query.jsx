import React from "react";
import { useQuery } from "urql";
import Spinner from "react-bootstrap/Spinner";

export default function Query(props) {
  const variables = props.useVariables ? props.useVariables : {};
  const query = props.query.gql;
  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
    requestPolicy: "network-only",
  });

  if (result === undefined) {
    // not sure why this case happens, but it does
    return null;
  }

  const { data, fetching, error } = result;

  if (fetching)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (error) return <p>Oh no... {error.message}</p>;

  return React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      data: data,
      reexecuteQuery: reexecuteQuery,
    });
  });
}
