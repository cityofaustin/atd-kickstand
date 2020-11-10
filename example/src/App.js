import React from "react";

import { Hi, Hello, ExampleComponent } from "atd-kickstand";
import "atd-kickstand/dist/index.css";

const App = () => {
  return (
    <>
      <ExampleComponent text={"Hello!"} />
      <Hi data={{ state: "DARK" }} />
      <Hello data={{ state: "DARK" }} />
    </>
  );
};

export default App;
