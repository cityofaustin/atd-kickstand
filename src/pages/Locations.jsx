import React from "react";
import Page from "../components/Page";
import { Route } from "react-router-dom";
import Menu from "../components/Menu";
import Form from "../components/InsertForm";
import Table from "../components/Table";
import Query from "../components/Query";
import Modal from "../components/Modal";
import CONFIG from "../config/config";
import FIELDS from "../config/fields";

debugger;
export default function Locations() {
  const pageConf = CONFIG.pages.locations;
  const locations_menu_id="locations_menu"
  return (
    <Route {...pageConf.route}>
      <Page {...pageConf}>
        <Menu
          id={locations_menu_id}
          key={locations_menu_id}
          buttons={CONFIG.menus.locations.buttons}
        />
        <Query query={CONFIG.queries.locations}>
          <Modal
            hostMenuId={locations_menu_id}
            buttonId="modal_button_1"
            title="Cool!"
          >
            <Form {...CONFIG.forms.create_location} />
          </Modal>
          <Table root_key="locations" {...CONFIG.tables.locations} />
        </Query>
      </Page>
    </Route>
  );
}
