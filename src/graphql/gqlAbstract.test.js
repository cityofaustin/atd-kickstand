import GQLAbstract from "./GQLAbstract";
import { test } from "@jest/globals";

const nestedKeys = [
  "collision { collsn_desc }",
  "units { unit_description { veh_unit_desc_desc } }",
  "geocode_method { name }",
];

const nonNestedKeys = [
  "address_confirmed_secondary",
  "sus_serious_injry_cnt",
  "atd_fatality_count",
];

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
    "collision { collsn_desc }": {
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

const finalQueryGraphQL = `{
      atd_txdot_crashes (
          limit: 25,
offset: 0,
where: {location_id: {_eq: "1"}},
order_by: {est_comp_cost: desc}
      ) {
          crash_id
case_id
crash_date
address_confirmed_primary
address_confirmed_secondary
sus_serious_injry_cnt
atd_fatality_count
est_comp_cost
collision { collsn_desc }
units { unit_description { veh_unit_desc_desc } }
geocode_method { name }
      },
      atd_txdot_crashes_aggregate (
          where: {location_id: {_eq: "1"}},
order_by: {est_comp_cost: desc}
      ) {
        aggregate {
          count
        }
      }
    }`;

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

/**
 * Tests if the columns set up in the configuration are present in the object
 */
test("The column fields should load", () => {
  // Crash ID
  const columns = gqlAbstractGlobalInstance.columns;
  expect(columns.includes("crash_id")).toEqual(true);
  expect(columns.includes("case_id")).toEqual(true);
  expect(columns.includes("crash_date")).toEqual(true);
  expect(columns.includes("address_confirmed_primary")).toEqual(true);
  expect(columns.includes("address_confirmed_secondary")).toEqual(true);
  expect(columns.includes("sus_serious_injry_cnt")).toEqual(true);
  expect(columns.includes("atd_fatality_count")).toEqual(true);
  expect(columns.includes("est_comp_cost")).toEqual(true);
  expect(columns.includes("collision { collsn_desc }")).toEqual(true);
  expect(
    columns.includes("units { unit_description { veh_unit_desc_desc } }")
  ).toEqual(true);
  expect(columns.includes("geocode_method { name }")).toEqual(true);
});

/**
 * Tests if the columns set up in the configuration are present in the object
 */
test("The sort/order settings must load", () => {
  // First gather the values, then test the expected values...
  const orderBy = gqlAbstractGlobalInstance.getEntries("order_by")[0];
  const where = gqlAbstractGlobalInstance.getEntries("where")[0];
  expect(orderBy[0]).toEqual("est_comp_cost");
  expect(orderBy[1]).toEqual("desc");
  expect(where[0]).toEqual("location_id");
  expect(where[1]).toEqual('_eq: "1"');
});

/**
 * Tests if the query generates as expected
 */
test("The class generates correct query", () => {
  // Generate the query in the class, and compare against expected value
  const instanceQuery = gqlAbstractGlobalInstance.query;
  expect(instanceQuery).toEqual(finalQueryGraphQL);
});

/**
 * Tests isNestedKey
 */
test("isNestedKey works in all cases", () => {
  // Test each group
  nestedKeys.forEach((key) => {
    expect(gqlAbstractGlobalInstance.isNestedKey(key)).toEqual(true);
  });
  nonNestedKeys.forEach((key) => {
    expect(gqlAbstractGlobalInstance.isNestedKey(key)).toEqual(false);
  });

  // Edge Cases:
  // Incomplete nested keys
  expect(gqlAbstractGlobalInstance.isNestedKey("collision { ")).toEqual(true);
  // Empty keys
  expect(gqlAbstractGlobalInstance.isNestedKey("")).toEqual(true);
  // Undefined keys
  expect(() => {
    gqlAbstractGlobalInstance.isNestedKey(undefined);
  }).toThrow(TypeError);
  // Space only keys
  expect(gqlAbstractGlobalInstance.isNestedKey("       ")).toEqual(true);
  // Numeric only keys
  expect(gqlAbstractGlobalInstance.isNestedKey("123456798")).toEqual(false);
});
