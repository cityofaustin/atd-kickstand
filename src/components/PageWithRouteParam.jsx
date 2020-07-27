import React from "react";
import View from "./View";

import { gql, useQuery } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from "react-bootstrap/Spinner";

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  console.log(error.graphQLErrors);
  return error.graphQLErrors.map((message) => message.message);
}

function PageWithRouteParam(props) {
  // given a param provided in the page config (props.data), and a route-matching route
  // (i.e. it uses the /:param react-router syntax)provided in props.data.route, we
  // extract the matching paramter. the match param gets passed down to views that
  // depend on it.
  // see: https://reactrouter.com/web/api/Hooks/useroutematch
  const param = props.data.use_param;
  let match = useRouteMatch(`${props.data.route}:${param}`).params[param];

  // if the param were "slug" and path was "/pages/home", the match object would look
  // something like this this:
  // {
  //   "path": "/pages/:slug",
  //   "url": "/pages/home",
  //   "isExact": true,
  //   "params": {
  //     "slug": "home"
  //   }
  // }

  const { loading, error, data } = useQuery(
    gql`
      ${props.data.query.gql}
    `
  );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  if (error) return <p>Errors: {getErrorMessage(error)}</p>;

  const page_data = data.meta_pages[0]; // todo how to de-hardcode `meta_pages` accessor?

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>{props.data.label}</h3>
        </Col>
      </Row>
      {page_data.views.map((view) => {
        return <View key={view.id} data={view} match={match} param={param} />;
      })}
    </React.Fragment>
  );
}

export default PageWithRouteParam;
