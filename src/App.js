import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createClient, Provider } from "urql";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import Signals from "./pages/Signals";
import SignalDetails from "./pages/SignalDetails";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";

const client = createClient({ url: "http://localhost:8080/v1/graphql" });

function App() {
  return (
    <Router>
      <Switch>
        <Provider value={client}>
          <Container fluid>
            <Header />
            <Row>
              <Nav />
              <Home />
              <Locations />
              <LocationDetails />
              <Signals />
              <SignalDetails/>
            </Row>
          </Container>
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
