import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Page from "./Page";

function ModalWrapper(props) {
  console.log("props", props)
  return (
    <Modal
      size="xl"
      show={props.showModal}
      onHide={(e) => onClick(e, props.showModal, props.setShowModal)}
    >
      <Modal.Header closeButton>
        <Modal.Title>TODO :)</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.page}</Modal.Body>
    </Modal>
  );
}

function onClick(e, showModal, setShowModal) {
  setShowModal(!showModal);
}

function Menu(props) {
  const [showModal, setShowModal] = React.useState(false);
  const buttons = props.data.buttons;
  const pages = buttons.map((button) => {
    const page_id = button.target_page_id;
    return <Page key={page_id} data={{ id: page_id, query: button.query }} />;
  });

  return (
    <>
      <Row>
        <Col>
          {buttons.map((button) => {
            return (
              <Button
                key={button.label}
                className="mr-2"
                variant={button.variant}
                onClick={(e) => onClick(e, showModal, setShowModal)}
              >
                {button.label}
              </Button>
            );
          })}
        </Col>
      </Row>
      {pages.map((page) => {
        return (
          <ModalWrapper
            page={page}
            showModal={showModal}
            setShowModal={setShowModal}
            key={`modal-${page.id}`}
          />
        );
      })}
    </>
  );
}

export default Menu;
