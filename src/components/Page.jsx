import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import FormWrapper from "./FormWrapper";
import DataTable from "./Table";
import Menu from "./Menu";
import Map from "./Map";

// todo: yeah, this...
const QUERY_BY_PAGE_ID = {
  id: 15,
  gql: `query Page($id: Int!) { meta_pages(where: {id: {_eq: $id}}) { id label route slug description use_param show_in_menu weight query { id gql variables } tables { id links weight query { id gql } fields { field { id helper_text label name } } } menus { buttons description id label page_id weight } forms { id description action mutation weight num_columns fields { read_only field { data_type helper_text id input_type label name options placeholder subfields table_name } } } } }`,
  variables: ["id"],
};

function getErrorMessage(error) {
  // see: https://www.apollographql.com/docs/react/data/error-handling/
  console.log(error.graphQLErrors);
  return error.graphQLErrors.map((message) => message.message);
}

function sortByWeight(views) {
  // sort views in descending order by weight. ie higher weight = higher on page
  return views.sort(function (a, b) {
    return b.weight - a.weight;
  });
}

function collectModalPages(menus) {
  let mutableMenus = [...menus];

  mutableMenus = mutableMenus.map((menu) => {
    let mutableMenu = { ...menu };
    mutableMenu.buttons = mutableMenu.buttons.map((button) => {
      let mutableButton = { ...button };
      mutableButton.query = QUERY_BY_PAGE_ID;
      mutableButton.showModal = false;
      return mutableButton;
    });
    return mutableMenu;
  });
  return mutableMenus;
}

function Page(props) {
  // we pass refetch down to all views and be used as a switch to re-query data
  // currently only implemented in FormWrapper, which is the only place mutations
  // happen
  // todo: understand/use apollo caching instead
  const [refetch, setRefetch] = React.useState(false);
  // given a param provided in the page config (props.data), and a route-matching route
  // (i.e. it uses the /:param react-router syntax)provided in props.data.route, we
  // extract the matching paramter. the match param gets passed down to views that
  // depend on it.
  // see: https://reactrouter.com/web/api/Hooks/useroutematch
  // we may not have a param to work with, in which case useRouteMatch is not going
  // to have any route to match. but we have to call it every time because it's a hook
  const param = props.data.use_param;
  const match = useRouteMatch(`${props.data.route}:${param}`);
  const matchVal = match ? match.params[param] : undefined;
  const query = props.data.query;
  // if the param were "slug" and path was "/pages/home", the match object would look
  // something like this this:
  // {
  //   "path": "/pages/:slug",
  //   "url": "/pages/home",
  //   "isExact": true,
  //   "params": {
  //     "slug": "home"
  //   }
  // }
  let vars = {};
  query.variables.map((v) => {
    vars[v] = props.data[v];
  });

  const { loading, error, data } = useQuery(
    gql`
      ${props.data.query.gql}
    `,
    { variables: vars }
  );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (error) return <p>Errors: {getErrorMessage(error)}</p>;
  const page_data = data.meta_pages[0];
  const forms = page_data.forms;
  const tables = page_data.tables;
  const maps = page_data.maps;
  let menus = page_data.menus;
  // we set the modal config to a state variable. it will be passed down to
  // the menu button (to trigger showModal state. it looks like this:
  // {
  //   id   <- target page id
  //   query  <- target page query
  //   showModal  <- target page modal state
  // }
  menus = collectModalPages(menus);

  let views = [];
  // we re-use/overwrite this container for each view type (forms, menus, tables))
  let formElements = [];

  if (forms !== undefined && forms.length > 0) {
    formElements = forms.map((form) => {
      return {
        weight: form.weight,
        elements: (
          <React.Fragment key={`form-fragment-${form.id}`}>
            <Row>
              <Col>
                <h4>{form.label}</h4>
              </Col>
            </Row>
            <FormWrapper
              key={`form-${form.id}`}
              data={form}
              param={param}
              match={matchVal}
              refetch={refetch}
              setRefetch={setRefetch}
            />
          </React.Fragment>
        ),
      };
    });
    views = [...views, ...formElements];
  }

  if (tables !== undefined && tables.length > 0) {
    formElements = tables.map((table) => {
      return {
        weight: table.weight,
        elements: (
          <React.Fragment key={`table-${table.id}`}>
            <Row>
              <Col>
                <h4>{table.label}</h4>
              </Col>
            </Row>
            <Row className="mx-1">
              <Col>
                <DataTable
                  key={table.id}
                  data={table}
                  param={param}
                  match={matchVal}
                  refetch={refetch}
                  setRefetch={setRefetch}
                />
              </Col>
            </Row>
          </React.Fragment>
        ),
      };
    });
    views = [...views, ...formElements];
  }

  if (menus !== undefined && menus.length > 0) {
    formElements = menus.map((menu) => {
      return {
        weight: menu.weight,
        elements: (
          <Row key={`menu-${menu.id}`}>
            <Col>
              <Menu data={menu} />
            </Col>
          </Row>
        ),
      };
    });
    views = [...views, ...formElements];
  }
  if (maps !== undefined && maps.length > 0) {
    formElements = maps.map((map) => {
      return {
        weight: map.weight,
        elements: (
          <Row key={`map-${map.id}`}>
            <Col>
              <Map data={map} />
            </Col>
          </Row>
        ),
      };
    });
    views = [...views, ...formElements];
  }
  views = sortByWeight(views);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>{props.data.label}</h3>
        </Col>
      </Row>
      {views.map((view) => {
        return view.elements;
      })}
    </React.Fragment>
  );
}

export default Page;
