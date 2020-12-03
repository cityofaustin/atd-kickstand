import React from "react";
import styles from "./styles.module.css";
import GQLAbstract from "./graphql/GQLAbstract";

import { Hi } from "./components/Hi";
export { Hi, GQLAbstract };

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};
