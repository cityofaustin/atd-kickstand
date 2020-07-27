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
import Nav from "./components/Nav";
import Page from "./components/Page";
import Header from "./components/Header";
import PageWithRouteParam from "./components/PageWithRouteParam";

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
      route
      slug
      description
      use_param
      show_in_menu
      query {
        id
        gql
      }
      views {
        id
        label
        tables {
          id
          links
          query {
            id
            gql
          }
          fields {
            field {
              id
              helper_text
              label
              name
            }
          }
        }
        forms {
          id
          fields {
            read_only
            row
            field {
              data_type
              helper_text
              id
              input_type
              label
              name
              options
              placeholder
              subfields
              table_name
            }
          }
        }
      }
    }
  }
`;

function getPageComponent(page) {
  // TODO: we don't need to fork. every page should param query-driven for render
  // the app-level query should just fetch the pages and their queries
  if (page.query) {
    return <PageWithRouteParam key={page.id} data={page} />;
  } else {
    return <Page key={page.id} data={page} />;
  }
}

function GetPages(props) {
  const { loading, error, data } = useQuery(APP_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errors: {getErrorMessage(error)}</p>;
  return data["meta_pages"].map((page) => {
    return (
      <Route key={page.id} path={`${page.route}${page.slug}`}>
          <Header />
          <Row>
          <Col xs={4} sm={2} className="bg-dark text-white vh-100">
              <Nav
                pages={data["meta_pages"].filter((page) => page.show_in_menu)}
              />
            </Col>
            <Col>{getPageComponent(page)}</Col>
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
