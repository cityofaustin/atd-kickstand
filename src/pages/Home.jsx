import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Header from "../components/Header";

const CONFIG = {
  page: {
    title: "Home",
    route: { exact: true, path: "/" },
  },
};

export default function Home() {
  const config = CONFIG.page;
  return (
    <Route {...config.route}>
      <Header/>
      <Page {...config}></Page>
    </Route>
  );
}
