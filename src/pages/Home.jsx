import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import CONFIG from "../config/config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function Home() {
  const config = CONFIG.pages.home;
  return (
    <Route {...config.route}>
      <Page {...config}>
        <Row>
          <Col>
            <h2>Wow, what a cool admin app!</h2>
            <p>Yes, it really is.</p>
          </Col>
        </Row>
      </Page>
    </Route>
  );
}
