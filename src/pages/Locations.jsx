import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Table from "../components/Table";

const CONFIG = {
  page: {
    title: "Locations",
    route: { exact: true, strict: true, path: "/locations" },
  },
  menus: {
    "1": {
      buttons: [
        {
          label: "Cool Button",
          props: { variant: "secondary" },
        },
      ],
    },
  },
  tables: {
    "1": {
      title: "Locations",
      fields: [
        {
          id: 1,
          name: "id",
          label: "ID",
          data_type: "text",
        },
        {
          id: 2,
          name: "location_name",
          label: "Location Name",
          data_type: "text",
        },
        {
          id: 3,
          name: "landmark",
          label: "Landmark",
          data_type: "text",
        },
      ],
      query: `query Locations { locations { id location_name landmark latitude longitude council_district } }`,
    },
  },
};

export default function Locations() {
  const config = CONFIG.page;
  return (
    <Route {...config.route}>
      <Header />
      <Page {...config}>
        <Menu key={"1"} buttons={CONFIG.menus["1"].buttons} />
        <Table {...CONFIG.tables["1"]} />
      </Page>
    </Route>
  );
}
