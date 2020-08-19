import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import CONFIG from "../config/config";

export default function Signals() {
  const pageConf = CONFIG.pages.signals;
  return (
    <Route {...pageConf.route}>
      <Page {...pageConf}>

      </Page>
    </Route>
  );
}
