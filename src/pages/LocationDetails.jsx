import React from "react";
import Page from "../components/Page";
import { useRouteMatch } from "react-router-dom";
import Query from "../components/Query";
import Menu from "../components/Menu";
import Form from "../components/UpdateForm";
import Map from "../components/Map";
import Table from "../components/Table";
import CONFIG from "../config/config";

export default function LocationDetails() {
  const pageConf = CONFIG.pages.location_details;
  let match = useRouteMatch({ path: pageConf.route.path, exact: true });

  if (match === null) {
    return null;
  }

  const useVariables = { [pageConf.matchParam]: match.params.id };

  return (
    <Page {...pageConf}>
      <Query
        query={CONFIG.queries.location_details}
        useVariables={useVariables}
      >
        <Map root_key={"locations"} />
        <Form root_key={"locations"} {...CONFIG.forms.edit_location} />
        <Table root_key={"signals"} {...CONFIG.tables.signals_at_location} />
      </Query>
    </Page>
  );
}
