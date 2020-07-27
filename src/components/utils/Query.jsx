import React from "react";
import { useQuery } from "@apollo/client";

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  console.log(error.graphQLErrors);
  return error.graphQLErrors.map((message) => message.message);
}

function QueryWrapper(props) {
  let query = props.query;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>{getErrorMessage(error)}</p>;
  }

  props.setData(data);
}

export default QueryWrapper;
