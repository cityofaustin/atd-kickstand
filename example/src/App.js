import React from "react";

import { Hi, ExampleComponent } from "atd-kickstand";
import "atd-kickstand/dist/index.css";

const App = () => {
  return (
    <>
      <ExampleComponent text={"Hello!"} />
      <Hi data={{ state: "DARK" }} />
    </>
  );
};

export default App;
