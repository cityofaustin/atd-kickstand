import React from "react";

export const Hello = ({ data }) => (
  <h1
    style={{
      backgroundColor: data.state === "DARK" ? "black" : "white",
      color: data.state === "DARK" ? "gray" : "black",
    }}
  >
    Hello
  </h1>
);

Hello.propTypes = {};
