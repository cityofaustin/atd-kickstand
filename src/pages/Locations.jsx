import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Table from "../components/Table";
import Query from "../components/Query";
import CONFIG from "../config/config";

export default function Locations() {
  const pageConf = CONFIG.pages.locations;
  return (
    <Route {...pageConf.route}>
      <Header />
      <Page {...pageConf}>
        <Query query={CONFIG.queries.locations}>
          <Menu key={"1"} buttons={CONFIG.menus.locations.buttons} />
          <Table {...CONFIG.tables.locations} />
        </Query>
      </Page>
    </Route>
  );
}
