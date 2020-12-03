import GQLAbstract from "./GQLAbstract";
import { test } from "@jest/globals";

const testGqlConfiguration = {
  table: "atd_txdot_crashes",
  single_item: "crashes",
  showDateRange: true,
  columns: {
    crash_id: {
      primary_key: true,
      searchable: true,
      sortable: true,
      label_search: "Search by Crash ID",
      label_table: "Crash ID",
      type: "Int",
    },
    case_id: {
      searchable: true,
      sortable: true,
      label_search: "Search by Case Number",
      label_table: "Case Number",
      type: "String",
    },
    crash_date: {
      searchable: false,
      sortable: true,
      label_table: "Crash Date",
      type: "Date",
    },
    address_confirmed_primary: {
      searchable: true,
      sortable: true,
      label_search: "Search by Primary Address",
      label_table: "Primary Address",
      type: "String",
    },
    address_confirmed_secondary: {
      searchable: true,
      sortable: true,
      label_search: "Search by Secondary Address",
      label_table: "Secondary Address",
      type: "String",
    },
    sus_serious_injry_cnt: {
      searchable: false,
      sortable: true,
      label_table: "Suspected Serious Injury Count",
      type: "Int",
    },
    atd_fatality_count: {
      searchable: false,
      sortable: true,
      label_table: "ATD Death Count",
      type: "Date",
    },
    est_comp_cost: {
      searchable: false,
      sortable: true,
      label_table: "Est Comprehensive Cost",
      type: "Currency",
    },
    "collision { collsn_desc } ": {
      searchable: false,
      sortable: true,
      label_table: "Collision Description",
      type: "String",
    },
    "units { unit_description { veh_unit_desc_desc } }": {
      searchable: false,
      sortable: false,
      label_table: "Unit Description",
      type: "String",
      hidden: true,
    },
    "geocode_method { name }": {
      searchable: false,
      sortable: true,
      label_table: "Geocode Provider",
      type: "String",
    },
  },
  order_by: {
    est_comp_cost: "desc",
  },
  where: {
    location_id: `_eq: "1"`,
  },
  limit: 25,
  offset: 0,
};

const gqlAbstractGlobalInstance = new GQLAbstract(testGqlConfiguration);

/**
 * Checks if the configuration will load...
 */
test("The constructor should work", () => {
  // Check it is an object
  expect(typeof gqlAbstractGlobalInstance).toBe("object");
  // Check on its properties
  expect(gqlAbstractGlobalInstance.abstractStructure).toBe(`{
      gqlAbstractTableName (
          gqlAbstractFilters
      ) {
          gqlAbstractColumns
      },
      gqlAbstractTableAggregateName (
          gqlAbstractAggregateFilters
      ) {
        aggregate {
          count
        }
      }
    }`);
  // Check on the limit
  expect(gqlAbstractGlobalInstance.limit).toEqual(25);
  // Check on the offset
  expect(gqlAbstractGlobalInstance.offset).toEqual(0);
  // Check on the limit
  expect(gqlAbstractGlobalInstance.table).toEqual("atd_txdot_crashes");
  // Check on the single_item property
  expect(gqlAbstractGlobalInstance.singleItem).toEqual("crashes");
  // Check on the showDateRange to be true
  expect(gqlAbstractGlobalInstance.showDateRange).toEqual(true);
});
