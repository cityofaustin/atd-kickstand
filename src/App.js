import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Nav from "./components/Nav";
import Page from "./components/Page";
import Header from "./components/Header";

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  console.log(error.graphQLErrors);
  return error.graphQLErrors.map((message) => message.message);
}

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

const APP_QUERY = gql`
  query Pages {
    meta_pages {
      id
      label
      slug
      route
      description
      use_param
      show_in_menu
      weight
      query {
        id
        gql
        variables
      }
    }
  }
`;

function getPageComponent(page) {
  // TODO: we don't need to fork. every page should param query-driven for render
  // the app-level query should just fetch the pages and their queries
  return <Page key={page.id} data={page} />;
}

function sortPages(pages) {
  // sort pages in descending order by weight. ie higher weight = higher on nav
  return pages.sort(function (a, b) {
    return b.weight - a.weight;
  });
}

function GetPages(props) {
  const { loading, error, data } = useQuery(APP_QUERY);
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  if (error) return <p>Errors: {getErrorMessage(error)}</p>;

  // we clone the apollo response becausse it's immutable. TODO: is this a config setting?
  let pages = [...data.meta_pages];
  pages = sortPages(pages);

  return pages.map((page) => {
    return (
      <Route exact strict key={page.id} path={`${page.route}${page.slug}`}>
        <Header />
        <Row>
          <Col xs={4} sm={2} className="bg-light vh-100">
            <Nav pages={pages.filter((page) => page.show_in_menu)} />
          </Col>
          <Col>
            <Container>{getPageComponent(page)}</Container>
          </Col>
        </Row>
      </Route>
    );
  });
}

function App() {
  return (
    <Router>
      <Switch>
        <ApolloProvider client={client}>
          <Container fluid>
            <GetPages />
          </Container>
        </ApolloProvider>
      </Switch>
    </Router>
  );
}

export default App;
