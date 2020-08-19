const FIELDS = [
  {
    name: "location_name",
    table: "locations",
    label: "Location Name",
    data_type: "text",
    input_type: "text",
  },
  {
    name: "landmark",
    label: "Landmark",
    table: "locations",
    data_type: "text",
    input_type: "text",
  },
  {
    name: "latitude",
    table: "locations",
    label: "Latitude",
    input_type: "text",
    data_type: "int",
  },
  {
    name: "longitude",
    table: "locations",
    label: "Longitude",
    input_type: "text",
    data_type: "int",
  },
  {
    name: "id",
    label: "ID",
    table: "locations",
    data_type: "int",
    input_type: "text",
    read_only: true
  },
  {
    name: "location_name",
    label: "Location Name",
    data_type: "text",
    input_type: "text",
  },
  {
    name: "landmark",
    label: "Landmark",
    data_type: "text",
    input_type: "text",
  },
  {
    name: "latitude",
    label: "Latitude",
    input_type: "text",
    data_type: "int",
  },
  {
    name: "longitude",
    label: "Longitude",
    input_type: "text",
    data_type: "int",
  },
  {
    name: "updated_at",
    label: "Updated",
    input_type: "text",
    data_type: "date",
    read_only: true
  },
  {
    name: "id",
    label: "ID",
    table: "signals",
    data_type: "text",
    input_type: "text",
  },
  {
    name: "type",
    label: "Type",
    table: "signals",
    data_type: "text",
    input_type: "select",
    options: ["Traffic", "Pedestrian"]
  },
]

export default FIELDS;
