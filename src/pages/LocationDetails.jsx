import React from "react";
import Page from "../components/Page";
import { useRouteMatch } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Form from "../components/UpdateForm";

const CONFIG = {
  page: {
    title: "Location Details",
    route: { path: "/locations/:id" },
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
  forms: {
    "1": {
      action: "edit",
      num_columns: 1,
      fields: [
        {
          id: 1,
          name: "id",
          label: "ID",
          data_type: "text",
          read_only: true,
          input_type: "text",
        },
        {
          id: 2,
          name: "location_name",
          label: "Location Name",
          data_type: "text",
          read_only: false,
          input_type: "text",
        },
        {
          id: 3,
          name: "landmark",
          label: "Landmark",
          data_type: "text",
          read_only: false,
          input_type: "text",
        },
      ],
      query: `query Locations { locations { id location_name landmark latitude longitude council_district } }`,
      mutation: {
        gql: `mutation update_locations($id: Int, $object: locations_set_input) {
        update_locations(where: {id: {_eq: $id}}, _set: $object) {
          affected_rows
          returning {
            id
          }
        }
      }
      `,
        idParam: "id",
      },
    },
  },
};

export default function LocationDetails() {
  let match = useRouteMatch({ path: "/locations/:id", exact: true });

  if (match === null) {
    return null;
  }
  // todo: drive routematch from config and use this val
  const locationId = match.params.id;

  return (
    <>
      <Header />
      <Page {...CONFIG.page}>
        <Menu key={"1"} buttons={CONFIG.menus["1"].buttons} />
        <Form {...CONFIG.forms["1"]} />
      </Page>
    </>
  );
}
