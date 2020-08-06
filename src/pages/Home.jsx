import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import CONFIG from "../config/config";

export default function Home() {
  const config = CONFIG.pages.home;
  return (
    <Route {...config.route}>
      <Header/>
      <Page {...config}></Page>
    </Route>
  );
}
