import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
  return (
      <Row className="bg-dark text-white">
      <Col>
          <h2>John's Admin App</h2>
          </Col>
    </Row>    
  );
}

export default Header;
