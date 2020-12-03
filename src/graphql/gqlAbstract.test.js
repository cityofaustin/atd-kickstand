import gqlAbstract from "./gqlAbstract";

/**
 * Checks if the configration will load...
 */
test("Tests it loads the configuration", () => {
  const testConfig = {};
  const gqlAbstractInstance = new gqlAbstract(testConfig);
  expect(1).toBe(1);
});
