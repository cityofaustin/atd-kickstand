import React from "react";
import Page from "../components/Page";
import { useRouteMatch } from "react-router-dom";
import Header from "../components/Header";
import Query from "../components/Query";
import Menu from "../components/Menu";
import Form from "../components/UpdateForm";
import Map from "../components/Map";
import CONFIG from "../config/config";

export default function LocationDetails() {
  const pageConf = CONFIG.pages.location_details;
  let match = useRouteMatch({ path: pageConf.route.path, exact: true });

  if (match === null) {
    return null;
  }

  const useVariables = { [pageConf.matchParam]: match.params.id };

  return (
    <>
      <Header />
      <Page {...pageConf}>
        <Query query={CONFIG.queries.location_details} useVariables={useVariables}>
          <Map />
          <Menu key={"1"} buttons={CONFIG.menus.location_details.buttons} />
          <Form {...CONFIG.forms.edit_location} />
        </Query>
      </Page>
    </>
  );
}
