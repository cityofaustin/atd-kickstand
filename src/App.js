import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createClient, Provider } from 'urql';
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";

// const client = new ApolloClient({
//   uri: "http://localhost:8080/v1/graphql",
//   cache: new InMemoryCache(),
// });

const client = createClient({ url: 'http://localhost:8080/v1/graphql' });

function App() {
  return (
      <Router>
        <Switch>
        <Provider value={client}>
            <Home />
            <Locations />
            <LocationDetails />
          </Provider>
        </Switch>
      </Router>
  );
}

export default App;
