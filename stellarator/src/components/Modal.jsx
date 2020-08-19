import React from "react";
import ReactDOM from "react";
import BootstrapModal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function getModalButton(id, handleShow) {
  return (
    <Button id={id} variant="primary" onClick={handleShow}>
      Show Modal
    </Button>
  );
}

const thing = document.getElementById("locations_menu");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, hostMenuId: props.hostMenuId };
    this.handleClose = () => {
      this.setState({ show: false });
    };
    this.handleShow = () => {
      this.setState({ show: true });
    };
    this.button = getModalButton(props.button_id, this.handleShow);
  }


  render() {
    return (
      <>
        <Row>
          <Col>{this.button}</Col>
        </Row>
        <Row>
          <Col>
            <BootstrapModal show={this.state.show} onHide={this.handleClose}>
              <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{this.props.title}</BootstrapModal.Title>
              </BootstrapModal.Header>
              {/* {container && ReactDOM.createPortal(<p>hello</p>, container)} */}
              <BootstrapModal.Body>{this.props.children}</BootstrapModal.Body>
            </BootstrapModal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Modal;
