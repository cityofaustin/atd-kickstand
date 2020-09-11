import React from "react";
import styles from "./styles.module.css";

import { Hi } from "./components/Hi";
export { Hi };

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};
