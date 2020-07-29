import React from "react";
import View from "./View";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function sortViews(views) {
  // sort views in descending order by weight. ie higher weight = higher on page
  return views.sort(function (a, b) {
    return b.weight - a.weight;
  });
}

function Page(props) {
  // we pass refetch down to all views and be used as a switch to re-query data
  // currently only implemented in FormWrapper, which is the only place mutations 
  // happen
  // across all view components on the page
  // todo: understand/use apollo caching instead
  const [refetch, setRefetch] = React.useState(false);

  // we clone the views array because apollo json is immutable. todo: is this an apollo setting?
  let views = [...props.data.views];
  views = sortViews(views);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>{props.data.label}</h3>
        </Col>
      </Row>
      {views.map((view) => {
        return <View key={view.id} data={view} refetch={refetch} setRefetch={setRefetch}/>;
      })}
    </React.Fragment>
  );
}

export default Page;
