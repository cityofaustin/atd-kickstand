import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CONFIG from "../config/config";

export default function Nav() {
  const pageKeys = Object.keys(CONFIG.pages);
  return (
    <Col sm={2}>
      {pageKeys.filter(key => CONFIG.pages[key].showNav).map((key) => {
        const page = CONFIG.pages[key];
        return (
          <Row key={key}>
            <Col key={page.title}>
              <a href={page.route.path} className="text-reset">
                <h4>{page.icon} {page.title}</h4>
              </a>
            </Col>
          </Row>
        );
      })}
    </Col>
  );
}
