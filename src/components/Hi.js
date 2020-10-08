import React from "react";

export const Hi = ({ data }) => (
  <h1
    style={{
      backgroundColor: data.state === "DARK" ? "black" : "white",
      color: data.state === "DARK" ? "gray" : "black",
    }}
  >
    Hi
  </h1>
);

Hi.propTypes = {};
