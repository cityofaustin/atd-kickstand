import React from "react";
import PropTypes from "prop-types";

export default function Hi({ data }) {
  console.log(data);
  return (
    <h1
      style={{
        backgroundColor: data.state === "DARK" ? "black" : "white",
        color: data.state === "DARK" ? "white" : "black",
      }}
    >
      Hi
    </h1>
  );
}

Hi.propTypes = {};
