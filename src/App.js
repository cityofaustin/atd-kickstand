import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
      <Router>
        <Switch>
          <ApolloProvider client={client}>
            <Home />
            <Locations />
            <LocationDetails />
          </ApolloProvider>
        </Switch>
      </Router>
  );
}

export default App;
