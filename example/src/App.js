import React from "react";

import { Hi, Hello, ExampleComponent, GridTable } from "atd-kickstand";
import "atd-kickstand/dist/index.css";

const App = () => {
  return (
    <>
      <ExampleComponent text={"Hello!"} />
      <Hi data={{ state: "DARK" }} />
      <Hello data={{ state: "DARK" }} />
      <GridTable data={{ state: "DARK"}} />
    </>
  );
};

export default App;
