import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const CONFIG = {
  pages: {
    location_details: {
      title: "Location Details",
      icon: <FaMapMarkerAlt />,
      route: { path: "/locations/:id" },
      matchParam: "id",
    },
    home: {
      title: "Home",
      route: { exact: true, path: "/" },
    },
    locations: {
      title: "Locations",
      route: { exact: true, path: "/locations" },
    },
  },
  menus: {
    locations: {
      buttons: [
        {
          label: "Create Location",
          props: { variant: "secondary" },
        },
      ],
    },
    location_details: {
      buttons: [
        {
          label: "Cool Button",
          props: { variant: "secondary" },
        },
      ],
    },
  },
  forms: {
    create_location: {
      action: "insert",
      num_columns: 1,
      mutation: {
        gql: `mutation insert_single_location($object: locations_insert_input!) {
          insert_locations_one(object: $object) {
            id
          }
        }
        `,
        variables: ["object"]
      },
      fields: [
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
    },
    edit_location: {
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
        idParam: "id"
      },
    },
  },
  tables: {
    locations: {
      title: "Locations",
      links: [
        {
          name: "_location_details_",
          label: "Details",
          use_params: ["id"],
          url: "/locations/$id",
        },
      ],
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
    },
  },
  queries: {
    locations: {
      gql: `query Locations { locations { id location_name landmark latitude longitude council_district } }`,
    },
    location_details: {
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
  },
};

export default CONFIG;
