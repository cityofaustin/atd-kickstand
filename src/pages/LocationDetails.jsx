import React from "react";
import Page from "../components/Page";
import { useRouteMatch } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Form from "../components/UpdateForm";
import Table from "../components/Table";
import Map from "../components/Map";

const CONFIG = {
  page: {
    title: "Location Details",
    icon: <FaMapMarkerAlt />,
    route: { path: "/locations/:id" },
    matchParam: "id",
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
        {
          id: 4,
          name: "latitude",
          label: "Latitude",
          input_type: "text",
          data_type: "int",
          read_only: false,
        },
        {
          id: 5,
          name: "longitude",
          label: "Longitude",
          input_type: "text",
          data_type: "int",
          read_only: false,
        },
      ],
      query: {
        gql: `query LocationDetails($id: Int!) {
          locations(where: {id: {_eq: $id}}) {
            id
            location_name
            landmark
            latitude
            longitude
            council_district
          }
        }`,
        variables: ["id"],
      },
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

export default function LocationDetails() {
  let match = useRouteMatch({ path: CONFIG.page.route.path, exact: true });

  if (match === null) {
    return null;
  }

  const useVariables = { [CONFIG.page.matchParam]: match.params.id };

  return (
    <>
      <Header />
      <Page {...CONFIG.page}>
        <Map latitude={30.255155} longitude={-97.721499}/>
        <Menu key={"1"} buttons={CONFIG.menus["1"].buttons} />
        <Form {...CONFIG.forms["1"]} useVariables={useVariables} />
        <Table {...CONFIG.tables["1"]} />
      </Page>
    </>
  );
}
