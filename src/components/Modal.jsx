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
export default function Modal(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalContent = props.children;
  const modalButon = getModalButton(props.buttonId, handleShow);
  const container = document.getElementById(props.hostMenuId);


  return (
    <Row>
      <Col>
        <BootstrapModal show={show} onHide={handleClose}>
          <BootstrapModal.Dialog>
            <BootstrapModal.Header closeButton>
              <BootstrapModal.Title>{props.title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            {/* {container && ReactDOM.createPortal(<p>hello</p>, container)} */}
            <BootstrapModal.Body>{modalContent}</BootstrapModal.Body>
          </BootstrapModal.Dialog>
        </BootstrapModal>
      </Col>
    </Row>
  );
}
