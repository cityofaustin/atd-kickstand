import React from "react";
import { action } from "@storybook/addon-actions";

import { Hi } from "../components/Hi";

export default {
  component: Hi,
  title: "Hi",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const hiData = {
  id: "1",
  title: "Test Hi",
  state: "Hi_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onHi: action("onHi"),
};

export const Default = () => <Hi data={{ ...hiData }} {...actionsData} />;
export const Dark = () => (
  <Hi data={{ ...hiData, state: "DARK" }} {...actionsData} />
);
