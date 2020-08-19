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
  const pageConf = CONFIG.pages.signal_details;
  let match = useRouteMatch({ path: pageConf.route.path, exact: true });

  if (match === null) {
    return null;
  }

  const useVariables = { [pageConf.matchParam]: match.params.id };

  return (
    <Page {...pageConf}>
      <Query
        query={CONFIG.queries.signal_details}
        useVariables={useVariables}
      >
        <Form root_key={"signals"} {...CONFIG.forms.edit_signal} />
      </Query>
    </Page>
  );
}
