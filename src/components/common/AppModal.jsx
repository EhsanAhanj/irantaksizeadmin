import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const {
    toggle,
    modal,
    handleSubmit,
    title,
    body,
    confrimLable = "بله",
    cancelLable = "خیر",
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleSubmit();
              toggle();
            }}
          >
            {confrimLable}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            {cancelLable}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
